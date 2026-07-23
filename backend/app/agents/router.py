from backend.app.core.logging import logger

def route_query(message: str) -> list[str]:
    """
    Analyzes input query and returns list of activated agent names
    """
    logger.info(f"Routing query: {message}")
    msg = message.lower()
    agents = []

    if any(k in msg for k in ["scheme", "yojana", "kisan", "subsidy", "farmer"]):
        agents.append("Government Schemes")
        agents.append("Agriculture")
    if any(k in msg for k in ["scholarship", "college", "school", "education", "study"]):
        agents.append("Education")
    if any(k in msg for k in ["health", "hospital", "doctor", "fever", "medicine"]):
        agents.append("Healthcare")

    if not agents:
        agents = ["Government Schemes"]

    return list(set(agents))
