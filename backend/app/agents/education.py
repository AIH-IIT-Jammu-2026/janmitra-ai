import os
import json
from backend.app.core.logging import logger
from backend.app.clients.gemini import call_gemini_api

# ── Paths ──────────────────────────────────────────────────────────────────────
_AGENT_DIR   = os.path.dirname(__file__)
_PROMPT_PATH = os.path.normpath(os.path.join(_AGENT_DIR, "..", "prompts", "education.txt"))
_DATA_PATH   = os.path.normpath(os.path.join(_AGENT_DIR, "..", "..", "data", "education", "education.json"))

# ── Load knowledge base once at startup ────────────────────────────────────────
def _load_knowledge_base() -> list[dict]:
    try:
        with open(_DATA_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"[Education] Could not load knowledge base: {e}")
        return []

EDUCATION_DB: list[dict] = _load_knowledge_base()
logger.info(f"[Education] Loaded {len(EDUCATION_DB)} education entries from knowledge base")

# ── Helpers ────────────────────────────────────────────────────────────────────
def _load_prompt() -> str:
    try:
        with open(_PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        logger.warning(f"[Education] Could not load prompt: {e}")
        return "You are the Education Expert Agent. Help students find scholarships and educational opportunities."

def _search_education(message: str, top_k: int = 4) -> list[dict]:
    """Keyword search over the education knowledge base (RAG placeholder)."""
    msg_lower = message.lower()
    msg_words = set(msg_lower.split())
    scored: list[tuple[int, dict]] = []

    for entry in EDUCATION_DB:
        score = 0
        keywords = entry.get("keywords", [])
        
        # Check phrase match & word matches in keywords
        for kw in keywords:
            kw_lower = kw.lower()
            if kw_lower in msg_lower:
                score += 3
            else:
                kw_words = set(kw_lower.split())
                common = kw_words.intersection(msg_words)
                score += len(common)

        # Check name and description matches
        name_words = set(entry.get("name", "").lower().split())
        score += len(name_words.intersection(msg_words)) * 2

        # Boost category match
        if entry.get("category", "").lower() in msg_lower:
            score += 2

        if score > 0:
            scored.append((score, entry))

    scored.sort(key=lambda x: x[0], reverse=True)
    results = [s for _, s in scored[:top_k]]

    if not results:
        # Default: return a mix of most popular scholarships
        results = [e for e in EDUCATION_DB if e.get("category") == "Scholarship"][:3]

    return results

def _build_context_text(entries: list[dict]) -> str:
    """Formats matched education entries into prompt-ready context."""
    parts = []
    for e in entries:
        deadline_text = f"Application Deadline: {e['deadline']}" if e.get("deadline") else ""
        parts.append(
            f"Name: {e['name']}\n"
            f"Category: {e['category']}\n"
            f"Description: {e['description']}\n"
            f"Eligibility: {'; '.join(e['eligibility'])}\n"
            f"Benefits: {e['benefits']}\n"
            f"Documents Required: {', '.join(e['documents'])}\n"
            f"How to Apply: {e['how_to_apply']}\n"
            f"{deadline_text}\n"
            f"Official Portal: {e['portal']}"
        )
    return "\n\n---\n\n".join(parts)

def _build_fallback_response(entries: list[dict]) -> dict:
    """Structured fallback response from local knowledge base when LLM is offline."""
    content_parts, action_items, sources = [], [], []

    for e in entries:
        deadline_line = f"\n\n**Deadline:** {e['deadline']}" if e.get("deadline") else ""
        content_parts.append(
            f"## {e['name']}\n"
            f"{e['description']}\n\n"
            f"**Eligibility:** {e['eligibility'][0]}\n\n"
            f"**Benefits:** {e['benefits']}\n\n"
            f"**How to Apply:** {e['how_to_apply']}"
            f"{deadline_line}"
        )
        action_items.append({
            "title": f"Apply: {e['name']}",
            "description": f"Documents needed: {', '.join(e['documents'][:3])}",
            "priority": "High"
        })
        sources.append({"name": e["name"], "url": e["portal"]})

    action_items.append({
        "title": "Check NSP Portal for All Scholarships",
        "description": "scholarships.gov.in lists all central government scholarships. Apply early (July-November window).",
        "priority": "High"
    })
    sources.append({"name": "National Scholarship Portal", "url": "https://scholarships.gov.in"})

    return {
        "agent": "Education",
        "content": "\n\n---\n\n".join(content_parts),
        "action_items": action_items,
        "sources": sources
    }

# ── Main Agent ─────────────────────────────────────────────────────────────────
def run_education_agent(message: str) -> dict:
    """
    Education Expert Agent.
    1. Searches education knowledge base for relevant scholarships/schemes.
    2. Sends Gemini a system prompt + context + user query.
    3. Falls back to structured knowledge base response if LLM is offline.
    """
    logger.info(f"[Education Agent] Processing: '{message}'")

    matched = _search_education(message)
    logger.info(f"[Education Agent] Matched: {[e['name'] for e in matched]}")

    system_prompt = _load_prompt()
    context_text  = _build_context_text(matched)
    full_prompt   = (
        f"{system_prompt}\n\n"
        f"--- Relevant Education Schemes from Knowledge Base ---\n{context_text}\n\n"
        f"--- Student Query ---\n\"{message}\"\n\n"
        f"Provide a helpful, personalized response using the data above:"
    )

    try:
        llm_response = call_gemini_api(full_prompt)
        if llm_response and llm_response.strip():
            logger.info("[Education Agent] LLM response received")
            action_items = [
                {
                    "title": f"Apply: {e['name']}",
                    "description": f"Required: {', '.join(e['documents'][:2])}. {e['how_to_apply']}",
                    "priority": "High"
                }
                for s in matched
            ]
            action_items.append({
                "title": "Check All Scholarships on NSP",
                "description": "Apply at scholarships.gov.in — central and state scholarships in one place",
                "priority": "High"
            })
            sources = [{"name": e["name"], "url": e["portal"]} for e in matched]
            sources.append({"name": "National Scholarship Portal", "url": "https://scholarships.gov.in"})
            return {
                "agent": "Education",
                "content": llm_response.strip(),
                "action_items": action_items,
                "sources": sources
            }
    except Exception as e:
        logger.warning(f"[Education Agent] LLM unavailable ({e}), using knowledge base fallback")

    return _build_fallback_response(matched)
