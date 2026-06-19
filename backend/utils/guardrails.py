"""Security and relevancy guardrails for input validation."""
import re
import logging
from typing import Tuple, Optional, Dict, Any
from utils.config import SYSTEM_PROMPTS

logger = logging.getLogger(__name__)

SECURITY_PATTERNS = {
    "sql_injection": r"\b(union|select|drop|insert|update|delete|exec|execute)\b",
    "os_command": r"\b(cat|ls|rm|mkdir|chmod|wget|curl|bash|sh)\b",
    "template_injection": r"{{.*?}}|{%.*?%}",
    "xss": r"<script|javascript:|onerror|onclick"
}

RELEVANT_KEYWORDS = {
    "logistics": ["shipment", "delivery", "route", "vehicle", "address"],
    "chatbot": ["status", "delivery", "shipment", "order", "track"],
    "code_analysis": ["code", "bug", "issue", "quality", "sonar"]
}

class SecurityGuardrail:
    """Detects potential security threats in user input."""
    
    @staticmethod
    def check_injection_patterns(text: str) -> Tuple[bool, Optional[str]]:
        """Check for common injection attack patterns."""
        for threat_type, pattern in SECURITY_PATTERNS.items():
            if re.search(pattern, text, re.IGNORECASE):
                logger.warning(f"Security threat detected: {threat_type}")
                return False, threat_type
        return True, None
    
    @staticmethod
    def sanitize_input(text: str) -> str:
        """Basic input sanitization."""
        text = ''.join(char for char in text if ord(char) >= 32 or char in '\t\n\r')
        return text[:10000]

class RelevancyGuardrail:
    """Checks if input is relevant to the application domain."""
    
    @staticmethod
    def check_relevance(
        text: str,
        domain: str = "logistics",
        threshold: float = 0.7
    ) -> Tuple[bool, float]:
        """Check if text is relevant to domain."""
        text_lower = text.lower()
        
        if domain in RELEVANT_KEYWORDS:
            keywords = RELEVANT_KEYWORDS[domain]
            matches = sum(1 for kw in keywords if kw in text_lower)
            confidence = min(1.0, matches / len(keywords)) if keywords else 0.5
        else:
            confidence = 0.5
        
        is_relevant = confidence >= threshold
        logger.debug(f"Relevancy: {domain} - confidence={confidence}")
        return is_relevant, confidence

class InputValidator:
    """Combined input validation using all guardrails."""
    
    @staticmethod
    async def validate(
        text: str,
        domain: str = "logistics",
        use_llm_check: bool = False
    ) -> Tuple[bool, Dict[str, Any]]:
        """Validate input text against all guardrails."""
        details = {
            "security_ok": False,
            "security_threat": None,
            "relevancy_ok": False,
            "relevancy_score": 0.0,
            "sanitized_text": text
        }
        
        is_safe, threat = SecurityGuardrail.check_injection_patterns(text)
        details["security_ok"] = is_safe
        details["security_threat"] = threat
        
        if not is_safe:
            logger.warning(f"Security check failed. Threat: {threat}")
            return False, details
        
        details["sanitized_text"] = SecurityGuardrail.sanitize_input(text)
        
        is_relevant, confidence = RelevancyGuardrail.check_relevance(text, domain)
        details["relevancy_ok"] = is_relevant
        details["relevancy_score"] = confidence
        
        is_valid = is_safe and is_relevant
        return is_valid, details
