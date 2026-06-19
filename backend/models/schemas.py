"""Pydantic schemas for API requests/responses."""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ShipmentRequest(BaseModel):
    """Shipment data model."""
    id: str
    origin: str
    destination: str
    priority: int
    weight: float
    time_window: Optional[str] = None

class RouteRequest(BaseModel):
    """Route optimization request."""
    shipments: List[ShipmentRequest]
    vehicle_capacity: int = 100
    max_time: int = 8

class ChatbotQuery(BaseModel):
    """Chatbot query model."""
    message: str
    context: Optional[Dict[str, Any]] = None
    user_id: Optional[str] = None

class CodeAnalysisRequest(BaseModel):
    """Code analysis request."""
    code: str
    language: str = "python"
    max_iterations: int = 3
