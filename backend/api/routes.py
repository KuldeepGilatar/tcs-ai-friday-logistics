"""Core API routes."""
from fastapi import APIRouter
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/status")
async def api_status():
    return {"status": "operational", "service": "TCS AI Friday"}
