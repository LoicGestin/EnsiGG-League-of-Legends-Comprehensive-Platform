from pydantic import BaseModel


class UserDto(BaseModel):
    summonerId: str
    summonerPuuid: str
    summonerName: str
    summonerTag: str
    summonerLevel: int
    summonerProfileIconId: int


class RanksDto(BaseModel):
    summonerId: str 
    summonerName: str
    queueType: str
    tier: str
    rank: str
    leaguePoints: int
    wins: int
    losses: int
