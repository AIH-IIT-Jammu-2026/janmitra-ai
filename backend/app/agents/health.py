import os
import json
from backend.app.core.logging import logger
from backend.app.clients.gemini import call_gemini_api

# ── Paths ──────────────────────────────────────────────────────────────────────
_AGENT_DIR   = os.path.dirname(__file__)
_PROMPT_PATH = os.path.normpath(os.path.join(_AGENT_DIR, "..", "prompts", "health.txt"))
_DATA_PATH   = os.path.normpath(os.path.join(_AGENT_DIR, "..", "..", "data", "health", "health.json"))

# ── Load knowledge base once at startup ────────────────────────────────────────
def _load_knowledge_base() -> list[dict]:
    try:
        with open(_DATA_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"[Health] Could not load knowledge base: {e}")
        return []

HEALTH_DB: list[dict] = _load_knowledge_base()
logger.info(f"[Health] Loaded {len(HEALTH_DB)} health entries from knowledge base")

# ── Helpers ────────────────────────────────────────────────────────────────────
def _load_prompt() -> str:
    try:
        with open(_PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        logger.warning(f"[Health] Could not load prompt: {e}")
        return "You are the Healthcare Expert Agent. Help citizens find government health schemes and facilities."

def _search_health(message: str, top_k: int = 4) -> list[dict]:
    """Keyword and word-level search over health knowledge base (RAG placeholder)."""
    msg_lower = message.lower()
    msg_words = set(msg_lower.split())
    scored: list[tuple[int, dict]] = []

    for entry in HEALTH_DB:
        score = 0
        keywords = entry.get("keywords", [])

        # Phrase match & word-level match in keywords
        for kw in keywords:
            kw_lower = kw.lower()
            if kw_lower in msg_lower:
                score += 3
            else:
                kw_words = set(kw_lower.split())
                common = kw_words.intersection(msg_words)
                score += len(common)

        # Name and category matches
        name_words = set(entry.get("name", "").lower().split())
        score += len(name_words.intersection(msg_words)) * 2

        if entry.get("category", "").lower() in msg_lower:
            score += 2

        if score > 0:
            scored.append((score, entry))

    scored.sort(key=lambda x: x[0], reverse=True)
    results = [s for _, s in scored[:top_k]]

    if not results:
        # Default fallback: PM-JAY, Jan Aushadhi, NHM
        results = HEALTH_DB[:3]

    return results

def _build_context_text(entries: list[dict]) -> str:
    """Formats matched health entries into prompt-ready context."""
    parts = []
    for e in entries:
        parts.append(
            f"Scheme/Program: {e['name']}\n"
            f"Category: {e['category']}\n"
            f"Description: {e['description']}\n"
            f"Eligibility: {'; '.join(e['eligibility'])}\n"
            f"Benefits: {e['benefits']}\n"
            f"Documents Required: {', '.join(e['documents'])}\n"
            f"How to Access: {e['how_to_apply']}\n"
            f"Official Portal: {e['portal']}"
        )
    return "\n\n---\n\n".join(parts)

def _build_fallback_response(entries: list[dict]) -> dict:
    """Structured fallback response from local knowledge base when LLM is offline."""
    content_parts, action_items, sources = [], [], []

    for e in entries:
        content_parts.append(
            f"## {e['name']}\n"
            f"{e['description']}\n\n"
            f"**Eligibility:** {e['eligibility'][0]}\n\n"
            f"**Benefits:** {e['benefits']}\n\n"
            f"**How to Access:** {e['how_to_apply']}"
        )
        action_items.append({
            "title": f"Access: {e['name']}",
            "description": f"Key documents: {', '.join(e['documents'][:3])}",
            "priority": "High"
        })
        sources.append({"name": e["name"], "url": e["portal"]})

    action_items.append({
        "title": "Emergency: Call 108 (Ambulance) or 104 (Health Helpline)",
        "description": "For medical emergencies call 108. For health guidance call 104 (free, 24x7).",
        "priority": "High"
    })
    sources.append({"name": "PM-JAY Official Portal", "url": "https://pmjay.gov.in"})

    return {
        "agent": "Healthcare",
        "content": "\n\n---\n\n".join(content_parts),
        "action_items": action_items,
        "sources": sources
    }

# ── Main Agent ─────────────────────────────────────────────────────────────────
def run_health_agent(message: str) -> dict:
    """
    Healthcare Expert Agent.
    1. Searches health knowledge base for relevant schemes or programs.
    2. Sends Gemini a system prompt + context + user query.
    3. Falls back to structured knowledge base response if LLM is offline.
    """
    logger.info(f"[Health Agent] Processing: '{message}'")

    matched = _search_health(message)
    logger.info(f"[Health Agent] Matched: {[e['name'] for e in matched]}")

    system_prompt = _load_prompt()
    context_text  = _build_context_text(matched)
    full_prompt   = (
        f"{system_prompt}\n\n"
        f"--- Relevant Health Schemes from Knowledge Base ---\n{context_text}\n\n"
        f"--- Citizen Query ---\n\"{message}\"\n\n"
        f"Provide a helpful, empathetic response with actionable guidance:"
    )

    try:
        llm_response = call_gemini_api(full_prompt)
        if llm_response and llm_response.strip():
            logger.info("[Health Agent] LLM response received")
            action_items = [
                {
                    "title": f"Access: {e['name']}",
                    "description": f"Required: {', '.join(e['documents'][:2])}. {e['how_to_apply']}",
                    "priority": "High"
                }
                for e in matched
            ]
            action_items.append({
                "title": "Emergency: Call 108 or 104",
                "description": "108 for ambulance, 104 for free health helpline (24x7)",
                "priority": "High"
            })
            sources = [{"name": e["name"], "url": e["portal"]} for e in matched]
            sources.append({"name": "PM-JAY Official Portal", "url": "https://pmjay.gov.in"})
            return {
                "agent": "Healthcare",
                "content": llm_response.strip(),
                "action_items": action_items,
                "sources": sources
            }
    except Exception as e:
        logger.warning(f"[Health Agent] LLM unavailable ({e}), using knowledge base fallback")

    return _build_fallback_response(matched)
