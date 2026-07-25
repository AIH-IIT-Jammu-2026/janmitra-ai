import pytest
from backend.app.agents.education import (
    run_education_agent,
    _search_education,
    EDUCATION_DB,
)


class TestEducationKnowledgeBase:
    def test_knowledge_base_loaded(self):
        """Education knowledge base must load with at least 15 entries"""
        assert len(EDUCATION_DB) >= 15, f"Expected ≥15 entries, got {len(EDUCATION_DB)}"

    def test_each_entry_has_required_fields(self):
        required_fields = ["id", "name", "category", "description",
                           "eligibility", "benefits", "documents",
                           "how_to_apply", "portal", "keywords"]
        for entry in EDUCATION_DB:
            for field in required_fields:
                assert field in entry, f"Entry '{entry.get('name')}' missing field '{field}'"

    def test_portals_are_valid_urls(self):
        for entry in EDUCATION_DB:
            assert entry["portal"].startswith("http"), \
                f"Invalid portal URL in '{entry['name']}': {entry['portal']}"


class TestEducationSearch:
    def test_sc_query_returns_sc_scholarship(self):
        results = _search_education("I am an SC student looking for scholarship")
        names = [e["name"].lower() for e in results]
        assert any("sc" in n or "scheduled caste" in n or "dalit" in n for n in names)

    def test_minority_query_returns_minority_scholarship(self):
        results = _search_education("minority community scholarship for college")
        names = [e["name"].lower() for e in results]
        assert any("minority" in n for n in names)

    def test_engineering_query_returns_relevant_entry(self):
        results = _search_education("engineering entrance exam JEE")
        names = [e["name"].lower() for e in results]
        assert any("jee" in n or "engineering" in n for n in names)

    def test_medical_query_returns_neet(self):
        results = _search_education("MBBS admission medical entrance")
        names = [e["name"].lower() for e in results]
        assert any("neet" in n or "medical" in n for n in names)

    def test_empty_query_returns_defaults(self):
        results = _search_education("xyz123 unrelated query")
        assert len(results) > 0
        for r in results:
            assert "category" in r

    def test_returns_at_most_4_results(self):
        results = _search_education("SC ST OBC minority scholarship engineering medical")
        assert len(results) <= 4

    def test_girl_student_query(self):
        results = _search_education("scholarship for single girl child")
        names = [e["name"].lower() for e in results]
        assert any("girl" in n or "sukanya" in n or "single" in n for n in names)


class TestEducationAgent:
    def test_agent_returns_required_keys(self):
        response = run_education_agent("What scholarships are available for OBC students?")
        assert "agent" in response
        assert "content" in response
        assert "action_items" in response
        assert "sources" in response

    def test_agent_name_is_correct(self):
        response = run_education_agent("help me find scholarship")
        assert response["agent"] == "Education"

    def test_content_is_non_empty(self):
        response = run_education_agent("I am an ST student in Class 11")
        assert len(response["content"]) > 50

    def test_action_items_non_empty(self):
        response = run_education_agent("scholarship for engineering student minority")
        assert len(response["action_items"]) > 0

    def test_sources_contain_urls(self):
        response = run_education_agent("how to apply for JEE main exam")
        for source in response["sources"]:
            assert "url" in source
            assert source["url"].startswith("http")

    def test_nsp_portal_always_in_sources(self):
        response = run_education_agent("any scholarship available for me?")
        urls = [s["url"] for s in response["sources"]]
        assert "https://scholarships.gov.in" in urls
