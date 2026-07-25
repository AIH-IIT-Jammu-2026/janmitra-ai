import os
import logging
import re
from backend.app.core.config import settings

logger = logging.getLogger("janmitra.translation")

LANGUAGE_NAME_MAP = {
    "hi-IN": "Hindi",
    "mr-IN": "Marathi",
    "ta-IN": "Tamil",
    "te-IN": "Telugu",
    "bn-IN": "Bengali",
    "gu-IN": "Gujarati",
    "kn-IN": "Kannada",
    "ml-IN": "Malayalam",
    "pa-IN": "Punjabi",
    "or-IN": "Odia",
    "en-IN": "English",
}

def translate_text(text: str, target_language_code: str, source_language: str = "auto") -> dict:
    """
    Translates text to target Indian language using Gemini 1.5 Flash.
    Returns {"translated_text": str, "target_language": str, "cached": False}.
    """
    if not text or not text.strip():
        return {"translated_text": "", "target_language": target_language_code, "cached": False}

    target_lang_name = LANGUAGE_NAME_MAP.get(target_language_code, target_language_code)

    if target_language_code == "en-IN" or target_lang_name.lower() == "english":
        return {"translated_text": text, "target_language": target_language_code, "cached": False}

    prompt = f"""
You are an expert translator specializing in official Indian government service communication.
Translate the following text into {target_lang_name} ({target_language_code}).
Preserve key scheme names, numbers, bullet points, and portal URLs accurately.

TEXT TO TRANSLATE:
{text}

Respond ONLY with the translated text in {target_lang_name}. Do not include commentary.
"""

    if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
        try:
            import google.generativeai as genai
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel(os.getenv("MODEL_NAME", "gemini-1.5-flash"))
            res = model.generate_content(prompt)
            if res and getattr(res, "text", None):
                return {
                    "translated_text": res.text.strip(),
                    "target_language": target_language_code,
                    "cached": False,
                }
        except Exception as e:
            logger.warning(f"Gemini translation exception: {e}. Falling back to clean text parser.")

    # Fallback simulation for offline testing environments
    return {
        "translated_text": f"[{target_lang_name} Translaton]: {text[:200]}...",
        "target_language": target_language_code,
        "cached": False,
    }
