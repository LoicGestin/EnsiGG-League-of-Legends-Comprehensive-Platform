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
        session.query(UserMod).filter(UserMod.summonerName == summoner_name and UserMod.summonerTag == tag).first()
    )

    if not user_db:
        try:
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
                summonerPuuid=y.json()["puuid"],
                summonerName=summoner_name,
                summonerTag=tag,
                summonerLevel=y.json()["summonerLevel"],
                summonerProfileIconId=y.json()["profileIconId"]
            )

            user_to_add = UserMod(
                summonerId=y.json()["id"],
                summonerPuuid=y.json()["puuid"],
                summonerName=summoner_name,
                summonerTag=tag,
                summonerLevel=y.json()["summonerLevel"],
                summonerProfileIconId=y.json()["profileIconId"]
            )
            logger.info("Adding user to db")

            session.add(user_to_add)
            session.commit()
            conn.commit()
            logger.info("Commit done..")
        except Exception as e:
            print(e)
    else:
        logger.info(f"The user \"{summoner_name}#{tag}\" already exist in db, requesting from db")
        user = UserDto(
            summonerId=str(user_db.summonerId),
            summonerPuuid=str(user_db.summonerPuuid),
            summonerName=summoner_name,
            summonerTag=tag,
            summonerLevel=int(user_db.summonerLevel),
            summonerProfileIconId=int(user_db.summonerProfileIconId)
        )

    return user

def get_and_save_user_by_puuid(summoner_puuid: str) -> UserDto:
    """Get & Save the user in the db."""
    account_info = requests.get(f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/{summoner_puuid}?api_key={api_key}")
    user = get_and_save_user(account_info.json()["gameName"], account_info.json()["tagLine"])
    return user

def get_and_save_user_ranks(summoner_puuid: str) -> List[RanksDto]:
    """Get & Save the user ranks in db."""
    Session = sessionmaker(bind=conn)
    session = Session()
    account_info = requests.get(f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/{summoner_puuid}?api_key={api_key}")
    user = get_and_save_user(account_info.json()["gameName"], account_info.json()["tagLine"])
    user_db = (
        session.query(RanksMod).filter(RanksMod.summonerId == user.summonerId).first()
    )
    if (not user_db):
        logger.info("Requesting summoner's ranks...")
        x = requests.get(f"https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/{user.summonerId}?api_key={api_key}")
        logger.info("Request done...")
        solo_ranks = x.json()[0]  if (x.json()[0]["queueType"] == "RANKED_SOLO_5x5") else x.json()[1]
        flex_ranks = x.json()[1]  if (x.json()[0]["queueType"] == "RANKED_SOLO_5x5") else x.json()[0]

        solo_ranks_to_add = RanksMod(
            summonerId=user.summonerId,
            summonerName = user.summonerName,
            queueType=solo_ranks["queueType"],
            wins=solo_ranks["wins"],
            losses=solo_ranks["losses"],
            tier=solo_ranks["tier"],
            rank=solo_ranks["rank"],
            leaguePoints=solo_ranks["leaguePoints"]
        )

        solo_ranks = RanksDto(
            summonerId = user.summonerId,
            summonerName = user.summonerName,
            queueType=solo_ranks["queueType"],
            wins=solo_ranks["wins"],
            losses=solo_ranks["losses"],
            tier=solo_ranks["tier"],
            rank=solo_ranks["rank"],
            leaguePoints=solo_ranks["leaguePoints"]
        )

        flex_ranks_to_add = RanksMod(
            summonerId=user.summonerId,
            summonerName= user.summonerName,
            queueType=flex_ranks["queueType"],
            wins=flex_ranks["wins"],
            losses=flex_ranks["losses"],
            tier=flex_ranks["tier"],
            rank=flex_ranks["rank"],
            leaguePoints=flex_ranks["leaguePoints"]
        )

        flex_ranks = RanksDto(
            summonerId = user.summonerId,
            summonerName= user.summonerName,
            queueType=flex_ranks["queueType"],
            wins=flex_ranks["wins"],
            losses=flex_ranks["losses"],
            tier=flex_ranks["tier"],
            rank=flex_ranks["rank"],
            leaguePoints=flex_ranks["leaguePoints"]
        )
    
        user_db_solo = (
            session.query(RanksMod).filter(RanksMod.queueType == "RANKED_SOLO_5x5" and RanksMod.summonerId == user.summonerId).first()
        )
        if (not user_db_solo):
            logger.info("Adding soloQ to db...")
            session.add(solo_ranks_to_add)

        user_db_flex = (
            session.query(RanksMod).filter(RanksMod.queueType == "RANKED_FLEX_SR" and RanksMod.summonerId == user.summonerId).first()
        )
        if (not user_db_flex):
            logger.info("Adding flex to db...")
            session.add(flex_ranks_to_add)

        session.commit()
        conn.commit()
        logger.info("Commit done..")
    else:
        logger.info("Already exist in db...")
        user_db_solo = (
            session.query(RanksMod).filter(RanksMod.queueType == "RANKED_SOLO_5x5" and RanksMod.summonerId == user.summonerId).first()
        )

        user_db_flex = (
            session.query(RanksMod).filter(RanksMod.queueType == "RANKED_FLEX_SR" and RanksMod.summonerId == user.summonerId ).first()
        )

        solo_ranks = RanksDto(
            summonerId=str(user_db_solo.summonerId),
            summonerName=str(user_db_solo.summonerName),
            queueType=str(user_db_solo.queueType),
            tier=str(user_db_solo.tier),
            rank=str(user_db_solo.rank),
            leaguePoints=int(user_db_solo.leaguePoints),
            wins=int(user_db_solo.wins),
            losses=int(user_db_solo.losses)
        )

        flex_ranks = RanksDto(
            summonerId=str(user_db_flex.summonerId),
            summonerName=str(user_db_flex.summonerName),
            queueType=str(user_db_flex.queueType),
            tier=str(user_db_flex.tier),
            rank=str(user_db_flex.rank),
            leaguePoints=int(user_db_flex.leaguePoints),
            wins=int(user_db_flex.wins),
            losses=int(user_db_flex.losses)
        )

    return [solo_ranks, flex_ranks]
