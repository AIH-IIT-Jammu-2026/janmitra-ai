from backend.app.core.logging import logger
from backend.app.models.response import ChatResponse, ActionItem, SourceItem

def run_aggregator_agent(message: str, agent_outputs: list[dict]) -> ChatResponse:
    """
    Aggregates outputs from specialized expert agents into a cohesive ChatResponse
    """
    logger.info("Aggregating agent outputs...")

    activated_agents = []
    actions = []
    sources = []
    combined_content = []

    for item in agent_outputs:
        if "agent" in item:
            activated_agents.append(item["agent"])
        if "content" in item:
            combined_content.append(f"### {item['agent']}\n{item['content']}")
        if "action_items" in item:
            for act in item["action_items"]:
                actions.append(ActionItem(
                    title=act.get("title", ""),
                    description=act.get("description", ""),
                    priority=act.get("priority", "High")
                ))
        if "sources" in item:
            for src in item["sources"]:
                sources.append(SourceItem(
                    name=src.get("name", ""),
                    url=src.get("url", "")
                ))

    final_text = "\n\n".join(combined_content) if combined_content else "No agent response generated."

    return ChatResponse(
        response=final_text,
        agents=activated_agents,
        action_plan=actions,
        sources=sources,
    )
