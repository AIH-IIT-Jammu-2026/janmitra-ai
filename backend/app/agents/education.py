def run_education_agent(message: str) -> dict:
    """
    Education Agent execution logic
    """
    return {
        "agent": "Education",
        "content": "National Scholarship Portal offers central sector scholarships for eligible students.",
        "action_items": [
          {"title": "Apply National Scholarship", "description": "Visit scholarships.gov.in and complete registration", "priority": "High"}
        ],
        "sources": [{"name": "National Scholarship Portal", "url": "https://scholarships.gov.in"}]
    }
