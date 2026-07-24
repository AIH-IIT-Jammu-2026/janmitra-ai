import pytest
from backend.app.agents.aggregator import run_aggregator_agent
from backend.app.models.response import ActionItem, SourceItem, ChatResponse


class TestAggregatorAgent:
    def test_single_agent_aggregation(self):
        outputs = [
            {
                "agent": "Education",
                "content": "NSP portal offers scholarships for eligible students.",
                "action_items": [
                    {"title": "Apply NSP", "description": "Visit portal", "priority": "High"}
                ],
                "sources": [
                    {"name": "NSP Portal", "url": "https://scholarships.gov.in"}
                ]
            }
        ]
        res = run_aggregator_agent("scholarship query", outputs)
        assert isinstance(res, ChatResponse)
        assert res.agents == ["Education"]
        assert "NSP portal" in res.response
        assert len(res.action_plan) == 1
        assert res.action_plan[0].title == "Apply NSP"
        assert res.action_plan[0].priority == "High"
        assert len(res.sources) == 1
        assert res.sources[0].url == "https://scholarships.gov.in"

    def test_multi_agent_deduplication_and_priority_sorting(self):
        outputs = [
            {
                "agent": "Government Schemes",
                "content": "PM-KISAN provides income support.",
                "action_items": [
                    {"title": "Check Aadhaar Link", "description": "Medium priority task", "priority": "Medium"},
                    {"title": "Apply PM-KISAN", "description": "Land documents required", "priority": "Medium"}
                ],
                "sources": [
                    {"name": "PM Kisan Portal", "url": "https://pmkisan.gov.in"},
                    {"name": "MyScheme", "url": "https://myscheme.gov.in"}
                ]
            },
            {
                "agent": "Agriculture",
                "content": "PM-KISAN ₹6,000 yearly grant for farmers.",
                "action_items": [
                    {"title": "apply pm-kisan", "description": "High priority task", "priority": "High"},  # Duplicate title, higher priority
                    {"title": "Soil Health Test", "description": "Visit KVK", "priority": "Low"}
                ],
                "sources": [
                    {"name": "pm kisan portal", "url": "https://pmkisan.gov.in"}  # Duplicate source
                ]
            }
        ]

        res = run_aggregator_agent("farmer scheme query", outputs)
        assert len(res.agents) == 2
        assert "Government Schemes" in res.agents
        assert "Agriculture" in res.agents

        # Check action items deduplicated (case-insensitive) -> 3 total items
        titles = [a.title.lower() for a in res.action_plan]
        assert len(res.action_plan) == 3
        assert "apply pm-kisan" in titles or "apply pm-kisan" in [t.lower() for t in titles]

        # Check PM-KISAN priority upgraded to High
        pm_kisan_item = next(a for a in res.action_plan if a.title.lower() == "apply pm-kisan")
        assert pm_kisan_item.priority == "High"

        # Check priority sorting (High first, then Medium, then Low)
        priorities = [a.priority for a in res.action_plan]
        assert priorities == ["High", "Medium", "Low"]

        # Check sources deduplicated
        assert len(res.sources) == 2

    def test_pydantic_model_inputs(self):
        outputs = [
            {
                "agent": "Healthcare",
                "content": "Ayushman Bharat coverage available.",
                "action_items": [
                    ActionItem(title="Get ABHA Card", description="Register online", priority="High")
                ],
                "sources": [
                    SourceItem(name="PMJAY Portal", url="https://pmjay.gov.in")
                ]
            }
        ]
        res = run_aggregator_agent("health query", outputs)
        assert res.agents == ["Healthcare"]
        assert len(res.action_plan) == 1
        assert res.action_plan[0].title == "Get ABHA Card"
        assert len(res.sources) == 1
        assert res.sources[0].name == "PMJAY Portal"

    def test_empty_agent_outputs(self):
        res = run_aggregator_agent("empty query", [])
        assert res.agents == []
        assert res.action_plan == []
        assert res.sources == []
        assert res.response == "No agent response generated."
