# 🏆 JanMitra AI — Hackathon Demo Scenarios & Script

## Overview
This document outlines the **4 high-impact demo scenarios** designed for hackathon judges to showcase JanMitra AI's **Multi-Agent RAG Architecture**, **Multilingual Capability**, and **Instant Action Plan Generation**.

---

## 🎭 Scenario 1: The Multi-Intent Farmer (Agriculture + Education)
**User Persona:** Ramesh Patel, a small farmer from Gujarat earning ₹1.8L/year with a daughter entering 11th grade.

### 💬 Input Prompt:
> *"I am a small farmer in Gujarat. I need financial support for my wheat crop insurance and a scholarship for my daughter studying in Class 11."*

### 🤖 Multi-Agent Execution Flow:
1. **Router Agent:** Detects dual intent → Activates `["Agriculture", "Education"]`.
2. **Agriculture Agent (RAG):** Retrieves **PM-KISAN** (₹6,000/yr) and **PMFBY** (Crop Insurance - Rabi 1.5% premium).
3. **Education Agent (RAG):** Retrieves **NSP Post-Matric Scholarship** for Class 11 (full tuition + allowance).
4. **Aggregator Agent:** Deduplicates action items, prioritizes application steps (`High`), and returns official portal links (`pmkisan.gov.in`, `scholarships.gov.in`).

---

## 🎭 Scenario 2: Emergency Healthcare & Free Medicine (Healthcare)
**User Persona:** Sunita Devi, looking for affordable healthcare & medicines for her family.

### 💬 Input Prompt:
> *"My mother needs heart treatment and expensive monthly medicines. Are there free government hospitals or cheaper medicine stores near me?"*

### 🤖 Multi-Agent Execution Flow:
1. **Router Agent:** Activates `["Healthcare"]`.
2. **Healthcare Agent (RAG):** Retrieves **Ayushman Bharat PM-JAY** (₹5 Lakh cashless coverage) and **Jan Aushadhi Kendras** (50-90% cheaper generic medicines).
3. **Emergency Safeguard:** Automatically appends **108 (Ambulance)** & **104 (Health Helpline)**.

---

## 🎭 Scenario 3: Multilingual Query in Hindi / Marathi
**User Persona:** Farmer / Citizen using native Indian language.

### 💬 Input Prompt (Hindi / Haryanvi):
> *"मुझे खेत की सिंचाई के लिए सोलर पंप लगाना है, सरकार से कितनी सब्सिडी मिलेगी?"*

### 🤖 Multi-Agent Execution Flow:
1. **Router Agent:** Identifies language + intent → Activates `["Agriculture"]`.
2. **Agriculture Agent (RAG):** Matches **PM-KUSUM Solar Pump Scheme** (up to 60% central/state subsidy).
3. **Response:** Responds natively in Hindi with exact step-by-step CSC application instructions.

---

## 🎭 Scenario 4: Housing & Street Vendor Financial Inclusion (Government Schemes)
**User Persona:** Raju, a street vendor in urban Jaipur needing business credit and home assistance.

### 💬 Input Prompt:
> *"I sell vegetables on a cart. I want a loan to grow my business and apply for a permanent house under government scheme."*

### 🤖 Multi-Agent Execution Flow:
1. **Router Agent:** Activates `["Government Schemes"]`.
2. **Government Schemes Agent (RAG):** Matches **PM SVANidhi** (collateral-free ₹10K-₹50K loan at 7% interest) and **PMAY-Urban** (Housing for All subsidy).
