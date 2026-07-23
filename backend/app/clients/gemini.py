import os
import time
import logging

from backend.app.core.config import settings

logger = logging.getLogger("janmitra.gemini")
logging.basicConfig(level=logging.INFO)

MODEL_NAME = os.getenv("MODEL_NAME", "gemini-3.1-flash-lite")


def _get_model():
    try:
        import google.generativeai as genai
    except ModuleNotFoundError:
        logger.error("google-generativeai package is not installed")
        return None

    if not settings.GEMINI_API_KEY:
        logger.error("GEMINI_API_KEY not set")
        return None

    genai.configure(api_key=settings.GEMINI_API_KEY)
    return genai.GenerativeModel(MODEL_NAME)


def call_gemini_api(prompt: str) -> str:
    """
    Client interface for calling Google Gemini API.
    Returns the model's text response, or an empty string on failure.
    """
    if not prompt or not prompt.strip():
        logger.warning("call_gemini_api received an empty prompt")
        return ""

    model = _get_model()
    if model is None:
        return ""

    max_retries = 3
    for attempt in range(1, max_retries + 1):
        try:
            result = model.generate_content(prompt)
            if result and getattr(result, "text", None):
                return result.text
            raise ValueError("Empty response from Gemini")
        except Exception as e:
            logger.warning(f"Gemini API attempt {attempt}/{max_retries} failed: {e}")
            if attempt < max_retries:
                time.sleep(1.5 * attempt)

    logger.error("Gemini API failed after all retries")
    return ""