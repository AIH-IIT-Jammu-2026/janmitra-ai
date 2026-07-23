import os
import json
import re
from backend.app.core.logging import logger
from backend.app.clients.gemini import call_gemini_api

# ── Paths ──────────────────────────────────────────────────────────────────────
_AGENT_DIR   = os.path.dirname(__file__)
_PROMPT_PATH = os.path.normpath(os.path.join(_AGENT_DIR, "..", "prompts", "schemes.txt"))
_DATA_PATH   = os.path.normpath(os.path.join(_AGENT_DIR, "..", "..", "data",
                                              "government_schemes", "schemes.json"))

# ── Load JSON knowledge base once at startup ───────────────────────────────────
def _load_knowledge_base() -> list[dict]:
    try:
        with open(_DATA_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"[Schemes] Could not load knowledge base: {e}")
        return []

SCHEMES_DB: list[dict] = _load_knowledge_base()
logger.info(f"[Schemes] Loaded {len(SCHEMES_DB)} schemes from knowledge base")

# ── Helpers ────────────────────────────────────────────────────────────────────
def _load_prompt() -> str:
    try:
        with open(_PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        logger.warning(f"[Schemes] Could not load prompt: {e}")
        return "You are the Government Schemes Expert Agent. Recommend relevant welfare schemes."

def _search_schemes(message: str, top_k: int = 4) -> list[dict]:
    """Keyword search over the JSON knowledge base (RAG placeholder)."""
    msg_lower = message.lower()
    scored: list[tuple[int, dict]] = []

    for scheme in SCHEMES_DB:
        score = sum(1 for kw in scheme.get("keywords", []) if kw.lower() in msg_lower)
        if score > 0:
            scored.append((score, scheme))

    scored.sort(key=lambda x: x[0], reverse=True)
    results = [s for _, s in scored[:top_k]]

    # If nothing matched, return top 3 most general schemes
    if not results:
        results = SCHEMES_DB[:3]

    return results

def _build_context_text(schemes: list[dict]) -> str:
    """Formats matched schemes into prompt-ready context."""
    parts = []
    for s in schemes:
        parts.append(
            f"Scheme: {s['name']}\n"
            f"Category: {s['category']}\n"
            f"Description: {s['description']}\n"
            f"Eligibility: {'; '.join(s['eligibility'])}\n"
            f"Benefits: {s['benefits']}\n"
            f"Documents Required: {', '.join(s['documents'])}\n"
            f"How to Apply: {s['how_to_apply']}\n"
            f"Official Portal: {s['portal']}"
        )
    return "\n\n---\n\n".join(parts)

def _build_fallback_response(schemes: list[dict]) -> dict:
    """Structured response directly from JSON knowledge base (no LLM)."""
    content_parts, action_items, sources = [], [], []

    for s in schemes:
        content_parts.append(
            f"## {s['name']}\n"
            f"{s['description']}\n\n"
            f"**Eligibility:** {s['eligibility'][0]}\n\n"
            f"**Benefits:** {s['benefits']}\n\n"
            f"**How to Apply:** {s['how_to_apply']}"
        )
        action_items.append({
            "title": f"Apply for {s['name']}",
            "description": f"Documents needed: {', '.join(s['documents'][:3])}",
            "priority": "High"
        })
        sources.append({"name": s["name"], "url": s["portal"]})

    action_items.append({
        "title": "Visit Nearest CSC",
        "description": "Common Service Centres (CSC) provide free assistance to apply for all government schemes",
        "priority": "Medium"
    })
    sources.append({"name": "MyScheme Portal (All Schemes)", "url": "https://myscheme.gov.in"})

    return {
        "agent": "Government Schemes",
        "content": "\n\n---\n\n".join(content_parts),
        "action_items": action_items,
        "sources": sources,
    }

# ── Main Agent ─────────────────────────────────────────────────────────────────
def run_schemes_agent(message: str) -> dict:
    """
    Government Schemes Expert Agent.
    1. Searches JSON knowledge base for relevant schemes (RAG-ready).
    2. Sends Gemini a system prompt + knowledge context + user query.
    3. Falls back to structured JSON knowledge base response if LLM is offline.
    """
    logger.info(f"[Government Schemes Agent] Processing: '{message}'")

    matched_schemes = _search_schemes(message)
    logger.info(f"[Government Schemes Agent] Matched schemes: {[s['name'] for s in matched_schemes]}")

    system_prompt  = _load_prompt()
    context_text   = _build_context_text(matched_schemes)
    full_prompt    = (
        f"{system_prompt}\n\n"
        f"--- Relevant Schemes from Knowledge Base ---\n{context_text}\n\n"
        f"--- Citizen Query ---\n\"{message}\"\n\n"
        f"Provide a helpful, personalized response using the scheme data above:"
    )

    try:
        llm_response = call_gemini_api(full_prompt)
        if llm_response and llm_response.strip():
            logger.info("[Government Schemes Agent] LLM response received")
            action_items = [
                {
                    "title": f"Apply for {s['name']}",
                    "description": f"Required: {', '.join(s['documents'][:2])}. {s['how_to_apply']}",
                    "priority": "High",
                }
                for s in matched_schemes
            ]
            action_items.append({
                "title": "Visit Nearest Common Service Centre (CSC)",
                "description": "CSCs provide free document assistance and scheme application support",
                "priority": "Medium",
            })
            sources = [{"name": s["name"], "url": s["portal"]} for s in matched_schemes]
            sources.append({"name": "MyScheme Portal", "url": "https://myscheme.gov.in"})
            return {
                "agent": "Government Schemes",
                "content": llm_response.strip(),
                "action_items": action_items,
                "sources": sources,
            }
    except Exception as e:
        logger.warning(f"[Government Schemes Agent] LLM unavailable ({e}), using knowledge base fallback")

    return _build_fallback_response(matched_schemes)
