from controllers import app, todos
from fastapi.testclient import TestClient

client = TestClient(app)


def setup_function():
    todos.clear()


def test_league():
    summoner_puuid = (
        "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA"
    )
    response = client.get(f"/league/{summoner_puuid}")
    assert response.status_code == 200
    assert response.json() == [
        {
            "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
            "summonerName": "Haruyukis",
            "queueId": 420,
            "tier": "DIAMOND",
            "rank": "I",
            "leaguePoints": 50,
            "wins": 68,
            "losses": 48,
        },
        {
            "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
            "summonerName": "Haruyukis",
            "queueId": 450,
            "tier": "DIAMOND",
            "rank": "II",
            "leaguePoints": 50,
            "wins": 33,
            "losses": 27,
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
