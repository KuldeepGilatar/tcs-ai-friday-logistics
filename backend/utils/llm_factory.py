"""LLM Factory for creating ChatOpenAI instances."""
import httpx
import logging
from langchain_openai import ChatOpenAI
from utils.config import settings, MODEL_REGISTRY

logger = logging.getLogger(__name__)

class LLMFactory:
    _instances = {}
    
    @staticmethod
    def create_llm(model_name: str, temperature: float = 0.7, max_tokens: int = None) -> ChatOpenAI:
        cache_key = f"{model_name}_{temperature}"
        if cache_key in LLMFactory._instances:
            return LLMFactory._instances[cache_key]
        
        try:
            client = httpx.Client(verify=False, timeout=60.0)
            model_id = MODEL_REGISTRY.get(model_name, {}).get("model_id", "azure/genailab-maas-gpt-4o-mini")
            
            llm = ChatOpenAI(
                base_url=settings.genailab_base_url,
                model=model_id,
                api_key=settings.genailab_api_key,
                http_client=client,
                temperature=temperature,
                max_tokens=max_tokens
            )
            
            LLMFactory._instances[cache_key] = llm
            logger.info(f"LLM instance created: {model_name}")
            return llm
            
        except Exception as e:
            logger.error(f"Failed to create LLM: {str(e)}")
            raise
