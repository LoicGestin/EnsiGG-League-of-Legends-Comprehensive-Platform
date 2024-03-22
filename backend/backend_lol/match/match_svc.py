from typing import List

import requests
from cred import api_key
from loguru import logger
from match.match_dto import MatchDto
from services import init_services

conn = init_services()


def get_all_user_matches_id(summoner_puuid: str) -> List[str]:
    """Get & Return all matches id of a summoner."""
    logger.info("Getting all matches id...")
    x = requests.get(
        f"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{summoner_puuid}/ids?start=0&count=20&api_key={api_key}"
    )
    logger.info("Get all matches id done...")
    return x.json()


def get_data_from_one_match(match_id: str) -> MatchDto:
    """Get & Return a match."""
    logger.info(f"Adding the data from the match id {match_id}")
    y = requests.get(
        f"https://europe.api.riotgames.com/lol/match/v5/matches/{match_id}?api_key={api_key}"
    )
    for participant in y.json()["info"]["participants"]:
        try:
            del participant["challenges"]
        except:
            pass
        try:
            del participant["missions"]
        except:
            pass
    match = MatchDto(metadata=y.json()["metadata"], info=y.json()["info"])

    return match


def get_user_matches(summoner_puuid: str) -> List[MatchDto]:
    """Get & Return all matches of a summoner."""
    data = get_all_user_matches_id(summoner_puuid)
    matches = []
    for match_id in data:
        logger.info(f"Adding the data from the match id {match_id}")
        match = get_data_from_one_match(match_id)
        matches.append(match)
    
    return matches
