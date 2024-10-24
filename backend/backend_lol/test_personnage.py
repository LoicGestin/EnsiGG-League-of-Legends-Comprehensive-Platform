from controllers import app, todos
from fastapi.testclient import TestClient

client = TestClient(app)


def setup_function():
    todos.clear()


def test_personnage():
    summoner_id = "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY"

    response = client.get(f"/personnages/{summoner_id}")
    assert response.status_code == 200
    assert response.json() == [
        {
            "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
            "queueId": 420,
            "championName": "Jinx",
            "wins": 1,
            "losses": 3,
            "kills": 11,
            "deaths": 17,
            "assists": 10,
            "totalCreeps": 754,
            "totalGameDuration": 6608,
        },
        {
            "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
            "queueId": 420,
            "championName": "Kaisa",
            "wins": 1,
            "losses": 1,
            "kills": 15,
            "deaths": 12,
            "assists": 19,
            "totalCreeps": 402,
            "totalGameDuration": 3150,
        },
        {
            "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
            "queueId": 420,
            "championName": "Vayne",
            "wins": 2,
            "losses": 2,
            "kills": 15,
            "deaths": 16,
            "assists": 9,
            "totalCreeps": 516,
            "totalGameDuration": 4464,
        },
        {
            "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
            "queueId": 440,
            "championName": "Yasuo",
            "wins": 0,
            "losses": 1,
            "kills": 2,
            "deaths": 9,
            "assists": 7,
            "totalCreeps": 175,
            "totalGameDuration": 1538,
        },
    ]


def test_league_error():
    summoner_puuid = "sdfsdsfqdgdagadg"
    response = client.get(f"/league/{summoner_puuid}")
    assert response.status_code == 404
    assert response.json() == {
        "detail": {
            "status": {
                "status_code": 404,
                "message": "Data not found - No results found for player with riot puuid sdfsdsfqdgdagadg",
            }
        }
    }
