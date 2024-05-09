import json
from typing import List

import requests
from champions.champion_svc import add_champion_of_participant
from cred import api_key
from helpers import http_error_handler
from loguru import logger
from match.models.match_dto import MatchDto, ParticipantDto
from models import MatchMod, ParticipantMod
from services import init_services
from sqlalchemy.orm import sessionmaker
from user.user_svc import add_participant_to_personnages

conn = init_services()


def get_all_user_matches_id(summoner_puuid: str) -> List[str]:
    """Get & Return all matches id of a summoner."""
    try:
        logger.info("Getting all matches id...")
        x = requests.get(
            f"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{summoner_puuid}/ids?start=0&count=20&api_key={api_key}"
        )
        x.raise_for_status()
        logger.info("Get all matches id done...")
    except requests.HTTPError:
        logger.error(
            f"Data not found - No results found for player with riot this puuid {summoner_puuid}"
        )
        raise http_error_handler(
            f"Data not found - No results found for player with riot this puuid {summoner_puuid}"
        )
    return x.json()


def get_data_from_one_match(match_id: str) -> MatchDto:
    """Get & Return a match."""
    Session = sessionmaker(bind=conn)
    try:
        with Session.begin() as session:

            match_db = (
                session.query(MatchMod).filter(MatchMod.matchId == match_id).first()
            )

            if not match_db:
                logger.info(f"Adding the data from the match id {match_id}")

                y = requests.get(
                    f"https://europe.api.riotgames.com/lol/match/v5/matches/{match_id}?api_key={api_key}"
                )

                y.raise_for_status()

                match_db = MatchMod(
                    matchId=match_id,
                    dataVersion=y.json()["metadata"]["dataVersion"],
                    gameCreation=y.json()["info"]["gameCreation"],
                    gameDuration=y.json()["info"]["gameDuration"],
                    queueId=y.json()["info"]["queueId"],
                )

                session.add(match_db)

                participants_dto = []
                for participant in y.json()["info"]["participants"]:
                    logger.info(
                        f"Adding the participant {participant['summonerId']} from the match id {match_id}"
                    )
                    participant_name = participant["summonerName"]
                    if participant_name == "":
                        participant_name = requests.get(
                            f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/{participant['puuid']}?api_key={api_key}"
                        ).json()["gameName"]
                        participant["summonerName"] = participant_name

                    participant_dto = ParticipantDto(
                        **participant,
                        matchId=match_id,
                        summonerPuuid=participant["puuid"],
                    )

                    participants_dto.append(participant_dto)

                    participant_db = ParticipantMod(**participant_dto.model_dump())

                    session.add(participant_db)
                    logger.info(f"Participant added...")

                match_dto = MatchDto.model_validate(
                    {**match_db.__dict__, **{"participants": participants_dto}}
                )
                queueId = match_dto.queueId
                gameDuration = match_dto.gameDuration
                for participant in participants_dto:
                    if queueId == 420:
                        add_participant_to_personnages(
                            participant, queueId, gameDuration
                        )
                        add_champion_of_participant(participant)

                logger.info("Commiting...")
                session.commit()
                conn.commit()
                logger.info("Commit done.")
            else:
                logger.info("Already exists in database...")
                logger.info("Getting the participants in database...")
                participants = (
                    session.query(ParticipantMod)
                    .filter(ParticipantMod.matchId == match_id)
                    .all()
                )

                participants_dto = []
                for participant in participants:
                    logger.info(f"Getting participant {str(participant.summonerName)}")

                    participants_dto.append(
                        ParticipantDto.model_validate(participant.__dict__)
                    )

                logger.info("Getting the match...")

                match_dto = MatchDto.model_validate(
                    {**match_db.__dict__, **{"participants": participants_dto}}
                )
    except requests.HTTPError:
        logger.error(
            f"Data not found : The match id {match_id} requested doesn't exist."
        )
        raise http_error_handler(
            f"Data not found : The match id {match_id} requested doesn't exist."
        )
    return match_dto


def get_user_matches(summoner_puuid: str) -> List[MatchDto]:
    """Get & Return all matches of a summoner."""
    data = get_all_user_matches_id(summoner_puuid)
    matches = []
    for match_id in data:
        logger.info(f"Adding the data from the match id {match_id}")
        match = get_data_from_one_match(match_id)
        if match is not None:
            matches.append(match)

    return matches
