"""Authentication endpoints."""
from fastapi import APIRouter, HTTPException, Form
from datetime import datetime, timedelta
import jwt
import logging
from utils.config import settings

logger = logging.getLogger(__name__)

auth_router = APIRouter()

USERS_DB = {
    "dispatcher": {"password": "dispatch123", "role": "dispatcher"},
    "customer": {"password": "customer123", "role": "customer"},
    "admin": {"password": "admin123", "role": "admin"}
}

@auth_router.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    """Authenticate user and return JWT token."""
    if username not in USERS_DB or USERS_DB[username]["password"] != password:
        logger.warning(f"Failed login: {username}")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    payload = {
        "sub": username,
        "role": USERS_DB[username]["role"],
        "exp": datetime.utcnow() + timedelta(hours=settings.jwt_expiration_hours)
    }
    
    token = jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    logger.info(f"User logged in: {username}")
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": username,
        "role": USERS_DB[username]["role"]
    }

@auth_router.post("/logout")
async def logout(token: str):
    """Logout endpoint."""
    logger.info("User logged out")
    return {"message": "Logged out successfully"}

@auth_router.get("/verify")
async def verify_token(token: str):
    """Verify JWT token."""
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        return {"valid": True, "user": payload.get("sub"), "role": payload.get("role")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
