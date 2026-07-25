import os
import json
from backend.app.core.logging import logger
from backend.app.clients.gemini import call_gemini_api
from backend.app.rag.retriever import retrieve_relevant_schemes, retriever_instance

# Expose domain knowledge base for tests/backward compatibility
EDUCATION_DB: list[dict] = [doc for doc in retriever_instance.documents if doc.get("_domain") == "education"]

# ── Paths ──────────────────────────────────────────────────────────────────────
_AGENT_DIR   = os.path.dirname(__file__)
_PROMPT_PATH = os.path.normpath(os.path.join(_AGENT_DIR, "..", "prompts", "education.txt"))

# ── Helpers ────────────────────────────────────────────────────────────────────
def _load_prompt() -> str:
    try:
        with open(_PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        logger.warning(f"[Education] Could not load prompt: {e}")
        return "You are the Education Expert Agent. Help students find scholarships and educational opportunities."

def _search_education(message: str, top_k: int = 4) -> list[dict]:
    """Semantic vector search using RAG engine over Education knowledge base."""
    return retrieve_relevant_schemes(message, domain="education", top_k=top_k)

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
    1. Searches education knowledge base via RAG vector engine.
    2. Sends Gemini a system prompt + RAG context + user query.
    3. Falls back to structured knowledge base response if LLM is offline.
    """
    logger.info(f"[Education Agent] Processing: '{message}'")

    matched = _search_education(message)
    logger.info(f"[Education Agent] RAG matched: {[e['name'] for e in matched]}")

    system_prompt = _load_prompt()
    context_text  = _build_context_text(matched)
    full_prompt   = (
        f"{system_prompt}\n\n"
        f"--- Relevant Education Schemes from RAG Retrieval ---\n{context_text}\n\n"
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
                for e in matched
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
