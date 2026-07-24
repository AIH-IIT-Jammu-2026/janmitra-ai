import pytest
from backend.app.agents.agriculture import (
    run_agriculture_agent,
    _search_agriculture,
    AGRICULTURE_DB,
)


class TestAgricultureKnowledgeBase:
    def test_knowledge_base_loaded(self):
        """Agriculture knowledge base must load with at least 15 entries"""
        assert len(AGRICULTURE_DB) >= 15, f"Expected ≥15 entries, got {len(AGRICULTURE_DB)}"

    def test_each_entry_has_required_fields(self):
        required_fields = ["id", "name", "category", "description",
                           "eligibility", "benefits", "documents",
                           "how_to_apply", "portal", "keywords"]
        for entry in AGRICULTURE_DB:
            for field in required_fields:
                assert field in entry, f"Entry '{entry.get('name')}' missing field '{field}'"

    def test_portals_are_valid_urls(self):
        for entry in AGRICULTURE_DB:
            assert entry["portal"].startswith("http"), \
                f"Invalid portal URL in '{entry['name']}': {entry['portal']}"


class TestAgricultureSearch:
    def test_income_support_query(self):
        results = _search_agriculture("PM KISAN 6000 income support")
        names = [e["name"].lower() for e in results]
        assert any("kisan" in n for n in names)

    def test_insurance_query(self):
        results = _search_agriculture("crop loss drought insurance")
        names = [e["name"].lower() for e in results]
        assert any("fasal bima" in n or "pmfby" in n or "insurance" in n for n in names)

    def test_solar_pump_query(self):
        results = _search_agriculture("solar pump subsidy for irrigation")
        names = [e["name"].lower() for e in results]
        assert any("kusum" in n or "solar" in n for n in names)

    def test_tractor_machinery_query(self):
        results = _search_agriculture("tractor subsidy farm machinery")
        names = [e["name"].lower() for e in results]
        assert any("machinery" in n or "tractor" in n or "smam" in n for n in names)

    def test_empty_query_returns_defaults(self):
        results = _search_agriculture("xyz999 unrelated query")
        assert len(results) > 0

    def test_returns_at_most_4_results(self):
        results = _search_agriculture("kisan insurance tractor solar organic fish")
        assert len(results) <= 4


class TestAgricultureAgent:
    def test_agent_returns_required_keys(self):
        response = run_agriculture_agent("How to get Kisan Credit Card?")
        assert "agent" in response
        assert "content" in response
        assert "action_items" in response
        assert "sources" in response

    def test_agent_name_is_correct(self):
        response = run_agriculture_agent("help with farm loan")
        assert response["agent"] == "Agriculture"

    def test_content_is_non_empty(self):
        response = run_agriculture_agent("I suffered crop loss due to heavy rain")
        assert len(response["content"]) > 50

    def test_action_items_non_empty(self):
        response = run_agriculture_agent("solar pump application process")
        assert len(response["action_items"]) > 0

    def test_sources_contain_urls(self):
        response = run_agriculture_agent("organic farming subsidy")
        for source in response["sources"]:
            assert "url" in source
            assert source["url"].startswith("http")

    def test_pmkisan_portal_in_sources(self):
        response = run_agriculture_agent("farmer benefits")
        urls = [s["url"] for s in response["sources"]]
        assert any("pmkisan" in u or "gov.in" in u for u in urls)
