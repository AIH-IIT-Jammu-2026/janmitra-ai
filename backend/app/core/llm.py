from backend.app.core.config import settings
from backend.app.core.logging import logger
from backend.app.clients.gemini import call_gemini_api


def get_llm_client():
    """
    Returns a callable LLM client function that agents can use
    to send a prompt and get back a text response.
    """
    logger.info("Initializing LLM client...")
    return call_gemini_api
