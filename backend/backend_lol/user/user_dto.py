from pydantic import BaseModel


class UserDto(BaseModel):
    summonerPuuid: str
    summonerId: str
    summonerName: str
    summonerTag: str


class RanksDto(BaseModel):
    summonerId: str
    queueType: str
    wins: int
    losses: int
    tier: str
    rank: str
    leaguePoints: int
