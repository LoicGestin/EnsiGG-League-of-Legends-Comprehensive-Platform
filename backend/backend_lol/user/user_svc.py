import json
from typing import List

import requests
from cred import api_key
from helpers import http_error_handler
from loguru import logger
from match.models.match_dto import ParticipantDto
from models import PersonnageMod, RanksMod, UserMod
from services import init_services
from sqlalchemy.orm import sessionmaker
from user.user_dto import PersonnageDto, RanksDto, UserDto

conn = init_services()


# Return the user and save in the database.
def get_and_save_user(summoner_name: str, tag: str) -> UserDto:
    """Get & Save the user in the db."""
    Session = sessionmaker(bind=conn)

    try:
        with Session.begin() as session:
            user_db = (
                session.query(UserMod)
                .filter(
                    UserMod.summonerName == summoner_name.lower(),
                    UserMod.summonerTag == tag.lower(),
                )
                .first()
            )

            if not user_db:
                logger.info(f'Requesting from LoL API the user "{summoner_name}#{tag}"')

                x = requests.get(
                    f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{summoner_name}/{tag}?api_key={api_key}"
                )
                x.raise_for_status()
                y = requests.get(
                    f"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{x.json()['puuid']}?api_key={api_key}"
                )
                logger.info("Request done.")

                user = UserDto(
                    summonerId=y.json()["id"],
                    summonerPuuid=y.json()["puuid"],
                    summonerName=summoner_name.lower(),
                    summonerTag=tag.lower(),
                    summonerLevel=y.json()["summonerLevel"],
                    summonerProfileIconId=y.json()["profileIconId"],
                )

                user_to_add = UserMod(**user.model_dump())
                logger.info("Adding user to db")

                session.add(user_to_add)
                session.commit()
                conn.commit()
                logger.info("Commit done..")
            else:
                logger.info(
                    f'The user "{summoner_name}#{tag}" already exist in db, requesting from db'
                )
                user = UserDto.model_validate(user_db.__dict__)
    except requests.HTTPError:
        logger.error(
            f"Data not found - No results found for player with riot id {summoner_name}#{tag}"
        )
        raise http_error_handler(
            f"Data not found - No results found for player with riot id {summoner_name}#{tag}"
        )
    return user


def get_and_save_user_by_puuid(summoner_puuid: str) -> UserDto:
    """Get & Save the user in the db by its puuid."""
    try:
        account_info = requests.get(
            f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/{summoner_puuid}?api_key={api_key}"
        )
        account_info.raise_for_status()
        user = get_and_save_user(
            account_info.json()["gameName"], account_info.json()["tagLine"]
        )
    except requests.HTTPError:
        logger.error(
            f"Data not found - No results found for player with riot this puuid {summoner_puuid}"
        )
        raise http_error_handler(
            f"Data not found - No results found for player with riot this puuid {summoner_puuid}"
        )
    return user


def get_and_save_user_ranks(summoner_puuid: str) -> List[RanksDto]:
    """Get & Save the user ranks in db."""
    Session = sessionmaker(bind=conn)

    try:
        with Session.begin() as session:
            account_info = requests.get(
                f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/{summoner_puuid}?api_key={api_key}"
            )
            account_info.raise_for_status()

            user = get_and_save_user(
                account_info.json()["gameName"], account_info.json()["tagLine"]
            )

            user_db = (
                session.query(RanksMod)
                .filter(RanksMod.summonerId == user.summonerId)
                .first()
            )
            if not user_db:
                logger.info("Requesting summoner's ranks...")
                x = requests.get(
                    f"https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/{user.summonerId}?api_key={api_key}"
                )
                logger.info("Request done...")

                init_ranks = {
                    "tier": "UNRANKED",
                    "rank": "0",
                    "leaguePoints": 0,
                    "wins": 0,
                    "losses": 0,
                }

                if len(x.json()) == 0:
                    solo_ranks = init_ranks

                    flex_ranks = init_ranks
                elif len(x.json()) == 1:
                    if x.json()["queueType" == "RANKED_SOLO_5x5"]:
                        solo_ranks = x.json()

                        flex_ranks = init_ranks
                    else:
                        solo_ranks = init_ranks
                        flex_ranks = x.json()
                else:
                    solo_ranks = (
                        x.json()[0]
                        if (x.json()[0]["queueType"] == "RANKED_SOLO_5x5")
                        else x.json()[1]
                    )

                    flex_ranks = (
                        x.json()[1]
                        if (x.json()[0]["queueType"] == "RANKED_SOLO_5x5")
                        else x.json()[0]
                    )

                solo_ranks = RanksDto.model_validate(
                    {
                        **dict(solo_ranks),
                        **{
                            "summonerId": user.summonerId,
                            "summonerName": user.summonerName,
                            "queueId": 420,
                        },
                    }
                )

                solo_ranks_to_add = RanksMod(**solo_ranks.model_dump())

                logger.info("Adding soloQ to db...")
                session.add(solo_ranks_to_add)

                flex_ranks = RanksDto.model_validate(
                    {
                        **dict(flex_ranks),
                        **{
                            "summonerId": user.summonerId,
                            "summonerName": user.summonerName,
                            "queueId": 440,
                        },
                    }
                )

                flex_ranks_to_add = RanksMod(**flex_ranks.model_dump())

                logger.info("Adding flex to db...")
                session.add(flex_ranks_to_add)

                session.commit()
                conn.commit()
                logger.info("Commit done..")
            else:
                logger.info("Already exist in db...")
                user_db_solo = (
                    session.query(RanksMod)
                    .filter(
                        (RanksMod.summonerId == user.summonerId),
                        (RanksMod.queueId == 420),
                    )
                    .first()
                )

                user_db_flex = (
                    session.query(RanksMod)
                    .filter(
                        (RanksMod.summonerId == user.summonerId),
                        (RanksMod.queueId == 440),
                    )
                    .first()
                )
                solo_ranks = RanksDto.model_validate(user_db_solo.__dict__)
                flex_ranks = RanksDto.model_validate(user_db_flex.__dict__)
    except requests.HTTPError:
        logger.error(
            f"Data not found - No results found for player with riot puuid {summoner_puuid}"
        )
        raise http_error_handler(
            f"Data not found - No results found for player with riot puuid {summoner_puuid}"
        )
    return [solo_ranks, flex_ranks]


def add_participant_to_personnages(
    participant: ParticipantDto, queueId: int, gameDuration: int
):
    Session = sessionmaker(bind=conn)
    with Session.begin() as session:
        personnage_db = (
            session.query(PersonnageMod)
            .filter(
                (PersonnageMod.summonerId == participant.summonerId)
                & (PersonnageMod.queueId == queueId)
                & (PersonnageMod.championName == participant.championName)
            )
            .first()
        )

        if not personnage_db:
            new_personnage = PersonnageMod(
                summonerId=participant.summonerId,
                queueId=queueId,
                championName=participant.championName,
                wins=int(participant.win),
                losses=1 - int(participant.win),
                kills=participant.kills,
                deaths=participant.deaths,
                assists=participant.assists,
                totalCreeps=participant.totalMinionsKilled,
                totalGameDuration=gameDuration,
            )
            session.add(new_personnage)
            session.commit()
            conn.commit()
        else:
            personnage_db.wins += int(participant.win)
            personnage_db.losses += 1 - int(participant.win)
            personnage_db.kills += participant.kills
            personnage_db.deaths += participant.deaths
            personnage_db.assists += participant.assists
            personnage_db.totalCreeps += participant.totalMinionsKilled
            personnage_db.totalGameDuration += gameDuration

            session.commit()
            conn.commit()


def get_user_personnages(summoner_id: str) -> List[PersonnageDto]:
    """Get user champions in db."""
    Session = sessionmaker(bind=conn)
    with Session.begin() as session:
        user_db = (
            session.query(PersonnageMod)
            .filter(PersonnageMod.summonerId == summoner_id)
            .all()
        )
        personnagesDto = [
            PersonnageDto.model_validate(user_db_i.__dict__) for user_db_i in user_db
        ]
        return personnagesDto
