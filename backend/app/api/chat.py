from fastapi import APIRouter
from backend.app.models.chat import ChatRequest
from backend.app.models.response import ChatResponse
from backend.app.graph.workflow import run_agent_workflow

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def handle_chat(request: ChatRequest):
    response_data = run_agent_workflow(
        message=request.message,
        session_id=request.session_id,
        language=request.language,
    )
    return response_data
