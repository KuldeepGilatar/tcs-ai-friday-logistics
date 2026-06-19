"""Configuration module for LLM models and settings."""
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    genailab_base_url = os.getenv("GENAILAB_BASE_URL", "https://genailab.tcs.in")
    genailab_api_key = os.getenv("GENAILAB_API_KEY", "sk-FAfL61aVBMBdxDKjUie2oQ")
    model_gpt4o = os.getenv("GENAILAB_MODEL_GPT4O", "azure/genailab-maas-gpt-4o")
    model_gpt4o_mini = os.getenv("GENAILAB_MODEL_GPT4O_MINI", "azure/genailab-maas-gpt-4o-mini")
    model_deepseek_r1 = os.getenv("GENAILAB_MODEL_DEEPSEEK_R1", "azureai/genailab-maas-DeepSeek-R1")
    model_deepseek_v3 = os.getenv("GENAILAB_MODEL_DEEPSEEK_V3", "azureai/genailab-maas-DeepSeek-V3-0324")
    jwt_secret_key = os.getenv("JWT_SECRET_KEY", "your-super-secret-key")
    jwt_algorithm = os.getenv("JWT_ALGORITHM", "HS256")

settings = Settings()

MODEL_REGISTRY = {
    "gpt-4o": {"model_id": settings.model_gpt4o, "context_window": 128000},
    "gpt-4o-mini": {"model_id": settings.model_gpt4o_mini, "context_window": 128000},
    "deepseek-r1": {"model_id": settings.model_deepseek_r1, "context_window": 32000},
    "deepseek-v3": {"model_id": settings.model_deepseek_v3, "context_window": 32000},
}

SYSTEM_PROMPTS = {
    "route_optimizer": "You are an expert logistics route optimization specialist.",
    "chatbot": "You are a professional logistics customer support chatbot.",
    "code_analyzer": "You are an expert code quality analyst and refactoring specialist."
}
