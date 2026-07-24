import pytest
from unittest.mock import patch

from backend.app.graph.workflow import (
    run_agent_workflow,
    select_expert_agents,
    AGENT_NODES,
    workflow_app,
)
from backend.app.models.state import AgentState


class TestLangGraphWorkflow:
    def test_single_agent_execution(self):
        result = run_agent_workflow("I need a scholarship for my college education")
        assert isinstance(result, dict)
        assert "response" in result
        assert "agents" in result
        assert "action_plan" in result
        assert "sources" in result
        assert "Education" in result["agents"]

    def test_multi_agent_execution(self):
        result = run_agent_workflow("My father is a farmer looking for PM Kisan and I need college scholarship")
        assert isinstance(result, dict)
        assert len(result["agents"]) >= 2
        assert "Education" in result["agents"] or "Agriculture" in result["agents"]

    def test_ambiguous_query_fallback(self):
        result = run_agent_workflow("hello how are you")
        assert isinstance(result, dict)
        assert len(result["agents"]) >= 1
        assert "response" in result

    def test_select_expert_agents_mapping(self):
        state: AgentState = {
            "message": "test",
            "selected_agents": ["Education", "Agriculture", "NonExistentAgent"],
            "agent_outputs": [],
            "final_response": {},
            "retrieved_documents": [],
            "errors": [],
        }
        nodes = select_expert_agents(state)
        assert "education_agent" in nodes
        assert "agriculture_agent" in nodes
        assert len(nodes) == 2

    def test_agent_exception_resilience(self):
        """
        Simulates one expert agent raising an exception.
        Expected behavior: The workflow does not crash, other selected agents execute,
        aggregator completes, and a valid response dictionary is returned.
        """
        with patch("backend.app.graph.workflow.run_education_agent", side_effect=RuntimeError("Simulated LLM Timeout")):
            result = run_agent_workflow("I am a farmer looking for PM Kisan and college scholarship")
            assert isinstance(result, dict)
            assert "response" in result
            assert "action_plan" in result
            assert "sources" in result
