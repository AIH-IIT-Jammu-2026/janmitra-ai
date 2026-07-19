// Mock AI response data for all agents
export const MOCK_RESPONSES = {
  farmer: {
    agents: ['Government Scheme Agent', 'Agriculture Agent'],
    badges: [
      { label: 'Government Agent', type: 'blue' },
      { label: 'Agriculture Agent', type: 'green' },
      { label: 'Verified Information', type: 'purple' },
    ],
    content: `**Based on your profile as a farmer from Maharashtra, you may be eligible for:**

---

### 🌾 PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)
Direct income support of **₹6,000/year** in 3 equal installments to all land-holding farmer families.

### 🌦️ PM Fasal Bima Yojana
Crop insurance scheme providing financial support to farmers suffering crop loss/damage due to unforeseen events.

### 🧪 Soil Health Card Scheme
Free soil health cards to farmers with crop-wise recommendations of nutrients & fertilizers required.

### 💧 Pradhan Mantri Krishi Sinchayee Yojana
Water conservation and irrigation scheme with subsidy up to **55% for small farmers**.

---

**Required Documents:**
✓ Aadhaar Card
✓ Bank Passbook (linked to Aadhaar)
✓ Land Records / 7/12 Extract
✓ Caste Certificate (if applicable)

**Next Steps:**
Apply through your nearest **Common Service Centre (CSC)** or **Agriculture Office**. You can also visit [pmkisan.gov.in](https://pmkisan.gov.in) to apply online.`,
  },

  healthcare: {
    agents: ['Healthcare Agent'],
    badges: [
      { label: 'Healthcare Agent', type: 'green' },
      { label: 'Verified Medical Info', type: 'blue' },
      { label: 'Emergency Protocols', type: 'orange' },
    ],
    content: `**Healthcare Guidance for your symptoms (Fever + Headache):**

---

### 🌡️ Immediate Suggestions
- **Rest** and stay hydrated (drink 8-10 glasses of water)
- Take **Paracetamol 500mg** every 6 hours if fever > 101°F
- Avoid self-medicating with antibiotics
- Monitor temperature every 4 hours

### 🏥 Nearby Government Hospitals
1. **Civil Hospital, Pune** — 2.3 km | Emergency: 020-26123391
2. **Sassoon General Hospital** — 4.1 km | Available 24/7
3. **YCM Hospital, Pimpri** — 6.8 km | OPD: 8 AM - 2 PM

### 💊 Ayushman Bharat Eligibility
Based on your profile, you **may be eligible** for free treatment under Ayushman Bharat – PM-JAY (up to ₹5 lakh/year).

**ABHA Card Benefits:**
✓ Cashless treatment at 25,000+ hospitals
✓ Covers hospitalization, surgery, ICU

### ⚠️ Health Disclaimer
*This is general guidance only. Please consult a qualified doctor. If fever exceeds 103°F or you experience severe headache, vomiting, or stiff neck — visit emergency immediately.*`,
  },

  resume: {
    agents: ['Employment Agent'],
    badges: [
      { label: 'Employment Agent', type: 'blue' },
      { label: 'AI Analysis', type: 'purple' },
      { label: 'Job Matching', type: 'green' },
    ],
    content: `**Resume Analysis Complete** 📊

---

### 📈 Resume Score: **72 / 100**

| Category | Score |
|---|---|
| Content Quality | 75% |
| ATS Compatibility | 68% |
| Keywords | 70% |
| Format & Design | 80% |

### ✅ Strengths
- Clear work experience timeline
- Quantified achievements in 2 roles
- Good technical skills section

### ⚠️ Areas to Improve
- **Missing Summary/Objective** — Add a 2-3 line professional summary
- **Weak Action Verbs** — Replace "did" with "achieved", "led", "delivered"
- **No LinkedIn / GitHub URL** — Add professional profile links
- **Generic Skills** — Be specific: "Python (Django, FastAPI)" vs just "Python"

### 🎯 Suggested Skills to Add
- Cloud: AWS / GCP basics
- DevOps: Docker, CI/CD pipelines
- Data: SQL, Pandas

### 💼 Recommended Government Jobs
1. **UPSC CSE** — Apply before June 2025
2. **SSC CGL** — Tier 1 Exam: August 2025
3. **IBPS PO** — Notification expected September 2025

Apply through **NCS Portal** (nationalcareerservice.gov.in) for 1.5 crore+ job listings.`,
  },

  education: {
    agents: ['Education Agent'],
    badges: [
      { label: 'Education Agent', type: 'blue' },
      { label: 'Scholarship Match', type: 'purple' },
      { label: 'Career Guidance', type: 'green' },
    ],
    content: `**Education & Scholarship Guidance** 🎓

---

### 📚 Scholarships You May Qualify For

**1. National Scholarship Portal Schemes**
- Central Sector Scheme of Scholarships: ₹10,000-₹20,000/year
- Post Matric Scholarship (SC/ST/OBC)
- Merit-cum-Means Scholarship

**2. State Scholarships (Maharashtra)**
- Rajarshi Chhatrapati Shahu Maharaj Shishyavrutti Yojana
- Dr. Panjabrao Deshmukh Vasatigruha Anudan Yojana

---

### 🎯 Career Roadmap (Based on your profile)

**For B.Tech Computer Science graduates:**

\`\`\`
Year 1 → MERN/MEAN Stack Developer
Year 2 → Full-Stack + DevOps
Year 3 → Senior Developer / Tech Lead
Year 5 → Architect / CTO Track
\`\`\`

### 🏫 Top College Recommendations
- **IIT Bombay** — M.Tech CS (GATE Score required)
- **NIT Pune** — MBA Tech
- **COEP Pune** — PG Diploma in AI/ML

Apply via **scholarships.gov.in** with your mark sheets and income certificate.`,
  },

  legal: {
    agents: ['Legal Assistance Agent'],
    badges: [
      { label: 'Legal Agent', type: 'orange' },
      { label: 'Rights Information', type: 'blue' },
      { label: 'Verified Guidance', type: 'green' },
    ],
    content: `**Legal Assistance & Rights Guidance** ⚖️

---

### 👤 Your Consumer Rights
Under the **Consumer Protection Act 2019**, you have the right to:
- **Protection** from hazardous goods/services
- **Information** about quality, quantity, and price
- **Redressal** against unfair trade practices
- **Education** on consumer rights

### 📋 How to File a Complaint

**Step 1:** Try to resolve with the seller/service provider first.
**Step 2:** If unresolved, file at **consumerhelpline.gov.in** (National Consumer Helpline: 1800-11-4000)
**Step 3:** File complaint at District Consumer Forum (for claims < ₹1 crore)

### 🚨 Filing an FIR
If you need to file an FIR:
1. Visit your nearest Police Station
2. Carry **Aadhaar + proof of incident**
3. FIR must be registered free of cost (if police refuses — contact SP office)
4. Get **Zero FIR** if the crime didn't occur in that jurisdiction

**Online FIR:** Available on your state police website

### ⚠️ Legal Disclaimer
*This is general legal information only, not legal advice. For specific legal issues, please consult a qualified advocate.*`,
  },

  emergency: {
    agents: ['Emergency Agent'],
    badges: [
      { label: '🚨 EMERGENCY MODE', type: 'orange' },
      { label: 'First Aid Active', type: 'green' },
      { label: 'SOS Ready', type: 'blue' },
    ],
    content: `## 🚨 EMERGENCY RESPONSE ACTIVATED

---

### ☎️ Emergency Contacts
| Service | Number |
|---|---|
| Police | **100** |
| Ambulance | **108** |
| Fire Brigade | **101** |
| Women Helpline | **1091** |
| Disaster Management | **1078** |
| National Emergency | **112** |

---

### 🏥 Nearest Hospitals (from your location)
1. **Civil Hospital** — 1.2 km | 24/7 Emergency
2. **Ruby Hall Clinic** — 2.8 km | Trauma Center
3. **KEM Hospital** — 3.4 km | Govt Hospital

---

### 🩹 Immediate First Aid (Road Accident)
1. **Do NOT move** the injured person unless in danger
2. Call **108** immediately and describe location
3. Check for **breathing** — perform CPR if trained
4. Control **bleeding** with clean cloth, apply firm pressure
5. Keep the person **warm** and **calm**
6. Do NOT give food or water to unconscious person

### 📱 SOS Message Generated:
*"EMERGENCY: I need immediate assistance. My current location has been shared. Please send help immediately. — JanMitra AI Emergency System"*`,
  },

  agriculture: {
    agents: ['Agriculture Agent'],
    badges: [
      { label: 'Agriculture Agent', type: 'green' },
      { label: 'Crop Analysis', type: 'blue' },
      { label: 'Weather Data', type: 'purple' },
    ],
    content: `**Agriculture Intelligence Report** 🌾

---

### 🌡️ Current Weather (Maharashtra)
- **Temperature:** 28°C | **Humidity:** 72%
- **Rainfall Forecast:** 45mm expected this week
- **Advisory:** Ideal for Kharif sowing

### 🌱 Crop Disease Detection
Upload a photo of your crop to detect diseases instantly. Common threats this season:

| Disease | Affected Crop | Treatment |
|---|---|---|
| Leaf Blight | Wheat | Mancozeb spray |
| Yellow Mosaic | Soybean | Neem oil spray |
| Stem Rust | Paddy | Propiconazole 25% |

### 💰 Today's Mandi Prices
| Crop | Price/Quintal | Market |
|---|---|---|
| Wheat | ₹2,125 | Pune APMC |
| Soybean | ₹4,780 | Latur |
| Cotton | ₹6,450 | Amravati |
| Onion | ₹1,280 | Nashik |

### 🧪 Fertilizer Recommendation
Based on typical Maharashtra soil profile:
- **Nitrogen (N):** 120 kg/hectare
- **Phosphorus (P):** 60 kg/hectare  
- **Potassium (K):** 40 kg/hectare

Apply **Soil Health Card Scheme** for free soil testing at nearest KVK.`,
  },
}

export const SUGGESTED_PROMPTS = [
  { label: '🌾 Farmer schemes', query: 'I am a farmer from Maharashtra. Which government schemes am I eligible for?' },
  { label: '🩺 Health guidance', query: 'I have fever and headache. What should I do?' },
  { label: '💼 Review resume', query: 'Please review my resume and suggest improvements.' },
  { label: '🎓 Scholarships', query: 'I am a student looking for scholarships. What are my options?' },
  { label: '⚖️ Legal help', query: 'I want to know about consumer rights and how to file a complaint.' },
  { label: '🚨 Emergency', query: 'Accident. Need immediate help.' },
  { label: '🌾 Crop prices', query: 'What are today\'s mandi prices for wheat and soybean in Maharashtra?' },
  { label: '🏛️ PM KISAN', query: 'How do I apply for PM-KISAN and what documents do I need?' },
]

export function detectIntent(query) {
  const q = query.toLowerCase()
  if (q.includes('accident') || q.includes('emergency') || q.includes('help') || q.includes('sos')) return 'emergency'
  if (q.includes('farmer') || q.includes('agriculture') || q.includes('crop') || q.includes('mandi') || q.includes('fertilizer')) return 'farmer'
  if (q.includes('fever') || q.includes('sick') || q.includes('hospital') || q.includes('medicine') || q.includes('headache') || q.includes('pain')) return 'healthcare'
  if (q.includes('resume') || q.includes('job') || q.includes('employment') || q.includes('career') || q.includes('interview')) return 'resume'
  if (q.includes('scholarship') || q.includes('education') || q.includes('college') || q.includes('student') || q.includes('study')) return 'education'
  if (q.includes('legal') || q.includes('fir') || q.includes('complaint') || q.includes('rights') || q.includes('law') || q.includes('court')) return 'legal'
  if (q.includes('kisan') || q.includes('scheme') || q.includes('government') || q.includes('yojana') || q.includes('pm ')) return 'farmer'
  return 'farmer' // default fallback
}
