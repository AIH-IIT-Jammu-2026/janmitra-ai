from typing import List, Optional, Dict
from pydantic import BaseModel

class ActionItem(BaseModel):
    title: str
    description: str
    priority: Optional[str] = "Medium"

class SourceItem(BaseModel):
    name: str
    url: str

class ChatResponse(BaseModel):
    response: str
    agents: List[str] = []
    action_plan: List[ActionItem] = []
    sources: List[SourceItem] = []
    active_agents: List[str] = []
    agent_latencies: Dict[str, int] = {}
