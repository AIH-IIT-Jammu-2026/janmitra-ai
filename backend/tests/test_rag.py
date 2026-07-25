import pytest
from backend.app.rag.embeddings import generate_embeddings, compute_cosine_similarity
from backend.app.rag.retriever import RAGRetriever, retrieve_context, retrieve_relevant_schemes


class TestRAGEmbeddings:
    def test_generate_embeddings_non_empty(self):
        vec = generate_embeddings("PM KISAN scheme for farmers")
        assert isinstance(vec, dict)
        assert len(vec) > 0
        assert "kisan" in vec

    def test_compute_cosine_similarity_identical(self):
        vec1 = generate_embeddings("ayushman bharat health insurance")
        vec2 = generate_embeddings("ayushman bharat health insurance")
        sim = compute_cosine_similarity(vec1, vec2)
        assert pytest.approx(sim, 0.01) == 1.0

    def test_compute_cosine_similarity_distinct(self):
        vec1 = generate_embeddings("ayushman bharat health insurance")
        vec2 = generate_embeddings("quantum mechanics physics space")
        sim = compute_cosine_similarity(vec1, vec2)
        assert sim < 0.2


class TestRAGRetriever:
    @pytest.fixture
    def retriever(self):
        return RAGRetriever()

    def test_retriever_initialization(self, retriever):
        assert len(retriever.documents) >= 50, f"Expected >=50 documents, got {len(retriever.documents)}"
        assert len(retriever.vectors) == len(retriever.documents)

    def test_domain_filtering_schemes(self, retriever):
        results = retriever.retrieve("farmer loan money", domain="schemes", top_k=3)
        assert len(results) <= 3
        for doc in results:
            assert doc["_domain"] == "schemes"

    def test_domain_filtering_health(self, retriever):
        results = retriever.retrieve("hospital insurance 5 lakh", domain="health", top_k=3)
        assert len(results) <= 3
        for doc in results:
            assert doc["_domain"] == "health"

    def test_retrieve_relevant_schemes_helper(self):
        results = retrieve_relevant_schemes("scholarship SC ST student", domain="education", top_k=4)
        assert len(results) > 0
        names = [r["name"].lower() for r in results]
        assert any("scholarship" in n or "sc" in n or "st" in n for n in names)

    def test_retrieve_context_helper(self):
        context = retrieve_context("solar pump subsidy", domain="agriculture", top_k=2)
        assert isinstance(context, list)
        assert len(context) <= 2
        assert len(context[0]) > 20
