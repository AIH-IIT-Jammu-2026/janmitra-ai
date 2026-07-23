import os
import time
import logging

import google.generativeai as genai
from backend.app.core.config import settings

logger = logging.getLogger("janmitra.gemini")
logging.basicConfig(level=logging.INFO)

MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.5-flash")

if not settings.GEMINI_API_KEY:
    raise EnvironmentError(
        "GEMINI_API_KEY not found. Make sure it is set in your .env file."
    )

genai.configure(api_key=settings.GEMINI_API_KEY)
_model = genai.GenerativeModel(MODEL_NAME)


def call_gemini_api(prompt: str) -> str:
    """
    Client interface for calling Google Gemini API.
    Returns the model's text response, or an empty string on failure.
    """
    if not prompt or not prompt.strip():
        logger.warning("call_gemini_api received an empty prompt")
        return ""

    max_retries = 3
    for attempt in range(1, max_retries + 1):
        try:
            result = _model.generate_content(prompt)
            if result and result.text:
                return result.text
            raise ValueError("Empty response from Gemini")
        except Exception as e:
            logger.warning(f"Gemini API attempt {attempt}/{max_retries} failed: {e}")
            if attempt < max_retries:
                time.sleep(1.5 * attempt)

    logger.error("Gemini API failed after all retries")
    return ""
