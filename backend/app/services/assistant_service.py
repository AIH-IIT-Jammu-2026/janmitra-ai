import time
import logging
from typing import Dict, Any
from backend.app.graph.workflow import run_agent_workflow

logger = logging.getLogger(__name__)

# Active Session Storage (in-memory)
ASSISTANT_SESSIONS: Dict[str, Dict[str, Any]] = {}

def start_assistant_session(language: str = "en-IN") -> Dict[str, Any]:
  session_id = f"session_{int(time.time() * 1000)}"
  session_data = {
    "session_id": session_id,
    "language": language,
    "start_time": time.time(),
    "history": [],
    "current_goal": "Citizen Guidance",
    "progress_pct": 20,
    "active_agents": ["Router Agent", "Janvi Assistant"],
    "context_chips": ["🌐 Active Session", "🤖 Multi-Agent Engine"],
  }
  ASSISTANT_SESSIONS[session_id] = session_data

  welcome_text = {
    "en-IN": "Namaste! Welcome to JanMitra AI. I'm Janvi, your AI Citizen Co-Pilot. I can assist you across Government Schemes, Education, Healthcare, Agriculture, Employment, Legal, and Emergency Services. How can I help you today?",
    "hi-IN": "नमस्ते! जनमित्र एआई में आपका स्वागत है। मैं जानवी हूँ, आपकी एआई नागरिक को-पायलट। मैं आपकी सहायता सरकारी योजनाओं, शिक्षा, स्वास्थ्य, कृषि, और रोजगार में कर सकती हूँ। आज मैं आपकी क्या मदद करूँ?",
    "mr-IN": "नमस्ते! जनमित्र AI मध्ये आपले स्वागत आहे. मी जान्हवी आहे, तुमची AI नागरिक सह-पायलट. मी तुम्हाला सरकारी योजना, शिक्षण, आरोग्य आणि शेतीबाबत मदत करू शकते. आज मी तुम्हाला कशी मदत करू?",
  }

  greeting = welcome_text.get(language, welcome_text["en-IN"])

  return {
    "session_id": session_id,
    "greeting": greeting,
    "language": language,
    "active_agents": session_data["active_agents"],
    "context_chips": session_data["context_chips"],
  }

def process_assistant_message(session_id: str, query: str, language: str = "en-IN") -> Dict[str, Any]:
  session = ASSISTANT_SESSIONS.get(session_id, {
    "session_id": session_id,
    "language": language,
    "history": [],
    "current_goal": "Citizen Query",
    "progress_pct": 40,
  })

  # Execute multi-agent workflow
  workflow_res = run_agent_workflow(message=query, session_id=session_id, language=language)
  response_text = workflow_res.get("response", "I am here to assist you.")
  participating_agents = workflow_res.get("agents", ["Router Agent", "Janvi Assistant"])

  # Update session history & goal progress
  session["history"].append({"user": query, "assistant": response_text})
  session["active_agents"] = participating_agents
  session["progress_pct"] = min(session.get("progress_pct", 40) + 20, 100)

  return {
    "session_id": session_id,
    "query": query,
    "response": response_text,
    "agents": participating_agents,
    "action_plan": workflow_res.get("action_plan", []),
    "sources": workflow_res.get("sources", []),
    "progress_pct": session["progress_pct"],
  }

def end_assistant_session(session_id: str) -> Dict[str, Any]:
  session = ASSISTANT_SESSIONS.pop(session_id, {})
  start_t = session.get("start_time", time.time())
  duration_sec = int(time.time() - start_t)
  mins = duration_sec // 60
  secs = duration_sec % 60

  return {
    "session_id": session_id,
    "duration_formatted": f"{mins}m {secs}s",
    "topics_covered": session.get("active_agents", ["General Assistance"]),
    "history_count": len(session.get("history", [])),
    "status": "Completed",
  }
