# 🚀 JanMitra AI — MVP Deployment & Production Guide

## Overview
JanMitra AI MVP consists of a **FastAPI Multi-Agent Backend** (Python 3.11) and a **Vite + React Frontend**.

---

## 🛠️ Architecture Overview

```
[ React Frontend ] ──── (HTTP POST /api/chat) ────► [ FastAPI Backend ]
                                                             │
                                                     [ Intent Router ]
                                                             │
                                                ┌────────────┴────────────┐
                                                ▼                         ▼
                                       [ Agriculture Agent ]     [ Healthcare Agent ]
                                                │                         │
                                                └────────────┬────────────┘
                                                             ▼
                                                    [ RAG Retriever ]
                                                (110+ Schemes Knowledge Base)
                                                             │
                                                             ▼
                                                    [ Response Aggregator ]
                                                             │
                                                             ▼
                                                     [ Unified ChatResponse ]
```

---

## ⚡ Quickstart — Local Production Server

### 1. Backend Server
```bash
# From root directory
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs: `http://localhost:8000/docs`
- Healthcheck: `http://localhost:8000/`

### 2. Frontend App
```bash
# From root directory
npm run dev
```
- App URL: `http://localhost:5173`

---

## 🧪 Verification Suite
```bash
# Run full 86-test backend test suite
python -m pytest backend/tests -v
```

---

## ☁️ One-Click Cloud Deployment

### Backend (Render / Railway / Render Docker)
- **Build Command:** `pip install -r backend/requirements.txt`
- **Start Command:** `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables:**
  - `GEMINI_API_KEY`: Your Gemini API Key
  - `MODEL_NAME`: `gemini-1.5-flash`

### Frontend (Vercel / Netlify)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
  - `VITE_API_BASE_URL`: `https://your-backend-render-url.onrender.com/api`
