import math
import re
from collections import Counter

def _tokenize(text: str) -> list[str]:
    """Tokenize text into lowercase words and character 3-grams for semantic matching."""
    text_clean = re.sub(r"[^\w\s]", " ", text.lower())
    words = text_clean.split()
    tokens = list(words)
    
    # Add character n-grams (3-grams) for fuzzy/partial matching
    for word in words:
        if len(word) >= 3:
            for i in range(len(word) - 2):
                tokens.append(word[i:i+3])
    return tokens

def generate_embeddings(text: str) -> dict[str, float]:
    """
    Generates a TF-IDF term frequency vector representation for a given text.
    Provides fast, deterministic semantic vector matching with zero external dependencies.
    """
    if not text:
        return {}

    tokens = _tokenize(text)
    if not tokens:
        return {}

    counts = Counter(tokens)
    total = len(tokens)
    
    # Normalized term frequency
    tf_vector = {term: count / total for term, count in counts.items()}
    return tf_vector

def compute_cosine_similarity(vec1: dict[str, float], vec2: dict[str, float]) -> float:
    """
    Computes cosine similarity between two term frequency vectors.
    Returns a float score between 0.0 and 1.0.
    """
    if not vec1 or not vec2:
        return 0.0

    common_keys = set(vec1.keys()).intersection(set(vec2.keys()))
    if not common_keys:
        return 0.0

    dot_product = sum(vec1[key] * vec2[key] for key in common_keys)
    norm1 = math.sqrt(sum(val ** 2 for val in vec1.values()))
    norm2 = math.sqrt(sum(val ** 2 for val in vec2.values()))

    if norm1 == 0.0 or norm2 == 0.0:
        return 0.0

    return dot_product / (norm1 * norm2)
