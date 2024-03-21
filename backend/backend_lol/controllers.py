from typing import List

from fastapi import FastAPI
from match.match_dto import MatchDto
from match.match_svc import (
    get_all_user_matches_id,
    get_data_from_one_match,
    get_user_matches,
)
from user.user_dto import RanksDto, UserDto
from user.user_svc import get_and_save_user, get_and_save_user_ranks

app = FastAPI()


@app.get("/summoner/{summoner_name}/{tag}")
def get_summoner(summoner_name: str, tag: str) -> UserDto:
    user = get_and_save_user(summoner_name, tag)
    return user


@app.get("/{summoner_name}/{tag}/league")
def get_summoner_league(summoner_name: str, tag: str) -> List[RanksDto]:
    user_ranks = get_and_save_user_ranks(summoner_name, tag)
    return [user_ranks[0], user_ranks[1]]


@app.get("/{summoner_puuid}/matches_id")
def get_user_matches_id(summoner_puuid: str) -> List[str]:
    matches = get_all_user_matches_id(summoner_puuid)
    return matches


@app.get("/match")
def get_one_match(match_id: str) -> MatchDto:
    match = get_data_from_one_match(match_id)
    return match


@app.get("/get_all_matches/")
def get_summoner_matches(summoner_puuid: str) -> List[MatchDto]:
    matches = get_user_matches(summoner_puuid)
    return matches
