from controllers import app, todos
from fastapi.testclient import TestClient

client = TestClient(app)


def setup_function():
    todos.clear()


def test_summoner_by_name():
    summoner_name = "Haruyukis"
    tag = "EUW"
    response = client.get(f"/summoner/by-name/{summoner_name}/{tag}")
    assert response.status_code == 200
    assert response.json() == {
        "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
        "summonerPuuid": "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA",
        "summonerName": "haruyukis",
        "summonerTag": "euw",
        "summonerLevel": 377,
        "summonerProfileIconId": 4660,
    }


def test_summoner_by_name_error():
    summoner_name = "FLSMFLSDDGM"
    tag = "FMDSLG"
    response = client.get(f"/summoner/by-name/{summoner_name}/{tag}")
    assert response.status_code == 404
    assert response.json() == {
        "detail": {
            "status": {
                "status_code": 404,
                "message": "Data not found - No results found for player with riot id FLSMFLSDDGM#FMDSLG",
            }
        }
    }


def test_summoner_by_puuid():
    puuid = (
        "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA"
    )
    response = client.get(f"/summoner/by-puuid/{puuid}")
    assert response.status_code == 200
    assert response.json() == {
        "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
        "summonerPuuid": "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA",
        "summonerName": "haruyukis",
        "summonerTag": "euw",
        "summonerLevel": 377,
        "summonerProfileIconId": 4660,
    }


def test_summoner_by_puuid_error():
    puuid = "FSFSGDGDGDGQGDQGDQG"
    response = client.get(f"/summoner/by-puuid/{puuid}")
    assert response.status_code == 404
    assert response.json() == {
        "detail": {
            "status": {
                "status_code": 404,
                "message": "Data not found - No results found for player with riot this puuid FSFSGDGDGDGQGDQGDQG",
            }
        }
    }
