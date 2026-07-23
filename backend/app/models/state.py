from typing import List, Dict, Any, TypedDict

class AgentState(TypedDict):
    message: str
    session_id: str
    language: str
    selected_agents: List[str]
    agent_outputs: List[Dict[str, Any]]
    final_response: Dict[str, Any]
