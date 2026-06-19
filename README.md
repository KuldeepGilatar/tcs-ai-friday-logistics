# TCS AI Friday - Logistics Route Optimizer + Code Quality System

## Overview

A complete, production-ready solution combining:
- **Route Optimization Agent** - Multi-stop TSP solver with real-time weather/traffic adaptation
- **Customer Support Chatbot** - Conversational AI for shipment inquiries
- **Code Quality Agent** - SonarQube analysis + AI-powered code improvements with git pre-commit integration

## Tech Stack

### Backend
- Python 3.12 + FastAPI
- LLM: TCS GenAILab (DeepSeek-R1, GPT-4o, DeepSeek-V3)
- Vector DB: ChromaDB (semantic caching + RAG)
- Code Analysis: SonarQube integration

### Frontend
- Next.js 14.2.29 + React 18 + TypeScript
- Three-panel code viewer (Original | Improved | Diff)

## Setup

### Prerequisites
- Python 3.12+
- Node.js 18+
- ChromaDB (local or remote)
- SonarQube (optional, for code analysis)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Update .env with your configuration
cp ../.env .

# Run FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup (Coming Soon)

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /health` - Health check
- `GET /` - Root endpoint
- `POST /api/auth/login` - Authentication
- `GET /docs` - Swagger UI

## Features

✅ Multi-agent orchestration  
✅ Semantic caching with ChromaDB  
✅ Cross-Encoder reranking  
✅ Dynamic LLM routing  
✅ JWT authentication  
✅ WebSocket streaming  
✅ SonarQube integration  
✅ Git pre-commit hooks  
✅ Langsmith tracing  

## Project Structure

```
tcs-ai-friday-logistics/
├── backend/
│   ├── main.py
│   ├── utils/
│   │   ├── config.py
│   │   ├── llm_factory.py
│   │   ├── router.py
│   │   ├── cache.py
│   │   ├── reranker.py
│   │   ├── guardrails.py
│   │   └── code_diff_generator.py
│   ├── api/
│   │   ├── routes.py
│   │   ├── auth.py
│   │   ├── logistics.py
│   │   ├── chatbot.py
│   │   └── code_analysis.py
│   ├── agents/
│   │   ├── route_optimizer.py
│   │   ├── chatbot.py
│   │   └── code_analyzer.py
│   ├── services/
│   ├── models/
│   └── hooks/
├── frontend/ (Next.js 14.2.29)
├── .env
├── requirements.txt
└── README.md
```

## Usage

### Route Optimization
```python
from agents.route_optimizer import RouteOptimizer

optimizer = RouteOptimizer()
routes = await optimizer.optimize_routes(shipments, weather_data)
```

### Customer Chatbot
```python
from agents.chatbot import CustomerChatbot

chatbot = CustomerChatbot()
response = await chatbot.respond(customer_query)
```

### Code Analysis
```python
from agents.code_analyzer import CodeAnalyzer

analyzer = CodeAnalyzer()
improved_code = await analyzer.analyze_and_improve(code_snippet)
```

## Configuration

Update `.env` with:
- GenAILab API credentials
- ChromaDB connection details
- SonarQube settings
- JWT secret key
- Port settings

## Git Pre-Commit Hook

Automatically validates code quality on commit:
```bash
git commit -m "message"
# Triggers SonarQube check → AI improvement → re-validation
```

## Monitoring & Logging

- **Langsmith Integration** - All LLM calls traced and logged
- **Semantic Cache Metrics** - Cache hits/misses tracked
- **Reranking Scores** - Top-K retrieval quality monitored

## License

TCS Internal Use Only
