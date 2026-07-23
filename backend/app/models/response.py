from typing import List, Optional
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
