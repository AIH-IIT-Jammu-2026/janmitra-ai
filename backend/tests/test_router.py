from backend.app.agents.router import route_query, fallback_route_query

def test_single_intent_schemes():
    agents = route_query("Which government scheme am I eligible for PM Kisan?")
    assert "Government Schemes" in agents
    assert "Agriculture" in agents

def test_single_intent_education():
    agents = route_query("I need a scholarship for my college education")
    assert "Education" in agents

def test_single_intent_health():
    agents = route_query("I have fever and headache, which hospital should I visit?")
    assert "Healthcare" in agents

def test_multi_intent():
    agents = route_query("My father is a farmer and I am looking for a college scholarship")
    assert "Agriculture" in agents
    assert "Education" in agents

def test_multilingual_hindi_marathi():
    # Hindi query for farmer scheme
    agents_hi = fallback_route_query("kisan ke liye fasal bima aur yojana bataye")
    assert "Agriculture" in agents_hi or "Government Schemes" in agents_hi

    # Marathi query for health / hospital
    agents_mr = fallback_route_query("mala bimar ahe, hospital ilaj pahije")
    assert "Healthcare" in agents_mr

    # Hinglish query for scholarship
    agents_hinglish = fallback_route_query("mujhe padhai ke liye chhatravritti chahiye")
    assert "Education" in agents_hinglish

def test_ambiguous_fallback():
    agents = route_query("hello how are you")
    assert len(agents) >= 1
    assert "Government Schemes" in agents
