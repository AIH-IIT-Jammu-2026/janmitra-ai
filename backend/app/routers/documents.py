from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional

from backend.app.vision.document_validator import validate_document
from backend.app.vision.document_processor import process_document
from backend.app.eligibility.eligibility_engine import evaluate_scheme_eligibility

router = APIRouter(prefix="/documents", tags=["documents"])

class EvaluateProfileRequest(BaseModel):
    citizen_profile: Dict[str, Any]

@router.post("/verify-document")
async def verify_document_endpoint(file: UploadFile = File(...)):
    """
    Accepts an uploaded certificate image/PDF, validates format, runs Gemini Vision AI,
    and returns document summary, extracted citizen profile, and categorized scheme eligibility.
    """
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    file_bytes = await file.read()

    # 1. Document Validation
    val_result = validate_document(file.filename, file_bytes)
    if not val_result["valid"]:
        raise HTTPException(status_code=400, detail=val_result["error"])

    # 2. Document Processing & Gemini Vision Extraction
    parsed_res = process_document(file.filename, file_bytes, val_result["file_type"])

    doc_info = parsed_res.get("document", {})
    profile = parsed_res.get("citizen_profile", {})
    confidence_ratings = parsed_res.get("confidence", {})

    # 3. Deterministic Scheme Eligibility Matching & RAG Enrichment
    eligibility_result = evaluate_scheme_eligibility(profile)

    return {
        "status": "success",
        "document": doc_info,
        "citizen_profile": profile,
        "confidence": confidence_ratings,
        "eligible_schemes": eligibility_result.get("eligible_schemes", []),
        "possible_schemes": eligibility_result.get("possible_schemes", []),
        "missing_information": eligibility_result.get("missing_information", []),
        "missing_documents": eligibility_result.get("missing_documents", []),
        "warnings": eligibility_result.get("warnings", []),
    }

@router.post("/evaluate-eligibility")
async def evaluate_eligibility_endpoint(req: EvaluateProfileRequest):
    """
    Recalculates scheme eligibility instantly when citizens edit their extracted profile attributes.
    """
    if not req.citizen_profile:
        raise HTTPException(status_code=400, detail="citizen_profile is required")

    eligibility_result = evaluate_scheme_eligibility(req.citizen_profile)

    return {
        "status": "success",
        "citizen_profile": req.citizen_profile,
        "eligible_schemes": eligibility_result.get("eligible_schemes", []),
        "possible_schemes": eligibility_result.get("possible_schemes", []),
        "missing_information": eligibility_result.get("missing_information", []),
        "missing_documents": eligibility_result.get("missing_documents", []),
        "warnings": eligibility_result.get("warnings", []),
    }
