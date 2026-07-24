import operator
from typing import List, Dict, Any, TypedDict, Annotated, Union

class AgentError(TypedDict):
    agent: str
    message: str
    timestamp: float

class AgentState(TypedDict, total=False):
    """
    Shared state passed between LangGraph workflow nodes.
    Uses Annotated reducers (operator.add) to handle concurrent updates during fan-out.
    """
    message: str
    session_id: str
    language: str
    selected_agents: List[str]
    agent_outputs: Annotated[List[Dict[str, Any]], operator.add]
    final_response: Dict[str, Any]
    retrieved_documents: Annotated[List[Dict[str, Any]], operator.add]
    errors: Annotated[List[Union[str, AgentError]], operator.add]
