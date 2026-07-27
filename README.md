# 🇮🇳 JanMitra AI — India's Multi-Agent Citizen Co-Pilot
> **AI First Hackathon 2026 (Summer School '26) — Round 2 MVP Submission**  
> *Organised by I3C - IIT Jammu × Techible*

[![Hackathon](https://img.shields.io/badge/Hackathon-IIT_Jammu_AI_First-blue.svg)](https://iitjammu.ac.in)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org)
[![LangGraph](https://img.shields.io/badge/LangGraph-Multi_Agent-orange.svg)](https://python.langchain.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

JanMitra AI is an intelligent, voice-enabled multi-agent AI co-pilot designed to bridge the **₹1.5 Lakh Crore unclaimed benefits gap** by giving 1.4 billion Indian citizens seamless, multimodal access to government schemes, healthcare advice, scholarships, agricultural subsidies, employment skills, legal rights, and emergency assistance in 22 Indian languages.

---

## 🌟 Executive Summary & Key Highlights

- **🧠 Multi-Agent Orchestration (LangGraph + FastAPI)**: Intent Router dispatches queries to 7 specialized domain agents (`Gov Schemes`, `Healthcare`, `Education`, `Agriculture`, `Employment`, `Legal Guidance`, `Emergency SOS`).
- **📄 Vision AI Document Verification**: Upload physical certificates (Aadhaar, Income Certificate, Farmer Records) for instant OCR parsing & scheme eligibility matching.
- **🎙️ Multilingual Voice Co-Pilot & Avatar ("Janvi")**: Voice-to-voice interaction in 22 Indian languages powered by Web Speech API & D-ID/3D Digital Human Avatar.
- **🏠 Citizen Digital Portal**: Visual step-by-step **Citizen Journey Timeline**, goal checklist, 1-click Action Plan PDF export, and verified document vaults.
- **🛡️ Privacy & Security Centre**: Aligned with **DPDP Act 2023 principles** (consent, data minimisation, secure processing, and user-controlled data deletion), featuring Role-Based Access Control (RBAC).

---

## 🏗️ Technical System Architecture

```
                                [ Citizen / CSC Operator ]
                                            │
                                            ▼
                              ┌──────────────────────────┐
                              │ React 18 + Vite Frontend │
                              └─────────────┬────────────┘
                                            │
                              ┌─────────────┴────────────┐
                              │  FastAPI Async Gateway   │
                              └─────────────┬────────────┘
                                            │
                              ┌─────────────┴────────────┐
                              │ LangGraph Intent Router  │
                              └─────────────┬────────────┘
                                            │
     ┌──────────┬──────────┬────────────────┼────────────────┬──────────┬──────────┐
     ▼          ▼          ▼                ▼                ▼          ▼          ▼
  Schemes    Health    Education       Agriculture       Employment   Legal    Emergency
   Agent      Agent      Agent            Agent            Agent      Agent      Agent
     │          │          │                │                │          │          │
     └──────────┴──────────┴────────────────┼────────────────┴──────────┴──────────┘
                                            │
                              ┌─────────────┴────────────┐
                              │   Response Aggregator    │
                              └─────────────┬────────────┘
                                            │
                              ┌─────────────┴────────────┐
                              │ Gemini 1.5 + Vector RAG  │
                              └──────────────────────────┘
```

---

## ⚖️ Evaluation Rubric Alignment

| Criteria | Weight | Implementation Details in JanMitra AI |
| :--- | :--- | :--- |
| **Technical Implementation** | **30%** | FastAPI async pipeline, Pydantic type safety, LangGraph StateGraph, Gemini Vision OCR, vector store RAG. |
| **AI Innovation & Impact** | **25%** | Solves ₹1.5L Cr unclaimed benefits gap; 7 domain agents; 22 Indian languages; Live "Janvi" voice co-pilot. |
| **User Experience & Design** | **15%** | Glassmorphic UI, Citizen Timeline, 1-Click Action Plan PDFs, Privacy & Security Centre modal. |
| **Feasibility & Scalability**| **15%** | Ephemeral task-bound document processing, DPDP 2023 alignment, RBAC model, zero persistent data bloat. |
| **Pitch & Demo** | **15%** | Complete pitch deck script, timestamped video walkthrough guide, and live interactive demo mode. |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Framer Motion, HTML5 Web Speech API, Tailwind & Vanilla CSS.
- **Backend API**: Python 3.10+, FastAPI, Uvicorn, Pydantic.
- **AI Frameworks**: LangChain, LangGraph StateGraph, Google Gemini 1.5 Flash Vision.
- **Knowledge Base & RAG**: FAISS / Chroma Vector Store loaded with official datasets (`schemes.json`, `education.json`).
- **Authentication & Security**: Supabase Auth (OAuth 2.0 / JWT), RBAC, Client-side Key Isolation.

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 2. Backend Setup
```bash
# Clone the repository
git clone https://github.com/Sanskruti/janmitra-ai.git
cd janmitra-ai

# Set up Python virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Create .env file from template
cp .env.example .env

# Run FastAPI backend server
python -m uvicorn backend.main:app --reload --port 8000
```
Backend API will be running at: `http://localhost:8000`

### 3. Frontend Setup
```bash
# In project root folder
npm install
npm run dev
```
Frontend Web App will be running at: `http://localhost:5173`

---

## 📁 Repository Structure

```
janmitra-ai/
├── backend/
│   ├── main.py                     # FastAPI entry point
│   ├── requirements.txt            # Python backend dependencies
│   └── app/
│       ├── api/                    # REST API endpoints (chat, assistant, documents)
│       ├── agents/                 # 7 Specialized AI Agents + Router + Aggregator
│       ├── rag/                    # RAG retriever & embeddings engine
│       ├── core/                   # Config, LLM initialization, prompts
│       └── models/                 # Pydantic state & request schemas
├── src/
│   ├── components/                 # Reusable UI & Privacy & Security Centre Modal
│   ├── features/                   # Digital Human Avatar "Janvi" & Voice Player
│   ├── pages/                      # DashboardPage, ChatPage, LandingPage, ArchitecturePage
│   ├── clients/                    # API clients (Supabase, Backend API)
│   └── App.jsx                     # Router & App context initialization
├── docs/                           # Architecture & Hackathon Demo Docs
│   └── HACKATHON_DEMO_PITCH.md     # Official 3-Minute Video Pitch Script
├── .env.example                    # Environment variable template
└── README.md                       # Project README
```

---

## 📜 License
Developed for **AI First Hackathon 2026** — IIT Jammu & Techible. MIT License.
