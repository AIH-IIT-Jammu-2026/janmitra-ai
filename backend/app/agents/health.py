def run_health_agent(message: str) -> dict:
    """
    Healthcare Agent execution logic
    """
    return {
        "agent": "Healthcare",
        "content": "Ayushman Bharat PM-JAY provides health coverage up to ₹5 lakh per family per year for secondary and tertiary care.",
        "action_items": [
          {"title": "Check ABHA Card Eligibility", "description": "Generate ABHA health ID on pmjay.gov.in", "priority": "Medium"}
        ],
        "sources": [{"name": "PM-JAY Official Portal", "url": "https://pmjay.gov.in"}]
    }
