from backend.app.core.logging import logger
from backend.app.models.response import ChatResponse, ActionItem, SourceItem

PRIORITY_ORDER = {
    "High": 1,
    "Medium": 2,
    "Low": 3,
}

def _get_priority_score(priority: str) -> int:
    return PRIORITY_ORDER.get(priority.capitalize() if priority else "Medium", 99)

def run_aggregator_agent(message: str, agent_outputs: list[dict]) -> ChatResponse:
    """
    Aggregates outputs from specialized expert agents into a single coherent ChatResponse.

    Features:
    - Merges and formats multi-agent responses
    - Case-insensitive deduplication of action items with priority upgrading
    - Case-insensitive deduplication of sources
    - Priority-based action item sorting (High -> Medium -> Low)
    - Type-safe handling for both dict and Pydantic model items
    - Generates a clean, unified response for frontend
    """
    logger.info("Aggregating agent outputs...")

    activated_agents = []
    combined_content = []
    unique_actions: dict[str, ActionItem] = {}
    unique_sources: dict[tuple[str, str], SourceItem] = {}

    for item in agent_outputs:
        if not item:
            continue

        # Track activated agent name
        agent_name = item.get("agent") if isinstance(item, dict) else getattr(item, "agent", None)
        if agent_name:
            activated_agents.append(agent_name)

        # Merge response text
        content = item.get("content") if isinstance(item, dict) else getattr(item, "content", None)
        if content and content.strip():
            stripped_content = content.strip()
            # If multiple agents respond, add agent section header for clarity
            if agent_name and len(agent_outputs) > 1 and not stripped_content.startswith("#"):
                combined_content.append(f"### {agent_name}\n{stripped_content}")
            else:
                combined_content.append(stripped_content)

        # Process action items (handle both dict and ActionItem instances)
        raw_actions = item.get("action_items", []) if isinstance(item, dict) else getattr(item, "action_items", [])
        for act in raw_actions:
            if isinstance(act, ActionItem):
                title = act.title.strip()
                desc = act.description.strip()
                priority = act.priority or "Medium"
            elif isinstance(act, dict):
                title = act.get("title", "").strip()
                desc = act.get("description", "").strip()
                priority = act.get("priority", "Medium")
            else:
                continue

            if not title:
                continue

            norm_title = title.lower()
            if norm_title not in unique_actions:
                unique_actions[norm_title] = ActionItem(
                    title=title,
                    description=desc,
                    priority=priority,
                )
            else:
                # If duplicate item is found with higher priority, upgrade priority
                existing_item = unique_actions[norm_title]
                if _get_priority_score(priority) < _get_priority_score(existing_item.priority or "Medium"):
                    unique_actions[norm_title] = ActionItem(
                        title=title,
                        description=desc or existing_item.description,
                        priority=priority,
                    )

        # Process sources (handle both dict and SourceItem instances)
        raw_sources = item.get("sources", []) if isinstance(item, dict) else getattr(item, "sources", [])
        for src in raw_sources:
            if isinstance(src, SourceItem):
                name = src.name.strip()
                url = src.url.strip()
            elif isinstance(src, dict):
                name = src.get("name", "").strip()
                url = src.get("url", "").strip()
            else:
                continue

            if not name and not url:
                continue

            key = (name.lower(), url.lower())
            if key not in unique_sources:
                unique_sources[key] = SourceItem(
                    name=name,
                    url=url,
                )

    # Sort action items by priority (High -> Medium -> Low)
    action_plan = sorted(
        unique_actions.values(),
        key=lambda x: _get_priority_score(x.priority or "Medium"),
    )

    # Deduplicate agent list while maintaining order
    activated_agents = list(dict.fromkeys(activated_agents))

    # Convert sources dictionary to list
    sources = list(unique_sources.values())

    # Build final combined text
    final_text = "\n\n---\n\n".join(combined_content) if combined_content else "No agent response generated."

    return ChatResponse(
        response=final_text,
        agents=activated_agents,
        action_plan=action_plan,
        sources=sources,
    )