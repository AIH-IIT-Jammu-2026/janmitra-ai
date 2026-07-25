import pytest
from backend.app.vision.document_validator import validate_document
from backend.app.vision.document_processor import process_document
from backend.app.eligibility.eligibility_engine import evaluate_scheme_eligibility

def test_document_validator_empty():
    res = validate_document("test.jpg", b"")
    assert res["valid"] is False
    assert "empty" in res["error"].lower()

def test_document_validator_invalid_extension():
    res = validate_document("test.exe", b"some binary data")
    assert res["valid"] is False
    assert "unsupported file type" in res["error"].lower()

def test_document_processor_parsing():
    parsed = process_document("income_certificate.jpg", b"fake_image_bytes", "image")
    assert "document" in parsed
    assert "citizen_profile" in parsed
    assert parsed["citizen_profile"]["income"] > 0
    assert parsed["citizen_profile"]["state"] == "Maharashtra"

def test_eligibility_engine_matching():
    profile = {
        "income": 180000,
        "category": "General",
        "state": "Maharashtra",
        "land_acres": 1.5,
        "age": 35,
        "occupation": "Farmer",
        "gender": "Male"
    }
    result = evaluate_scheme_eligibility(profile)
    assert "eligible_schemes" in result
    schemes = result["eligible_schemes"]
    assert len(schemes) >= 3

    # Check PM-KISAN matching
    pmkisan = next((s for s in schemes if "PM-KISAN" in s["name"]), None)
    assert pmkisan is not None
    assert pmkisan["category"] == "🌾 Agriculture"
    assert len(pmkisan["why_eligible"]) >= 2
