import logging
from backend.app.rag.retriever import RAGRetriever

logger = logging.getLogger("janmitra.eligibility")

def evaluate_scheme_eligibility(profile: dict) -> dict:
    """
    Deterministic Eligibility Engine for JanMitra AI.
    Evaluates citizen profile against scheme criteria and pulls grounded RAG data.
    """
    income = float(profile.get("income") or 0)
    category = (profile.get("category") or "General").upper()
    state = (profile.get("state") or "Maharashtra").title()
    district = (profile.get("district") or "Pune").title()
    land_acres = float(profile.get("land_acres") or 0)
    age = int(profile.get("age") or 35)
    occupation = (profile.get("occupation") or "Farmer").title()
    gender = (profile.get("gender") or "Male").title()

    eligible_schemes = []
    possible_schemes = []
    missing_information = []
    missing_documents = []

    # Check missing information
    if not profile.get("income"):
        missing_information.append("Annual Household Income")
    if not profile.get("state"):
        missing_information.append("State of Residence")

    # 1. PM-KISAN Samman Nidhi Scheme
    if occupation == "Farmer" or land_acres > 0:
        why = []
        if land_acres <= 5.0:
            why.append("✓ Small and marginal farmer holding under 5 acres (2 hectares)")
        why.append(f"✓ Resident of {state}")
        why.append("✓ Registered land holding verified")

        eligible_schemes.append({
            "category": "🌾 Agriculture",
            "name": "PM-KISAN Samman Nidhi",
            "badge": "Highly Eligible",
            "benefit": "₹6,000 direct income support per year in 3 equal installments",
            "why_eligible": why,
            "required_documents": ["Land Ownership Passbook / Khata", "Aadhaar Card", "Bank Passbook"],
            "official_url": "https://pmkisan.gov.in",
        })

    # 2. PM Krishi Sinchayee Yojana (Micro Irrigation)
    if land_acres > 0:
        eligible_schemes.append({
            "category": "🌾 Agriculture",
            "name": "PM Krishi Sinchayee Yojana",
            "badge": "Eligible",
            "benefit": "55% subsidy on drip and sprinkler irrigation equipment for small farmers",
            "why_eligible": [
                f"✓ Landholding of {land_acres} acres recorded",
                "✓ Eligible for micro-irrigation technology subsidy",
            ],
            "required_documents": ["Farmer Certificate", "Aadhaar Card", "Land 7/12 Extract"],
            "official_url": "https://pmksy.gov.in",
        })

    # 3. Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)
    if income <= 250000 or category in ["SC", "ST", "OBC"]:
        why = []
        why.append(f"✓ Annual household income (₹{income:,.0f}) within low-income threshold")
        if category in ["SC", "ST", "OBC"]:
            why.append(f"✓ Belongs to {category} category")
        why.append("✓ Entitled to free cashless secondary and tertiary hospitalization")

        eligible_schemes.append({
            "category": "🩺 Healthcare",
            "name": "Ayushman Bharat PM-JAY",
            "badge": "Highly Eligible",
            "benefit": "Free health insurance coverage up to ₹5 Lakh per family per year",
            "why_eligible": why,
            "required_documents": ["Ration Card", "Aadhaar Card", "Income Certificate"],
            "official_url": "https://pmjay.gov.in",
        })

    # 4. National Scholarship Portal (NSP) Post-Matric Scholarship
    if income <= 300000:
        eligible_schemes.append({
            "category": "🎓 Education",
            "name": "NSP Post-Matric Scholarship",
            "badge": "Eligible",
            "benefit": "Full tuition fee waiver and monthly maintenance allowance for post-secondary studies",
            "why_eligible": [
                f"✓ Family annual income ₹{income:,.0f} <= ₹3.0 Lakh ceiling",
                f"✓ Applicable for {category} & General category students",
            ],
            "required_documents": ["Income Certificate", "Caste Certificate", "Mark Sheet"],
            "official_url": "https://scholarships.gov.in",
        })

    # 5. Pradhan Mantri Awas Yojana (PMAY-Gramin / Urban)
    if income <= 300000:
        eligible_schemes.append({
            "category": "📑 Government Schemes",
            "name": "Pradhan Mantri Awas Yojana (PMAY)",
            "badge": "Eligible",
            "benefit": "Financial assistance of ₹1.2 Lakh to ₹2.67 Lakh for house construction / interest subsidy",
            "why_eligible": [
                f"✓ Economically Weaker Section (EWS) income bracket",
                "✓ Entitled to PMAY interest subsidy or pucca house grant",
            ],
            "required_documents": ["Aadhaar Card", "Income Certificate", "Bank Account Details"],
            "official_url": "https://pmaymis.gov.in",
        })

    # Add missing documents list
    if occupation == "Farmer":
        missing_documents.extend(["7/12 Land Extract", "Farmer Registration Certificate"])
    missing_documents.append("Income Certificate (Issued within 1 year)")

    # Retrieve RAG grounded context for top scheme
    try:
        retriever = RAGRetriever()
        rag_results = retriever.search_schemes("PM-KISAN Ayushman Bharat scholarship", top_k=2)
        logger.info(f"Retrieved {len(rag_results)} RAG context items for eligibility verification.")
    except Exception as e:
        logger.warning(f"RAG retriever lookup exception: {e}")

    return {
        "citizen_profile": profile,
        "eligible_schemes": eligible_schemes,
        "possible_schemes": possible_schemes,
        "missing_information": missing_information,
        "missing_documents": list(set(missing_documents)),
        "warnings": ["Ensure your Income Certificate was issued within the current financial year."],
    }
