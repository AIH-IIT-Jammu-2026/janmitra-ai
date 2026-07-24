import os
import json
import re
from backend.app.core.logging import logger
from backend.app.clients.gemini import call_gemini_api

VALID_AGENTS = {"Government Schemes", "Healthcare", "Education", "Agriculture"}

# Multilingual keywords dictionary for fallback & fast-path intent matching
KEYWORDS_MAP = {
    "Agriculture": [
        "farmer", "kisan", "sheti", "kheti", "crop", "mandi", "fertilizer", "seed",
        "irrigation", "sinchayee", "fasal", "krishi", "farm", "khet"
    ],
    "Education": [
        "scholarship", "education", "college", "school", "student", "shiksha", "padhai",
        "university", "fee", "exam", "course", "vidya", "chhatravritti"
    ],
    "Healthcare": [
        "health", "hospital", "doctor", "fever", "medicine", "ayushman", "abha",
        "bimar", "illness", "treatment", "swasthya", "ilaj", "davai", "headache", "pain"
    ],
    "Government Schemes": [
        "scheme", "yojana", "government", "subsidy", "ration", "pension", "pm-kisan",
        "pmay", "sarkar", "sarkari", "labh", "eligibility", "card"
    ]
}

def load_router_prompt() -> str:
    """Loads system prompt from prompts/router.txt file"""
    try:
        prompt_path = os.path.join(os.path.dirname(__file__), "..", "prompts", "router.txt")
        if os.path.exists(prompt_path):
            with open(prompt_path, "r", encoding="utf-8") as f:
                return f.read().strip()
    except Exception as e:
        logger.warning(f"Could not load router prompt from file: {e}")
    
    return "Classify query into agents: Government Schemes, Healthcare, Education, Agriculture. Return JSON array."

def fallback_route_query(message: str) -> list[str]:
    """
    Multilingual heuristic route detection for fallback when LLM is offline or non-JSON
    """
    msg_lower = message.lower()
    selected = set()

    for agent_name, keywords in KEYWORDS_MAP.items():
        if any(kw in msg_lower for kw in keywords):
            selected.add(agent_name)

    if not selected:
        selected.add("Government Schemes")

    return list(selected)

def route_query(message: str) -> list[str]:
    """
    Main Intent Router function. Uses Gemini LLM with system prompt,
    falling back to robust heuristic matching.
    """
    logger.info(f"Routing query: '{message}'")
    
    if not message or not message.strip():
        return ["Government Schemes"]

    system_prompt = load_router_prompt()
    full_prompt = f"{system_prompt}\n\nUser Query: \"{message}\"\nJSON Output:"

    try:
        llm_response = call_gemini_api(full_prompt)
        
        if llm_response and llm_response.strip():
            # Try to extract JSON array using regex
            json_match = re.search(r'\[.*?\]', llm_response, re.DOTALL)
            if json_match:
                parsed_list = json.loads(json_match.group(0))
                if isinstance(parsed_list, list):
                    filtered_agents = [agent for agent in parsed_list if agent in VALID_AGENTS]
                    if filtered_agents:
                        logger.info(f"LLM routed query to: {filtered_agents}")
                        return list(set(filtered_agents))
    except Exception as e:
        logger.warning(f"LLM routing failed or unavailable ({e}), using heuristic fallback.")

    fallback_agents = fallback_route_query(message)
    logger.info(f"Fallback routed query to: {fallback_agents}")
    return fallback_agents
