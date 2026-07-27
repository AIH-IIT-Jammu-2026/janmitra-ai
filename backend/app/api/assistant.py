import base64
import logging
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List
from backend.app.services.assistant_service import (
  start_assistant_session,
  process_assistant_message,
  end_assistant_session,
)
from backend.app.services.vision_service import analyze_screen_frame

router = APIRouter(prefix="/api/assistant", tags=["assistant"])
logger = logging.getLogger(__name__)

class StartSessionRequest(BaseModel):
  language: Optional[str] = "en-IN"

class InputMessageRequest(BaseModel):
  session_id: str
  query: str
  language: Optional[str] = "en-IN"

class EndSessionRequest(BaseModel):
  session_id: str

@router.post("/session/start")
def start_session_endpoint(req: StartSessionRequest):
  try:
    res = start_assistant_session(language=req.language or "en-IN")
    return res
  except Exception as e:
    logger.error(f"Error starting assistant session: {e}")
    raise HTTPException(status_code=500, detail=str(e))

@router.post("/session/input")
def input_message_endpoint(req: InputMessageRequest):
  try:
    res = process_assistant_message(session_id=req.session_id, query=req.query, language=req.language or "en-IN")
    return res
  except Exception as e:
    logger.error(f"Error processing assistant message: {e}")
    raise HTTPException(status_code=500, detail=str(e))

@router.post("/session/frame")
async def vision_frame_endpoint(
  session_id: str = Form(...),
  user_query: str = Form(""),
  language: str = Form("en-IN"),
  file: UploadFile = File(...),
):
  try:
    image_bytes = await file.read()
    vision_res = analyze_screen_frame(image_bytes=image_bytes, user_query=user_query, active_language=language)
    return {
      "session_id": session_id,
      "vision": vision_res,
      "status": "success",
    }
  except Exception as e:
    logger.error(f"Error processing vision frame: {e}")
    raise HTTPException(status_code=500, detail=str(e))

@router.post("/session/end")
def end_session_endpoint(req: EndSessionRequest):
  try:
    res = end_assistant_session(session_id=req.session_id)
    return res
  except Exception as e:
    logger.error(f"Error ending assistant session: {e}")
    raise HTTPException(status_code=500, detail=str(e))
