from backend.app.agents.router import route_query

def test_route_query_schemes():
    agents = route_query("Which government scheme am I eligible for PM Kisan?")
    assert "Government Schemes" in agents
    assert "Agriculture" in agents

def test_route_query_education():
    agents = route_query("I need scholarship for my college education")
    assert "Education" in agents
