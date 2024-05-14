from controllers import app, todos
from fastapi.testclient import TestClient

client = TestClient(app)


def setup_function():
    todos.clear()


def test_champions():
    champion_name = "Vayne"

    response = client.get(f"/champion/{champion_name}")
    assert response.status_code == 200
    assert response.json() == {
        "championName": "Vayne",
        "wins": 13,
        "losses": 8,
        "ban": 0,
        "pick": 21,
    }
