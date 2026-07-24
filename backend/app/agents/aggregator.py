from backend.app.core.logging import logger
from backend.app.models.response import ChatResponse, ActionItem, SourceItem


def run_aggregator_agent(message: str, agent_outputs: list[dict]) -> ChatResponse:
    """
    Aggregates outputs from specialized expert agents into a single coherent ChatResponse.

    Features:
    - Merges responses
    - Removes duplicate action items
    - Removes duplicate sources
    - Prioritizes recommendations
    - Returns a single unified response
    """

    logger.info("Aggregating agent outputs...")

    activated_agents = []
    combined_content = []

    unique_actions = {}
    unique_sources = {}

    priority_order = {
        "High": 1,
        "Medium": 2,
        "Low": 3,
    }

    for item in agent_outputs:

        # Track activated agents
        agent = item.get("agent")
        if agent:
            activated_agents.append(agent)

        # Merge response content
        content = item.get("content")
        if content:
            combined_content.append(content.strip())

        # Merge & deduplicate action items
        for act in item.get("action_items", []):
            title = act.get("title", "").strip()

            if not title:
                continue

            if title not in unique_actions:
                unique_actions[title] = ActionItem(
                    title=title,
                    description=act.get("description", ""),
                    priority=act.get("priority", "Medium"),
                )

        # Merge & deduplicate sources
        for src in item.get("sources", []):
            key = (
                src.get("name", "").strip(),
                src.get("url", "").strip(),
            )

            if key not in unique_sources:
                unique_sources[key] = SourceItem(
                    name=key[0],
                    url=key[1],
                )

    # Sort action items by priority
    action_plan = sorted(
        unique_actions.values(),
        key=lambda x: priority_order.get(x.priority, 99),
    )

    # Remove duplicate agent names
    activated_agents = list(dict.fromkeys(activated_agents))

    # Convert sources dictionary to list
    sources = list(unique_sources.values())

    # Build final unified response
    response = "\n\n".join(combined_content).strip()

    if not response:
        response = "No response could be generated."

    return ChatResponse(
        response=response,
        agents=activated_agents,
        action_plan=action_plan,
        sources=sources,
    )