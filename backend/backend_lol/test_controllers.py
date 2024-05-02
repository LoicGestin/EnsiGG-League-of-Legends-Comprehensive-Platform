from controllers import app, todos
from fastapi.testclient import TestClient

client = TestClient(app)

def setup_function():
    todos.clear();

def test_summoner_by_name():
    summoner_name = "Haruyukis"
    tag = "EUW"
    response = client.get(f"/summoner/by-name/{summoner_name}/{tag}")
    assert response.status_code == 200
    assert response.json() == {
  "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
  "summonerPuuid": "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA",
  "summonerName": "Haruyukis",
  "summonerTag": "EUW",
  "summonerLevel": 377,
  "summonerProfileIconId": 4660
}

def test_summoner_by_puuid():
    puuid = "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA"
    response = client.get(f"/summoner/by-puuid/{puuid}")
    assert response.status_code == 200
    assert response.json() == {
                                "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
                                "summonerPuuid": "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA",
                                "summonerName": "Haruyukis",
                                "summonerTag": "EUW",
                                "summonerLevel": 377,
                                "summonerProfileIconId": 4660
                              }
    
def test_league():
    puuid = "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA"
    response = client.get(f"/league/{puuid}")
    assert response.status_code == 200
    assert response.json() == [
  {
    "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
    "summonerName": "Haruyukis",
    "queueType": "RANKED_SOLO_5x5",
    "tier": "MASTER",
    "rank": "I",
    "leaguePoints": 305,
    "wins": 68,
    "losses": 48
  },
  {
    "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
    "summonerName": "Haruyukis",
    "queueType": "RANKED_FLEX_SR",
    "tier": "DIAMOND",
    "rank": "I",
    "leaguePoints": 62,
    "wins": 33,
    "losses": 27
  }
]

def test_matches_id():
    puuid = "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA"
    response = client.get(f"/{puuid}/matches_id")
    assert response.status_code == 200
    assert response.json() == [
  "EUW1_6885901436",
  "EUW1_6885130495",
  "EUW1_6882372065",
  "EUW1_6882369675",
  "EUW1_6882343663",
  "EUW1_6882328723",
  "EUW1_6881101274",
  "EUW1_6881056435",
  "EUW1_6881026880",
  "EUW1_6880967680",
  "EUW1_6880848984",
  "EUW1_6880834181",
  "EUW1_6880478063",
  "EUW1_6880431131",
  "EUW1_6879026041",
  "EUW1_6878790908",
  "EUW1_6878748480",
  "EUW1_6878683631",
  "EUW1_6878485734",
  "EUW1_6878327068"
]

def test_one_match():
    match_id = "EUW1_6885130495"
    response = client.get(f"/match?match_id={match_id}")
    assert response.status_code == 200
    assert response.json() == {
  "metadata": {
    "dataVersion": "2",
    "matchId": "EUW1_6885130495",
    "participants": [
      "iTbJpLrsm3ESMCthtpZ08J5JrrwhoFFlB084Qiz88qc8GRiGjeJam6WKPQkqfXCQr4UHu8j9gdMokA",
      "E7uJpa45dfL-ptstjbXSigyGuK0uNJ70dBWYCKvcpWkjbtH5eHhjRcnxs40nHhW484CkIj4raQ4acg",
      "aaRfygNTP7Jtw_GNTBpl2h7dDhcGP74feX3elb73Rcs5zd-80CBk8rLwk4AyPI29oAByfjbJ78geoA",
      "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA",
      "9PU36sOaOl_5taiMAzvmxKSY5HAa3NpoCEgPUcWJQ0lf2JfbXaRGUGCwA0SQ_q6HJoQQ2WB-ukRwMw",
      "JTpe1a3GKk74CKU9SdiMBEWp_WT2ud1yOkY21jXP74jtMDw107A9cb2sD-Ldf3ArQhJAcktNIRxt3A",
      "IsNwOJ0TUFzuEwCimVpvJZsJfi4Srilzao1QIfdIOlpN2jM-CZtfPpK2j9ZE-_6VEo1jMdXMhvEvKg",
      "cm3TSQBxx7fpugDNn5R3PhzwNtHl24XDFl57J2MIsu7GaE9johsBB3PuDEZ_0TpG--MeqlHzI9KFFg",
      "7Xie4ez0NYUDyAXFNjOb2xGrRu8doKWF_hszZNFOTqnHazQi_F_XcoLiy_QwLq981jiyMOSsRJJm_Q",
      "vK1fFSi7-jK-O2yRm_ogaKCCJ7JG-hwAPRK0-VzhHcktPUXt_tBMpDJFL3tfLIZVnbrBAP90ZtI_EQ"
    ]
  },
  "info": {
    "gameCreation": 1712212995638,
    "gameDuration": 906,
    "participants": [
      {
        "summonerId": "qb0tO0y8av3qeoO_Om79rKcxcumozFG07EK0VXdjPNYqXO12",
        "assists": 2,
        "champLevel": 14,
        "championName": "Yorick",
        "deaths": 3,
        "item0": 6698,
        "item1": 3047,
        "item2": 6690,
        "item3": 6694,
        "item4": 3134,
        "item5": 0,
        "item6": 3340,
        "kills": 9,
        "participantId": 1,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8010,
                  "var1": 26,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 9111,
                  "var1": 717,
                  "var2": 220,
                  "var3": 0
                },
                {
                  "perk": 9103,
                  "var1": 10,
                  "var2": 20,
                  "var3": 0
                },
                {
                  "perk": 8299,
                  "var1": 518,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8473,
                  "var1": 342,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8446,
                  "var1": 1808,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8400
            }
          ]
        },
        "puuid": "iTbJpLrsm3ESMCthtpZ08J5JrrwhoFFlB084Qiz88qc8GRiGjeJam6WKPQkqfXCQr4UHu8j9gdMokA",
        "riotIdTagline": "2056",
        "spell1Casts": 87,
        "spell2Casts": 17,
        "spell3Casts": 42,
        "spell4Casts": 7,
        "summoner1Id": 4,
        "summoner2Id": 12,
        "summonerLevel": 365,
        "summonerName": "ww YY swz",
        "teamPosition": "TOP",
        "timePlayed": 906,
        "totalMinionsKilled": 69,
        "win": True
      },
      {
        "summonerId": "JzjWgg6VKTY2C7l6FGQlhbQAinggCCprqSSU8N4qBjHjBloQ2nibJ7EnRg",
        "assists": 5,
        "champLevel": 13,
        "championName": "Yorick",
        "deaths": 1,
        "item0": 3077,
        "item1": 1037,
        "item2": 1054,
        "item3": 3075,
        "item4": 1029,
        "item5": 3047,
        "item6": 3340,
        "kills": 1,
        "participantId": 2,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8437,
                  "var1": 260,
                  "var2": 143,
                  "var3": 0
                },
                {
                  "perk": 8446,
                  "var1": 2339,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8473,
                  "var1": 247,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8451,
                  "var1": 163,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8400
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 9103,
                  "var1": 14,
                  "var2": 30,
                  "var3": 0
                },
                {
                  "perk": 8009,
                  "var1": 1197,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            }
          ]
        },
        "puuid": "E7uJpa45dfL-ptstjbXSigyGuK0uNJ70dBWYCKvcpWkjbtH5eHhjRcnxs40nHhW484CkIj4raQ4acg",
        "riotIdTagline": "0000",
        "spell1Casts": 67,
        "spell2Casts": 19,
        "spell3Casts": 43,
        "spell4Casts": 6,
        "summoner1Id": 6,
        "summoner2Id": 12,
        "summonerLevel": 34,
        "summonerName": "",
        "teamPosition": "JUNGLE",
        "timePlayed": 906,
        "totalMinionsKilled": 38,
        "win": True
      },
      {
        "summonerId": "yv0TVzzHD0tYLj2MUH0fp2olrbRnpcd-4NQ6DMeG5ifVpMU",
        "assists": 6,
        "champLevel": 13,
        "championName": "Yorick",
        "deaths": 4,
        "item0": 1054,
        "item1": 6698,
        "item2": 3047,
        "item3": 6694,
        "item4": 0,
        "item5": 0,
        "item6": 3340,
        "kills": 2,
        "participantId": 3,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8010,
                  "var1": 49,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 9111,
                  "var1": 474,
                  "var2": 160,
                  "var3": 0
                },
                {
                  "perk": 9103,
                  "var1": 0,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8299,
                  "var1": 231,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8446,
                  "var1": 1160,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8473,
                  "var1": 298,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8400
            }
          ]
        },
        "puuid": "aaRfygNTP7Jtw_GNTBpl2h7dDhcGP74feX3elb73Rcs5zd-80CBk8rLwk4AyPI29oAByfjbJ78geoA",
        "riotIdTagline": "EUW",
        "spell1Casts": 44,
        "spell2Casts": 15,
        "spell3Casts": 35,
        "spell4Casts": 6,
        "summoner1Id": 12,
        "summoner2Id": 4,
        "summonerLevel": 563,
        "summonerName": "Sigma ShadowMan",
        "teamPosition": "UTILITY",
        "timePlayed": 906,
        "totalMinionsKilled": 49,
        "win": True
      },
      {
        "summonerId": "NGlurILZEiRx0MSuWmaQOX1ESvkdsuNGOFyTPoAROWhILpY",
        "assists": 2,
        "champLevel": 13,
        "championName": "Yorick",
        "deaths": 3,
        "item0": 1055,
        "item1": 6692,
        "item2": 6698,
        "item3": 3009,
        "item4": 6690,
        "item5": 3134,
        "item6": 3340,
        "kills": 5,
        "participantId": 4,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8010,
                  "var1": 10,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 9111,
                  "var1": 477,
                  "var2": 140,
                  "var3": 0
                },
                {
                  "perk": 9103,
                  "var1": 0,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8299,
                  "var1": 183,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8473,
                  "var1": 255,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8446,
                  "var1": 1834,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8400
            }
          ]
        },
        "puuid": "HZjiCzLo8bFNuecnPFK1Jskchhq_h-q7xhFCfsmp1NA6FGK3kEeAyiKUbj0VAYHD97l6z5tz_ZU5OA",
        "riotIdTagline": "EUW",
        "spell1Casts": 62,
        "spell2Casts": 16,
        "spell3Casts": 31,
        "spell4Casts": 5,
        "summoner1Id": 4,
        "summoner2Id": 12,
        "summonerLevel": 377,
        "summonerName": "Haruyukis",
        "teamPosition": "BOTTOM",
        "timePlayed": 906,
        "totalMinionsKilled": 53,
        "win": True
      },
      {
        "summonerId": "YrucGV_kquwjxXG3QOLhFZbLeti8rlLuYPguWcnGUUiNIFA",
        "assists": 1,
        "champLevel": 16,
        "championName": "Yorick",
        "deaths": 2,
        "item0": 3047,
        "item1": 6694,
        "item2": 6698,
        "item3": 6701,
        "item4": 1055,
        "item5": 3134,
        "item6": 3340,
        "kills": 8,
        "participantId": 5,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8010,
                  "var1": 226,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 9111,
                  "var1": 618,
                  "var2": 180,
                  "var3": 0
                },
                {
                  "perk": 9103,
                  "var1": 0,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8299,
                  "var1": 168,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8446,
                  "var1": 1939,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8473,
                  "var1": 398,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8400
            }
          ]
        },
        "puuid": "9PU36sOaOl_5taiMAzvmxKSY5HAa3NpoCEgPUcWJQ0lf2JfbXaRGUGCwA0SQ_q6HJoQQ2WB-ukRwMw",
        "riotIdTagline": "IVY",
        "spell1Casts": 81,
        "spell2Casts": 16,
        "spell3Casts": 35,
        "spell4Casts": 2,
        "summoner1Id": 6,
        "summoner2Id": 4,
        "summonerLevel": 109,
        "summonerName": "Fluffiest",
        "teamPosition": "MIDDLE",
        "timePlayed": 906,
        "totalMinionsKilled": 107,
        "win": True
      },
      {
        "summonerId": "rgtsAlhWsv6nzxjdF5rkKnPVhjstK2VCrx5Gvzsk5tA1ciw",
        "assists": 7,
        "champLevel": 15,
        "championName": "Jinx",
        "deaths": 2,
        "item0": 1055,
        "item1": 6672,
        "item2": 3086,
        "item3": 3006,
        "item4": 0,
        "item5": 0,
        "item6": 3340,
        "kills": 2,
        "participantId": 6,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8008,
                  "var1": 56,
                  "var2": 9,
                  "var3": 0
                },
                {
                  "perk": 8009,
                  "var1": 1071,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 9103,
                  "var1": 0,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8014,
                  "var1": 190,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8233,
                  "var1": 8,
                  "var2": 40,
                  "var3": 0
                },
                {
                  "perk": 8236,
                  "var1": 4,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8200
            }
          ]
        },
        "puuid": "JTpe1a3GKk74CKU9SdiMBEWp_WT2ud1yOkY21jXP74jtMDw107A9cb2sD-Ldf3ArQhJAcktNIRxt3A",
        "riotIdTagline": "0605",
        "spell1Casts": 82,
        "spell2Casts": 24,
        "spell3Casts": 12,
        "spell4Casts": 5,
        "summoner1Id": 4,
        "summoner2Id": 6,
        "summonerLevel": 1071,
        "summonerName": "Cricri",
        "teamPosition": "UTILITY",
        "timePlayed": 906,
        "totalMinionsKilled": 44,
        "win": False
      },
      {
        "summonerId": "pJC99R19_sowyRDKxf2diG47Yo6AH1hEImxJ8-O95GJFsRo",
        "assists": 4,
        "champLevel": 15,
        "championName": "Jinx",
        "deaths": 6,
        "item0": 3031,
        "item1": 3035,
        "item2": 1018,
        "item3": 3085,
        "item4": 6672,
        "item5": 3006,
        "item6": 3340,
        "kills": 5,
        "participantId": 7,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8008,
                  "var1": 33,
                  "var2": 6,
                  "var3": 0
                },
                {
                  "perk": 8009,
                  "var1": 1329,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 9103,
                  "var1": 0,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8014,
                  "var1": 318,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8233,
                  "var1": 5,
                  "var2": 30,
                  "var3": 0
                },
                {
                  "perk": 8236,
                  "var1": 4,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8200
            }
          ]
        },
        "puuid": "IsNwOJ0TUFzuEwCimVpvJZsJfi4Srilzao1QIfdIOlpN2jM-CZtfPpK2j9ZE-_6VEo1jMdXMhvEvKg",
        "riotIdTagline": "1234",
        "spell1Casts": 66,
        "spell2Casts": 27,
        "spell3Casts": 9,
        "spell4Casts": 7,
        "summoner1Id": 6,
        "summoner2Id": 4,
        "summonerLevel": 1163,
        "summonerName": "Traxite",
        "teamPosition": "BOTTOM",
        "timePlayed": 906,
        "totalMinionsKilled": 135,
        "win": False
      },
      {
        "summonerId": "Fa-CYGRHZhbzxmG4DmYN_ff0pRrCVrEapkX9m5zkWvZjf1yBuiEWg75BZg",
        "assists": 0,
        "champLevel": 14,
        "championName": "Jinx",
        "deaths": 4,
        "item0": 3006,
        "item1": 6672,
        "item2": 3085,
        "item3": 1018,
        "item4": 0,
        "item5": 0,
        "item6": 3340,
        "kills": 1,
        "participantId": 8,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8021,
                  "var1": 977,
                  "var2": 664,
                  "var3": 0
                },
                {
                  "perk": 8009,
                  "var1": 293,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 9103,
                  "var1": 0,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8014,
                  "var1": 42,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8233,
                  "var1": 6,
                  "var2": 10,
                  "var3": 0
                },
                {
                  "perk": 8236,
                  "var1": 4,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8200
            }
          ]
        },
        "puuid": "cm3TSQBxx7fpugDNn5R3PhzwNtHl24XDFl57J2MIsu7GaE9johsBB3PuDEZ_0TpG--MeqlHzI9KFFg",
        "riotIdTagline": "EUW",
        "spell1Casts": 32,
        "spell2Casts": 12,
        "spell3Casts": 10,
        "spell4Casts": 1,
        "summoner1Id": 6,
        "summoner2Id": 4,
        "summonerLevel": 113,
        "summonerName": "Øzijs",
        "teamPosition": "MIDDLE",
        "timePlayed": 906,
        "totalMinionsKilled": 84,
        "win": False
      },
      {
        "summonerId": "gFVP_VE-XmcfWQe6IzWsarM0vYW9VYuJClNGwe3O0FIeqJI",
        "assists": 3,
        "champLevel": 14,
        "championName": "Jinx",
        "deaths": 3,
        "item0": 3006,
        "item1": 6672,
        "item2": 3153,
        "item3": 3036,
        "item4": 0,
        "item5": 0,
        "item6": 3340,
        "kills": 5,
        "participantId": 9,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8008,
                  "var1": 59,
                  "var2": 10,
                  "var3": 0
                },
                {
                  "perk": 9111,
                  "var1": 384,
                  "var2": 160,
                  "var3": 0
                },
                {
                  "perk": 9104,
                  "var1": 13,
                  "var2": 20,
                  "var3": 0
                },
                {
                  "perk": 8014,
                  "var1": 373,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8126,
                  "var1": 319,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8135,
                  "var1": 450,
                  "var2": 5,
                  "var3": 0
                }
              ],
              "style": 8100
            }
          ]
        },
        "puuid": "7Xie4ez0NYUDyAXFNjOb2xGrRu8doKWF_hszZNFOTqnHazQi_F_XcoLiy_QwLq981jiyMOSsRJJm_Q",
        "riotIdTagline": "EUW",
        "spell1Casts": 34,
        "spell2Casts": 20,
        "spell3Casts": 10,
        "spell4Casts": 3,
        "summoner1Id": 4,
        "summoner2Id": 6,
        "summonerLevel": 517,
        "summonerName": "luckyvenixi",
        "teamPosition": "TOP",
        "timePlayed": 906,
        "totalMinionsKilled": 86,
        "win": False
      },
      {
        "summonerId": "HYErsF6fhweL6MHeZJACFjD9f-gEPEnSIi-ftcm4fhW2XID0",
        "assists": 4,
        "champLevel": 12,
        "championName": "Jinx",
        "deaths": 10,
        "item0": 6672,
        "item1": 3006,
        "item2": 1043,
        "item3": 1042,
        "item4": 0,
        "item5": 0,
        "item6": 3340,
        "kills": 0,
        "participantId": 10,
        "perks": {
          "statPerks": {
            "defense": 5001,
            "flex": 5008,
            "offense": 5005
          },
          "styles": [
            {
              "description": "primaryStyle",
              "selections": [
                {
                  "perk": 8008,
                  "var1": 67,
                  "var2": 6,
                  "var3": 0
                },
                {
                  "perk": 8009,
                  "var1": 503,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 9103,
                  "var1": 0,
                  "var2": 0,
                  "var3": 0
                },
                {
                  "perk": 8014,
                  "var1": 166,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8000
            },
            {
              "description": "subStyle",
              "selections": [
                {
                  "perk": 8233,
                  "var1": 6,
                  "var2": 20,
                  "var3": 0
                },
                {
                  "perk": 8236,
                  "var1": 4,
                  "var2": 0,
                  "var3": 0
                }
              ],
              "style": 8200
            }
          ]
        },
        "puuid": "vK1fFSi7-jK-O2yRm_ogaKCCJ7JG-hwAPRK0-VzhHcktPUXt_tBMpDJFL3tfLIZVnbrBAP90ZtI_EQ",
        "riotIdTagline": "3320",
        "spell1Casts": 30,
        "spell2Casts": 24,
        "spell3Casts": 12,
        "spell4Casts": 5,
        "summoner1Id": 6,
        "summoner2Id": 4,
        "summonerLevel": 145,
        "summonerName": "Nie wiem kurde",
        "teamPosition": "JUNGLE",
        "timePlayed": 906,
        "totalMinionsKilled": 44,
        "win": False
      }
    ],
    "queueId": 1020,
    "teams": [
      {
        "bans": [
          {
            "championId": 33,
            "pickTurn": 1
          },
          {
            "championId": 72,
            "pickTurn": 2
          },
          {
            "championId": 67,
            "pickTurn": 3
          },
          {
            "championId": 235,
            "pickTurn": 4
          },
          {
            "championId": -1,
            "pickTurn": 5
          }
        ],
        "teamId": 100,
        "win": True
      },
      {
        "bans": [
          {
            "championId": 80,
            "pickTurn": 6
          },
          {
            "championId": 32,
            "pickTurn": 7
          },
          {
            "championId": 875,
            "pickTurn": 8
          },
          {
            "championId": 234,
            "pickTurn": 9
          },
          {
            "championId": 164,
            "pickTurn": 10
          }
        ],
        "teamId": 200,
        "win": False
      }
    ]
  }
}