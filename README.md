# JanMitra AI 🇮🇳
> **AI-Powered Multi-Agent Citizen Assistance Platform**  
> *AI First Hackathon 2026 — IIT Jammu & Techible*

JanMitra AI is an intelligent multi-agent platform designed to help Indian citizens seamlessly discover, understand, and access government schemes, healthcare advice, educational scholarships, agricultural support, and legal guidance through a single conversational interface.

---

## 🌟 Key Features
- 🤖 **Multi-Agent Orchestration**: Specialized AI agents work in parallel (Gov Schemes, Healthcare, Education, Agriculture).
- 🔀 **Intent Router**: Automatically classifies citizen prompts and routes queries to relevant domain experts.
- 🤝 **Response Aggregator**: Combines agent insights into a single cohesive response with actionable checklists and official sources.
- 📋 **Personalized Action Plans**: Clear, step-by-step guidance on document requirements and next steps.
- ⚡ **FastAPI & Gemini Integration**: High-performance backend ready for RAG document retrieval.

---

## 🏗️ Architecture

```
User Query
   │
   ▼
React Frontend
   │
   ▼ POST /api/chat
FastAPI Backend
   │
   ▼
Intent Router Agent
   │
   ├───────────────┼───────────────┼───────────────┐
   ▼               ▼               ▼               ▼
[Gov Schemes] [Education] [Agriculture] [Healthcare]
   │               │               │               │
   └───────────────┴───────┬───────┴───────────────┘
                           ▼
                 Response Aggregator
                           │
                           ▼
                  Personalized Response
```

---

## 🛠️ Technology Stack
- **Frontend**: React (Vite), React Router DOM, Framer Motion, React Markdown
- **Backend**: FastAPI, Python 3.10+, Uvicorn, Pydantic
- **AI Models & Frameworks**: Google Gemini API, LangChain / LangGraph
- **Database & RAG**: Supabase (PostgreSQL), FAISS vector search

---

## 📁 Repository Folder Structure

```
janmitra-ai/
├── backend/                  # FastAPI Backend & AI Pipeline
│   ├── main.py               # FastAPI entry point
│   ├── requirements.txt      # Python dependencies
│   └── app/
│       ├── api/              # API endpoints (chat.py)
│       ├── agents/           # AI Agents (router, expert agents, aggregator)
│       ├── core/             # Configuration, LLM & logging
│       ├── prompts/          # System prompts for agents
│       ├── rag/              # Vector retriever & embeddings
│       ├── models/           # Pydantic request/response schemas
│       └── clients/          # External API clients (Gemini, Supabase)
├── src/                      # React Frontend Application
│   ├── assets/
│   ├── clients/              # API fetch clients
│   ├── config/               # Frontend config
│   ├── components/           # Reusable UI & chat components
│   ├── pages/                # Home, Chat, Architecture pages
│   ├── hooks/                # Custom React hooks (useChat)
│   ├── styles/               # CSS styles
│   ├── App.jsx
│   └── main.jsx
├── docs/                     # Project & Technical Documentation
│   ├── Architecture.md
│   ├── ProblemStatement.md
│   ├── TechnicalDocumentation.md
│   ├── API.md
│   ├── Database.md
│   └── DevelopmentPlan.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

---

### Running the Frontend

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```
The frontend will run at `http://localhost:5173`.

---

### Running the Backend

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start FastAPI server
uvicorn main:app --reload
```
The backend API server will run at `http://localhost:8000`.

---

## 📡 API Overview

### POST `/api/chat`

**Request:**
```json
{
  "message": "My father is a farmer and I need scholarship",
  "session_id": "123",
  "language": "en"
}
```

**Response:**
```json
{
  "response": "Detailed guidance markdown response...",
  "agents": ["Education", "Agriculture", "Government Schemes"],
  "action_plan": [
    {
      "title": "Apply PM-KISAN",
      "description": "Direct income support of ₹6,000/year",
      "priority": "High"
    }
  ],
  "sources": [
    {
      "name": "PM-KISAN Portal",
      "url": "https://pmkisan.gov.in"
    }
  ]
}
```

---

## 🔮 Future Scope
- WhatsApp bot integration for rural accessibility
- Multilingual voice input and output in 22 Indian languages
- DigiLocker API integration for automated document verification

---

## 👥 Team Members
- **AI & Backend Development**: AI / Backend Lead
- **Frontend Development**: Frontend & UX Lead
