import os
import time
import logging

from backend.app.core.config import settings

logger = logging.getLogger("janmitra.gemini")
logging.basicConfig(level=logging.INFO)

MODEL_NAME = os.getenv("MODEL_NAME", "gemini-3.1-flash-lite")


def _get_model():
    ...
    return genai.GenerativeModel(MODEL_NAME)


def call_gemini_api(prompt: str) -> str:
    ...
    logger.error("Gemini API failed after all retries")
    return ""


# 👇 Paste it here
def generate_response(prompt: str) -> str:
    """
    Reusable wrapper for all AI agents.
    """
    return call_gemini_api(prompt)