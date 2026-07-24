import pytest
from backend.app.agents.schemes import (
    run_schemes_agent,
    _search_schemes,
    _build_fallback_response,
    SCHEMES_DB,
)


class TestSchemesKnowledgeBase:
    def test_knowledge_base_loaded(self):
        """JSON knowledge base must load with at least 10 schemes"""
        assert len(SCHEMES_DB) >= 10, f"Expected ≥10 schemes, got {len(SCHEMES_DB)}"

    def test_each_scheme_has_required_fields(self):
        required_fields = ["id", "name", "category", "description",
                           "eligibility", "benefits", "documents",
                           "how_to_apply", "portal", "keywords"]
        for scheme in SCHEMES_DB:
            for field in required_fields:
                assert field in scheme, f"Scheme '{scheme.get('name')}' missing field '{field}'"


class TestSchemeSearch:
    def test_farmer_query_returns_agriculture_schemes(self):
        results = _search_schemes("I am a farmer, what schemes are available for me?")
        categories = [s["category"] for s in results]
        assert "Agriculture" in categories

    def test_house_query_returns_housing_scheme(self):
        results = _search_schemes("I need help building a house")
        names = [s["name"].lower() for s in results]
        assert any("awas" in n for n in names)

    def test_health_query_returns_health_scheme(self):
        results = _search_schemes("hospital treatment insurance")
        names = [s["name"].lower() for s in results]
        assert any("ayushman" in n or "health" in n for n in names)

    def test_empty_query_returns_defaults(self):
        results = _search_schemes("random unrelated query xyz")
        assert len(results) == 3  # Returns top 3 defaults

    def test_returns_at_most_4_results(self):
        results = _search_schemes("farmer income land house pension insurance")
        assert len(results) <= 4

    def test_scholarship_query_returns_education_scheme(self):
        results = _search_schemes("scholarship for college students")
        categories = [s["category"] for s in results]
        assert "Education" in categories


class TestSchemesAgent:
    def test_agent_returns_required_keys(self):
        response = run_schemes_agent("What schemes are available for farmers?")
        assert "agent" in response
        assert "content" in response
        assert "action_items" in response
        assert "sources" in response

    def test_agent_name_is_correct(self):
        response = run_schemes_agent("help me with ration card")
        assert response["agent"] == "Government Schemes"

    def test_agent_content_is_non_empty(self):
        response = run_schemes_agent("I want to start a small business")
        assert len(response["content"]) > 50

    def test_action_items_are_non_empty(self):
        response = run_schemes_agent("I need health insurance for my family")
        assert len(response["action_items"]) > 0

    def test_sources_contain_urls(self):
        response = run_schemes_agent("pension for old age")
        for source in response["sources"]:
            assert "url" in source
            assert source["url"].startswith("http")

    def test_sources_always_include_myscheme_portal(self):
        response = run_schemes_agent("what benefits are available for me?")
        urls = [s["url"] for s in response["sources"]]
        assert "https://myscheme.gov.in" in urls
