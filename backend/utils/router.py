"""Dynamic LLM router for complexity-based model selection."""
import logging
from typing import Optional
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from utils.llm_factory import LLMFactory
from utils.config import SYSTEM_PROMPTS

logger = logging.getLogger(__name__)

class LLMRouter:
    """Routes prompts to appropriate LLM based on complexity."""
    
    LOW_COMPLEXITY_THRESHOLD = 500
    HIGH_COMPLEXITY_THRESHOLD = 2000
    
    @staticmethod
    def analyze_complexity(prompt: str, context: Optional[str] = None) -> str:
        """Analyze task complexity."""
        total_size = len(prompt) + (len(context or "") * 2)
        
        if total_size < LLMRouter.LOW_COMPLEXITY_THRESHOLD:
            return "low"
        elif total_size < LLMRouter.HIGH_COMPLEXITY_THRESHOLD:
            return "medium"
        else:
            return "high"
    
    @staticmethod
    def select_model(complexity: str, agent_type: str) -> str:
        """Select model based on complexity and agent type."""
        if agent_type == "route_optimizer":
            return "deepseek-r1" if complexity in ["high", "medium"] else "gpt-4o-mini"
        elif agent_type == "chatbot":
            return "gpt-4o" if complexity == "high" else "gpt-4o-mini"
        elif agent_type == "code_analyzer":
            return "deepseek-v3" if complexity in ["high", "medium"] else "gpt-4o-mini"
        else:
            return "gpt-4o-mini"
    
    @staticmethod
    async def route(
        prompt: str,
        agent_type: str,
        context: Optional[str] = None,
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None
    ) -> ChatOpenAI:
        """Route to appropriate LLM."""
        complexity = LLMRouter.analyze_complexity(prompt, context)
        logger.info(f"Complexity: {complexity} | Agent: {agent_type}")
        
        model_name = LLMRouter.select_model(complexity, agent_type)
        logger.info(f"Selected model: {model_name}")
        
        try:
            llm = LLMFactory.create_llm(
                model_name=model_name,
                temperature=temperature or 0.7,
                max_tokens=max_tokens
            )
            return llm
            
        except Exception as e:
            logger.error(f"Primary model failed: {str(e)}. Fallback to gpt-4o-mini")
            return LLMFactory.create_llm(model_name="gpt-4o-mini")
    
    @staticmethod
    async def route_and_invoke(
        prompt: str,
        agent_type: str,
        context: Optional[str] = None,
        system_prompt: Optional[str] = None
    ) -> str:
        """Route and invoke LLM."""
        llm = await LLMRouter.route(
            prompt=prompt,
            agent_type=agent_type,
            context=context,
            system_prompt=system_prompt
        )
        
        sys_prompt = system_prompt or SYSTEM_PROMPTS.get(agent_type, "")
        messages = [SystemMessage(content=sys_prompt)]
        
        if context:
            messages.append(HumanMessage(content=f"Context: {context}"))
        
        messages.append(HumanMessage(content=prompt))
        
        response = await llm.ainvoke(messages)
        return response.content
