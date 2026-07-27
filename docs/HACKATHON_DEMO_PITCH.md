# 🎥 JanMitra AI — Official 3-Minute Hackathon Demo Video Script & Pitch

> **AI First Hackathon 2026 (Summer School '26)**  
> **Organised by I3C - IIT Jammu × Techible**  
> **Project Name**: JanMitra AI 🇮🇳  
> **Track**: AI First Prototype & MVP Submission  

---

## ⏱️ Video Breakdown (Total Duration: 3 Minutes)

| Time | Segment | Visual Action | Speaker Script / Voiceover |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:30** | **1. The Problem & Vision** | Landing page (`/`), statistics on unclaimed scheme funds. | *"Every year in India, over ₹1.5 Lakh Crore in government scheme funds remain unclaimed simply because 1.4 billion citizens struggle with complex paperwork, language barriers, and fragmented portals. Welcome to JanMitra AI — India's Multi-Agent Citizen Co-Pilot."* |
| **0:30 - 1:15** | **2. Multi-Agent Orchestration & Voice** | Open `/chat`, select **Marathi/Hindi**, type or speak query: *"I am a small farmer from Maharashtra, what schemes can I get?"* | *"Watch JanMitra in action. When a citizen asks a question in their native language, our LangGraph Intent Router routes the query across 7 specialized AI agents — Government Schemes, Agriculture, Healthcare, and Education. Notice how JanMitra responds instantly with official sources, step-by-step action plans, and natural voice readout."* |
| **1:15 - 2:00** | **3. Vision AI Document OCR Verification** | Click **Verify Documents**, upload income/farmer certificate image. | *"Paperwork is the biggest hurdle. With our Vision AI Document Engine powered by Gemini 1.5, citizens simply upload a photo of their income or land certificate. JanMitra extracts key fields in seconds, checks scheme rules automatically, and outputs an instant eligibility verdict!"* |
| **2:00 - 2:30** | **4. Citizen Digital Portal & Timeline** | Open `/dashboard`, showcase **Citizen Journey Timeline** & PDF export. | *"On the Citizen Dashboard, users track their complete journey — from document verification to portal submission. In one click, citizens can download an official Action Plan PDF to present at local CSC kiosks."* |
| **2:30 - 3:00** | **5. Privacy, Security & Pitch Conclusion** | Open **`🛡️ Privacy & Security Centre`**, show RBAC and DPDP 2023 principles. | *"Built with privacy at its core, JanMitra AI implements task-bound ephemeral document processing, Role-Based Access Control, and DPDP 2023 alignment. JanMitra AI isn't just an assistant — it's citizen empowerment at scale. Thank you!"* |

---

## 🎯 Key Points to Highlight During Evaluation / Pitch

1. **Massive Problem Impact**: 1.4B population, ₹1.5L Cr unclaimed benefit funds, 22 official languages.
2. **Technical Superiority (30% Evaluation Weight)**: FastAPI async architecture, LangGraph multi-agent StateGraph, Gemini 1.5 Vision OCR, vector store RAG.
3. **User Centricity (15% Evaluation Weight)**: Digital human avatar "Janvi", native voice-to-voice interaction, glassmorphic UI, Action Plan PDF exports.
4. **Privacy Credibility (15% Evaluation Weight)**: Transparent DPDP 2023 alignment, RBAC model (`Citizen`, `Healthcare Worker`, `CSC Operator`, `Admin`), task-bound ephemeral file handling.

---

## ❓ Anticipated Judge Questions & Defenses (Q&A Prep)

### Q1: How does JanMitra prevent AI hallucinations on government rules?
> **Answer**: *"We enforce strict Retrieval-Augmented Generation (RAG) prioritized over general model memory. Our agent retrieval engine pulls facts directly from curated official datasets like MyScheme, PM-KISAN, and NSP. Furthermore, responses explicitly cite official sources and notify users that AI guidance serves as an assistant."*

### Q2: How do you handle document privacy for illiterate or rural citizens uploading Aadhaar/Income certificates?
> **Answer**: *"We adhere to task-bound ephemeral processing. Uploaded files are processed in-memory solely for the requested OCR task and are not permanently retained on disk. Furthermore, our Privacy & Security Centre gives citizens full control to wipe session memory or export their data at any time."*

### Q3: How scalable is the multi-agent architecture?
> **Answer**: *"Our FastAPI backend uses asynchronous request handling and LangGraph's event-driven state graphs. Adding a new domain agent (e.g. Pension or Housing) requires simply defining an isolated agent prompt and node without altering existing agents or frontend code."*
