from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from backend.app.services.translation_service import translate_text

router = APIRouter(prefix="/translate", tags=["translation"])

class TranslationRequest(BaseModel):
    text: str
    target_language: str = "hi-IN"
    source_language: Optional[str] = "auto"

@router.post("")
@router.post("/")
async def translate_endpoint(req: TranslationRequest):
    """
    Translates provided text to target Indian language using Gemini 1.5 Flash.
    """
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Text field cannot be empty")

    result = translate_text(req.text, req.target_language, req.source_language)
    return result
