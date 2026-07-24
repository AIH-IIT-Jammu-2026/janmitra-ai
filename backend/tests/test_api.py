from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert "running" in response.json()["message"]

def test_chat_endpoint_full_stack_schema():
    payload = {
        "message": "My father is a farmer and I need scholarship for college",
        "session_id": "123",
        "language": "en"
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200

    data = response.json()
    # Verify frozen API schema contract
    assert "response" in data and isinstance(data["response"], str)
    assert "agents" in data and isinstance(data["agents"], list)
    assert "action_plan" in data and isinstance(data["action_plan"], list)
    assert "sources" in data and isinstance(data["sources"], list)

    # Verify agent presence
    assert len(data["agents"]) >= 1
