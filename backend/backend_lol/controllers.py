from typing import List

from champions.champion_svc import get_champion
from fastapi import FastAPI, HTTPException
from match.match_svc import (
    get_all_user_matches_id,
    get_data_from_one_match,
    get_user_matches,
)
from match.models.match_dto import MatchDto
from user.user_dto import ChampionDto, PersonnageDto, RanksDto, UserDto
from user.user_svc import (
    get_and_save_user,
    get_and_save_user_by_puuid,
    get_and_save_user_ranks,
    get_user_personnages,
)

app = FastAPI()

todos = {}


@app.get("/summoner/by-name/{summoner_name}/{tag}")
def get_summoner(summoner_name: str, tag: str) -> UserDto:
    user = get_and_save_user(summoner_name, tag)
    return user


@app.get("/summoner/by-puuid/{summoner_puuid}")
def get_summoner_by_puuid(summoner_puuid: str) -> UserDto:
    user = get_and_save_user_by_puuid(summoner_puuid)
    return user


@app.get("/league/{summoner_puuid}")
def get_summoner_league(summoner_puuid: str) -> List[RanksDto]:
    user_ranks = get_and_save_user_ranks(summoner_puuid)
    return user_ranks


@app.get("/{summoner_puuid}/matches_id")
def get_user_matches_id(summoner_puuid: str) -> List[str]:
    matches = get_all_user_matches_id(summoner_puuid)
    return matches


@app.get("/match")
def get_one_match(match_id: str) -> MatchDto | None:
    match = get_data_from_one_match(match_id)
    if match is None:
        return None
    return match


@app.get("/get_all_matches/")
def get_summoner_matches(summoner_puuid: str) -> List[MatchDto]:
    matches = get_user_matches(summoner_puuid)
    return matches


@app.get("/personnages/{summoner_id}")
def get_summoner_personnages(summoner_id: str) -> List[PersonnageDto]:
    personnages = get_user_personnages(summoner_id)
    return personnages


@app.get("/champion/{championName}")
def get_champion_infos(championName: str) -> ChampionDto:
    champion = get_champion(championName)
    return champion
