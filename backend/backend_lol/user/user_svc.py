from typing import List

import requests
from cred import api_key
from loguru import logger
from models import RanksMod, UserMod
from services import init_services
from sqlalchemy.orm import sessionmaker
from user.user_dto import RanksDto, UserDto

conn = init_services()

def get_and_save_user(summoner_name: str, tag: str) -> UserDto:
    """Get & Save the user in the db."""
    Session = sessionmaker(bind=conn)
    session = Session()

    user_db = (
        session.query(UserMod).filter(UserMod.summonerName == summoner_name).first()
    )

    if not user_db:
        logger.info(f"Requesting from LoL API the user \"{summoner_name}#{tag}\"")
        
        x = requests.get(
            f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{summoner_name}/{tag}?api_key={api_key}"
        )

        y = requests.get(
            f"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{x.json()["puuid"]}?api_key={api_key}"
        )
        logger.info("Request done.")

        user = UserDto(
            summonerId=y.json()["id"],
            summonerPuuid=x.json()["puuid"],
            summonerName=summoner_name,
            summonerTag=tag,
        )

        user_to_add = UserMod(
            summonerId=y.json()["id"],
            summonerPuuid=x.json()["puuid"],
            summonerName=summoner_name,
            summonerTag=tag,
        )
        logger.info("Adding user to db")

        session.add(user_to_add)
        session.commit()
        conn.commit()
        logger.info("Commit done..")

    else:
        logger.info(f"The user \"{summoner_name}#{tag}\" already exist in db, requesting from db")
        user = UserDto(
            summonerId=str(user_db.summonerId),
            summonerPuuid=str(user_db.summonerPuuid),
            summonerName=summoner_name,
            summonerTag=tag,
        )

    return user

def get_and_save_user_ranks(summoner_name: str, tag: str) -> List[RanksDto]:
    """Get & Save the user ranks in db."""
    Session = sessionmaker(bind=conn)
    session = Session()
    user = get_and_save_user(summoner_name, tag)

    logger.info("Requesting summoner's ranks...")
    x = requests.get(f"https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/{user.summonerId}?api_key={api_key}")
    logger.info("Request done...")
    solo_ranks = x.json()[0]  if (x.json()[0]["queueType"] == "RANKED_SOLO_5x5") else x.json()[1]
    flex_ranks = x.json()[1]  if (x.json()[0]["queueType"] == "RANKED_SOLO_5x5") else x.json()[0]
    print(solo_ranks)

    solo_ranks_to_add = RanksMod(
        user=user.summonerId,
        queueType=solo_ranks["queueType"],
        wins=solo_ranks["wins"],
        losses=solo_ranks["losses"],
        tier=solo_ranks["tier"],
        rank=solo_ranks["rank"],
        leaguePoints=solo_ranks["leaguePoints"]
    )

    solo_ranks = RanksDto(
        summonerId = user.summonerId,
        queueType=solo_ranks["queueType"],
        wins=solo_ranks["wins"],
        losses=solo_ranks["losses"],
        tier=solo_ranks["tier"],
        rank=solo_ranks["rank"],
        leaguePoints=solo_ranks["leaguePoints"]
    )

    flex_ranks_to_add = RanksMod(
        user=user.summonerId,
        queueType=flex_ranks["queueType"],
        wins=flex_ranks["wins"],
        losses=flex_ranks["losses"],
        tier=flex_ranks["tier"],
        rank=flex_ranks["rank"],
        leaguePoints=flex_ranks["leaguePoints"]
    )

    flex_ranks = RanksDto(
        summonerId = user.summonerId,
        queueType=flex_ranks["queueType"],
        wins=flex_ranks["wins"],
        losses=flex_ranks["losses"],
        tier=flex_ranks["tier"],
        rank=flex_ranks["rank"],
        leaguePoints=flex_ranks["leaguePoints"]
    )

    logger.info("Adding soloQ and flexQ to db...")
    session.add(solo_ranks_to_add)
    session.add(flex_ranks_to_add)

    session.commit()
    conn.commit()
    return [solo_ranks, flex_ranks]
