import os
import json
from typing import Optional
from backend.app.core.logging import logger
from backend.app.rag.embeddings import generate_embeddings, compute_cosine_similarity

_BASE_DIR = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".."))

DATASET_PATHS = {
    "schemes": os.path.join(_BASE_DIR, "data", "government_schemes", "schemes.json"),
    "education": os.path.join(_BASE_DIR, "data", "education", "education.json"),
    "agriculture": os.path.join(_BASE_DIR, "data", "agriculture", "agriculture.json"),
    "health": os.path.join(_BASE_DIR, "data", "health", "health.json"),
}

class RAGRetriever:
    """
    RAG Retriever that indexes all knowledge bases across Government Schemes,
    Education, Agriculture, and Health into a unified vector store for semantic retrieval.
    """

    def __init__(self):
        self.documents: list[dict] = []
        self.vectors: list[dict[str, float]] = []
        self.domain_map: dict[str, list[int]] = {
            "schemes": [],
            "education": [],
            "agriculture": [],
            "health": []
        }
        self._load_and_index()

    def _load_and_index(self):
        """Loads all JSON knowledge base files and builds TF-IDF vector index."""
        doc_idx = 0
        for domain, path in DATASET_PATHS.items():
            if not os.path.exists(path):
                logger.warning(f"[RAG] Dataset file not found: {path}")
                continue

            try:
                with open(path, "r", encoding="utf-8") as f:
                    entries = json.load(f)

                for item in entries:
                    item["_domain"] = domain
                    # Form rich composite text for vector indexing
                    name = item.get("name", "")
                    desc = item.get("description", "")
                    cat = item.get("category", "")
                    elig = " ".join(item.get("eligibility", []))
                    kws = " ".join(item.get("keywords", []))

                    full_text = f"{name} {cat} {desc} {elig} {kws}"
                    vec = generate_embeddings(full_text)

                    self.documents.append(item)
                    self.vectors.append(vec)
                    self.domain_map[domain].append(doc_idx)
                    doc_idx += 1

                logger.info(f"[RAG] Indexed {len(entries)} documents for domain '{domain}'")
            except Exception as e:
                logger.error(f"[RAG] Error loading dataset {path}: {e}")

        logger.info(f"[RAG] Indexing complete. Total documents in vector store: {len(self.documents)}")

    def retrieve(self, query: str, domain: Optional[str] = None, top_k: int = 4) -> list[dict]:
        """
        Retrieves top_k most relevant documents for a given query.
        Optionally filters by domain ('schemes', 'education', 'agriculture', 'health').
        """
        if not query or not query.strip():
            # Return top_k defaults for domain
            if domain and domain in self.domain_map and self.domain_map[domain]:
                indices = self.domain_map[domain][:top_k]
                return [self.documents[i] for i in indices]
            return self.documents[:top_k]

        query_vec = generate_embeddings(query)
        query_words = set(query.lower().split())

        candidate_indices = (
            self.domain_map[domain]
            if domain and domain in self.domain_map and self.domain_map[domain]
            else list(range(len(self.documents)))
        )

        scored: list[tuple[float, dict]] = []
        for idx in candidate_indices:
            doc = self.documents[idx]
            doc_vec = self.vectors[idx]

            # Vector similarity score
            sim_score = compute_cosine_similarity(query_vec, doc_vec)

            # Keyword / exact match boost
            kw_boost = 0.0
            doc_kws = [kw.lower() for kw in doc.get("keywords", [])]
            for kw in doc_kws:
                if kw in query.lower():
                    kw_boost += 0.3
                else:
                    kw_words = set(kw.split())
                    common = kw_words.intersection(query_words)
                    kw_boost += len(common) * 0.1

            # Title match boost
            if any(w in doc.get("name", "").lower() for w in query_words if len(w) > 2):
                kw_boost += 0.2

            final_score = sim_score + kw_boost
            if final_score > 0:
                scored.append((final_score, doc))

        scored.sort(key=lambda x: x[0], reverse=True)
        results = [doc for _, doc in scored[:top_k]]

        if not results and candidate_indices:
            # Fallback if no positive matches found
            results = [self.documents[i] for i in candidate_indices[:top_k]]

        return results


# Global singleton instance
retriever_instance = RAGRetriever()

def retrieve_context(query: str, domain: Optional[str] = None, top_k: int = 4) -> list[str]:
    """
    RAG retriever helper function that returns text snippets for prompt injection.
    """
    docs = retriever_instance.retrieve(query, domain=domain, top_k=top_k)
    context_list = []
    for d in docs:
        snippet = f"Scheme: {d.get('name')}\nCategory: {d.get('category')}\nDescription: {d.get('description')}\nEligibility: {'; '.join(d.get('eligibility', []))}\nBenefits: {d.get('benefits')}\nPortal: {d.get('portal')}"
        context_list.append(snippet)
    return context_list

def retrieve_relevant_schemes(query: str, domain: Optional[str] = None, top_k: int = 4) -> list[dict]:
    """
    RAG retriever function returning structured document dictionaries for expert agents.
    """
    return retriever_instance.retrieve(query, domain=domain, top_k=top_k)
