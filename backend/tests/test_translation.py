import pytest
from backend.app.services.translation_service import translate_text

def test_translation_english_bypass():
    res = translate_text("Hello citizen", "en-IN")
    assert res["translated_text"] == "Hello citizen"
    assert res["target_language"] == "en-IN"

def test_translation_hindi():
    res = translate_text("Pradhan Mantri KISAN scheme provides 6000 rupees", "hi-IN")
    assert "translated_text" in res
    assert res["target_language"] == "hi-IN"
    assert len(res["translated_text"]) > 0

def test_translation_marathi():
    res = translate_text("Ayushman Bharat health card details", "mr-IN")
    assert "translated_text" in res
    assert res["target_language"] == "mr-IN"
