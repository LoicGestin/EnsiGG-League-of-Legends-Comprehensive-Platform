from typing import List

from pydantic import BaseModel


class ParticipantDto(BaseModel):
    summonerId: str
    matchId: str
    summonerPuuid: str
    riotIdTagline: str
    summonerLevel: int
    summonerName: str
    champLevel: int
    championName: str
    kills: int
    assists: int
    deaths: int
    item0: int
    item1: int
    item2: int
    item3: int
    item4: int
    item5: int
    item6: int
    # perks
    spell1Casts: int
    spell2Casts: int
    spell3Casts: int
    spell4Casts: int
    summoner1Id: int
    summoner2Id: int
    teamPosition: str
    totalMinionsKilled: int
    win: bool


class MatchDto(BaseModel):
    matchId: str
    dataVersion: str
    gameCreation: int
    gameDuration: int
    queueId: int
    participants: List[ParticipantDto]
