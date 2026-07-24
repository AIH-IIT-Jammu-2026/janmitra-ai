import pytest
from backend.app.agents.health import (
    run_health_agent,
    _search_health,
    HEALTH_DB,
)


class TestHealthKnowledgeBase:
    def test_knowledge_base_loaded(self):
        """Health knowledge base must load with at least 10 entries"""
        assert len(HEALTH_DB) >= 10, f"Expected ≥10 entries, got {len(HEALTH_DB)}"

    def test_each_entry_has_required_fields(self):
        required_fields = ["id", "name", "category", "description",
                           "eligibility", "benefits", "documents",
                           "how_to_apply", "portal", "keywords"]
        for entry in HEALTH_DB:
            for field in required_fields:
                assert field in entry, f"Entry '{entry.get('name')}' missing field '{field}'"

    def test_portals_are_valid_urls(self):
        for entry in HEALTH_DB:
            assert entry["portal"].startswith("http"), \
                f"Invalid portal URL in '{entry['name']}': {entry['portal']}"


class TestHealthSearch:
    def test_insurance_query_returns_pmjay(self):
        results = _search_health("free health insurance 5 lakh")
        names = [e["name"].lower() for e in results]
        assert any("pm-jay" in n or "ayushman" in n or "pmjay" in n for n in names)

    def test_medicine_query_returns_jan_aushadhi(self):
        results = _search_health("cheap generic medicine store")
        names = [e["name"].lower() for e in results]
        assert any("aushadhi" in n or "medicine" in n for n in names)

    def test_maternity_query(self):
        results = _search_health("pregnant woman scheme cash delivery")
        names = [e["name"].lower() for e in results]
        assert any("janani" in n or "matru" in n or "maternal" in n or "pmmvy" in n for n in names)

    def test_mental_health_query(self):
        results = _search_health("mental health counselling helpline")
        names = [e["name"].lower() for e in results]
        assert any("mental" in n or "manas" in n for n in names)

    def test_tb_query(self):
        results = _search_health("tuberculosis TB patient money support")
        names = [e["name"].lower() for e in results]
        assert any("nikshay" in n or "tb" in n.lower() for n in names)

    def test_empty_query_returns_defaults(self):
        results = _search_health("xyz999 unrelated query")
        assert len(results) > 0

    def test_returns_at_most_4_results(self):
        results = _search_health("insurance medicine pregnancy mental TB vaccine")
        assert len(results) <= 4


class TestHealthAgent:
    def test_agent_returns_required_keys(self):
        response = run_health_agent("What is Ayushman Bharat scheme?")
        assert "agent" in response
        assert "content" in response
        assert "action_items" in response
        assert "sources" in response

    def test_agent_name_is_correct(self):
        response = run_health_agent("health insurance free")
        assert response["agent"] == "Healthcare"

    def test_content_is_non_empty(self):
        response = run_health_agent("free medicine for poor people")
        assert len(response["content"]) > 50

    def test_action_items_non_empty(self):
        response = run_health_agent("maternal health scheme")
        assert len(response["action_items"]) > 0

    def test_sources_contain_urls(self):
        response = run_health_agent("government hospital free treatment")
        for source in response["sources"]:
            assert "url" in source
            assert source["url"].startswith("http")

    def test_pmjay_portal_in_sources(self):
        response = run_health_agent("health coverage free")
        urls = [s["url"] for s in response["sources"]]
        assert any("pmjay" in u or "gov.in" in u for u in urls)
