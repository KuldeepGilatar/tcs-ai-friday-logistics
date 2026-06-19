"""FastAPI main application entry point."""
import os
import sys
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 TCS AI Friday Logistics System Starting...")
    yield
    logger.info("🛑 TCS AI Friday Logistics System Shutdown")

app = FastAPI(
    title="TCS AI Friday - Logistics Route Optimizer",
    description="Multi-agent AI system for route optimization and code quality",
    version="1.0.0",
    lifespan=lifespan
)

CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "TCS AI Friday"}

@app.get("/")
async def root():
    return {
        "message": "TCS AI Friday - Logistics Route Optimizer",
        "docs": "/docs",
        "redoc": "/redoc"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
