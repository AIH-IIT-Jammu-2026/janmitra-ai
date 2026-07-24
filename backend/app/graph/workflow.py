import time
from typing import List, Dict, Any
from langgraph.graph import StateGraph, START, END

from backend.app.models.state import AgentState, AgentError
from backend.app.agents.router import route_query
from backend.app.agents.education import run_education_agent
from backend.app.agents.agriculture import run_agriculture_agent
from backend.app.agents.health import run_health_agent
from backend.app.agents.schemes import run_schemes_agent
from backend.app.agents.aggregator import run_aggregator_agent
from backend.app.core.logging import logger

# Map agent names returned by Router to graph node names
AGENT_NODES = {
    "Education": "education_agent",
    "Agriculture": "agriculture_agent",
    "Healthcare": "healthcare_agent",
    "Government Schemes": "schemes_agent",
}


def router_node(state: AgentState) -> Dict[str, Any]:
    logger.info("Executing Router Node...")
    message = state.get("message", "")
    selected = route_query(message)
    logger.info(f"Router Selected: {', '.join(selected) if selected else 'None'}")
    return {
        "selected_agents": selected,
    }


def education_node(state: AgentState) -> Dict[str, Any]:
    logger.info("Running Education Agent...")
    try:
        res = run_education_agent(state["message"])
        logger.info("Completed Education Agent.")
        return {"agent_outputs": [res]}
    except Exception as e:
        logger.error(f"Education Agent failed: {e}")
        err: AgentError = {"agent": "Education", "message": str(e), "timestamp": time.time()}
        return {"errors": [err]}


def agriculture_node(state: AgentState) -> Dict[str, Any]:
    logger.info("Running Agriculture Agent...")
    try:
        res = run_agriculture_agent(state["message"])
        logger.info("Completed Agriculture Agent.")
        return {"agent_outputs": [res]}
    except Exception as e:
        logger.error(f"Agriculture Agent failed: {e}")
        err: AgentError = {"agent": "Agriculture", "message": str(e), "timestamp": time.time()}
        return {"errors": [err]}


def healthcare_node(state: AgentState) -> Dict[str, Any]:
    logger.info("Running Healthcare Agent...")
    try:
        res = run_health_agent(state["message"])
        logger.info("Completed Healthcare Agent.")
        return {"agent_outputs": [res]}
    except Exception as e:
        logger.error(f"Healthcare Agent failed: {e}")
        err: AgentError = {"agent": "Healthcare", "message": str(e), "timestamp": time.time()}
        return {"errors": [err]}


def schemes_node(state: AgentState) -> Dict[str, Any]:
    logger.info("Running Government Schemes Agent...")
    try:
        res = run_schemes_agent(state["message"])
        logger.info("Completed Government Schemes Agent.")
        return {"agent_outputs": [res]}
    except Exception as e:
        logger.error(f"Government Schemes Agent failed: {e}")
        err: AgentError = {"agent": "Government Schemes", "message": str(e), "timestamp": time.time()}
        return {"errors": [err]}


def select_expert_agents(state: AgentState) -> List[str]:
    """
    Conditional routing function that maps selected agent names to node names.
    Returns list of target node names for fan-out.
    """
    selected = state.get("selected_agents", [])
    target_nodes = [AGENT_NODES[name] for name in selected if name in AGENT_NODES]

    # Fallback to Government Schemes if no match
    if not target_nodes:
        target_nodes = ["schemes_agent"]

    return target_nodes


def aggregator_node(state: AgentState) -> Dict[str, Any]:
    logger.info("Running Aggregator...")
    message = state.get("message", "")
    agent_outputs = state.get("agent_outputs", [])

    response_model = run_aggregator_agent(message, agent_outputs)
    final_resp = response_model.model_dump()

    return {"final_response": final_resp}


# ── Build & Compile LangGraph StateGraph ──────────────────────────────────────
builder = StateGraph(AgentState)

# Add Nodes
builder.add_node("router", router_node)
builder.add_node("education_agent", education_node)
builder.add_node("agriculture_agent", agriculture_node)
builder.add_node("healthcare_agent", healthcare_node)
builder.add_node("schemes_agent", schemes_node)
builder.add_node("aggregator", aggregator_node)

# Add Edges
builder.add_edge(START, "router")

# Fan-out to selected expert agent nodes
builder.add_conditional_edges(
    "router",
    select_expert_agents,
    ["education_agent", "agriculture_agent", "healthcare_agent", "schemes_agent"]
)

# Connect all expert nodes to Aggregator node (Aggregator always runs)
builder.add_edge("education_agent", "aggregator")
builder.add_edge("agriculture_agent", "aggregator")
builder.add_edge("healthcare_agent", "aggregator")
builder.add_edge("schemes_agent", "aggregator")
builder.add_edge("aggregator", END)

# Compile the graph
workflow_app = builder.compile()


def get_graph_mermaid() -> str:
    """
    Returns Mermaid diagram string representation of compiled LangGraph workflow.
    """
    try:
        return workflow_app.get_graph().draw_mermaid()
    except Exception:
        return (
            "graph TD\n"
            "  START --> router\n"
            "  router --> education_agent\n"
            "  router --> agriculture_agent\n"
            "  router --> healthcare_agent\n"
            "  router --> schemes_agent\n"
            "  education_agent --> aggregator\n"
            "  agriculture_agent --> aggregator\n"
            "  healthcare_agent --> aggregator\n"
            "  schemes_agent --> aggregator\n"
            "  aggregator --> END\n"
        )


def run_agent_workflow(message: str, session_id: str = "123", language: str = "en") -> dict:
    """
    Executes JanMitra AI multi-agent workflow via LangGraph with performance timing.
    """
    logger.info(f"Workflow Started for message: '{message}'")
    start_time = time.perf_counter()

    initial_state: AgentState = {
        "message": message,
        "session_id": session_id,
        "language": language,
        "selected_agents": [],
        "agent_outputs": [],
        "final_response": {},
        "retrieved_documents": [],
        "errors": [],
    }

    final_state = workflow_app.invoke(initial_state)

    elapsed = time.perf_counter() - start_time
    logger.info(f"Workflow Completed Successfully in {elapsed:.2f} seconds.")

    return final_state.get("final_response", {})
