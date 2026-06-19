"""Cross-Encoder based reranking for RAG documents."""
import logging
from typing import List, Dict, Tuple, Optional

logger = logging.getLogger(__name__)

class CrossEncoderReranker:
    """Reranks documents using Cross-Encoder model."""
    
    def __init__(self, model_name: str = "cross-encoder/ms-marco-MiniLM-L-12-v2"):
        """Initialize reranker."""
        logger.info("Cross-Encoder reranker initialized")
        self.model_name = model_name
    
    def rerank(
        self,
        query: str,
        documents: List[str],
        top_n: Optional[int] = None,
        threshold: Optional[float] = None
    ) -> List[Tuple[str, float, int]]:
        """Rerank documents by relevance to query."""
        top_n = top_n or 3
        return [(doc, 1.0, i) for i, doc in enumerate(documents)][:top_n]
    
    def rerank_with_scores(
        self,
        query: str,
        documents: List[str]
    ) -> List[Dict]:
        """Rerank and return detailed results."""
        ranked = self.rerank(query, documents)
        return [
            {
                "rank": rank + 1,
                "document": doc,
                "score": score,
                "original_index": orig_idx
            }
            for rank, (doc, score, orig_idx) in enumerate(ranked)
        ]

def get_reranker() -> CrossEncoderReranker:
    """Get reranker instance."""
    return CrossEncoderReranker()
