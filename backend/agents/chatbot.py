"""Customer support chatbot agent."""
import logging
from typing import Dict, Any, Optional
from utils.llm_factory import LLMFactory
from utils.router import LLMRouter

logger = logging.getLogger(__name__)

class CustomerChatbot:
    """Conversational AI chatbot for customer support."""
    
    def __init__(self):
        self.llm = LLMFactory.create_chatbot_llm()
        self.conversation_history = []
        logger.info("Customer Chatbot Agent initialized")
    
    async def respond(
        self,
        customer_query: str,
        context: Optional[str] = None
    ) -> Dict[str, Any]:
        """Generate response to customer query."""
        try:
            logger.info(f"Processing query: {customer_query[:50]}...")
            
            self.conversation_history.append({"role": "customer", "message": customer_query})
            
            response = await LLMRouter.route_and_invoke(
                prompt=customer_query,
                agent_type="chatbot",
                context=context
            )
            
            self.conversation_history.append({"role": "bot", "message": response})
            
            return {
                "status": "success",
                "response": response,
                "confidence": 0.95,
                "turn_number": len(self.conversation_history) // 2
            }
        except Exception as e:
            logger.error(f"Chatbot response failed: {str(e)}")
            raise
