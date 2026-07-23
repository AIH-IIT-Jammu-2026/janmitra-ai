from backend.app.models.state import AgentState
from backend.app.agents.router import route_query
from backend.app.agents.education import run_education_agent
from backend.app.agents.agriculture import run_agriculture_agent
from backend.app.agents.health import run_health_agent
from backend.app.agents.schemes import run_schemes_agent
from backend.app.agents.aggregator import run_aggregator_agent
from backend.app.core.logging import logger

def router_node(state: AgentState) -> AgentState:
    logger.info("Executing Router Node...")
    agents = route_query(state["message"])
    state["selected_agents"] = agents
    state["agent_outputs"] = []
    return state

def expert_agents_node(state: AgentState) -> AgentState:
    logger.info(f"Executing Expert Agents Node for: {state['selected_agents']}")
    outputs = []
    for agent in state["selected_agents"]:
        if agent == "Education":
            outputs.append(run_education_agent(state["message"]))
        elif agent == "Agriculture":
            outputs.append(run_agriculture_agent(state["message"]))
        elif agent == "Healthcare":
            outputs.append(run_health_agent(state["message"]))
        elif agent == "Government Schemes":
            outputs.append(run_schemes_agent(state["message"]))
    state["agent_outputs"] = outputs
    return state

def aggregator_node(state: AgentState) -> AgentState:
    logger.info("Executing Aggregator Node...")
    response_model = run_aggregator_agent(state["message"], state["agent_outputs"])
    state["final_response"] = response_model.model_dump()
    return state

def run_agent_workflow(message: str, session_id: str = "123", language: str = "en") -> dict:
    """
    Executes JanMitra AI multi-agent workflow
    """
    state: AgentState = {
        "message": message,
        "session_id": session_id,
        "language": language,
        "selected_agents": [],
        "agent_outputs": [],
        "final_response": {},
    }

    state = router_node(state)
    state = expert_agents_node(state)
    state = aggregator_node(state)

    return state["final_response"]
