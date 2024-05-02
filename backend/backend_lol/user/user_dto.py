from pydantic import BaseModel, ConfigDict


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
    queueId: int
    tier: str
    rank: str
    leaguePoints: int
    wins: int
    losses: int


class PersonnageDto(BaseModel):
    summonerId: str
    queueId: int
    championName: str
    wins: int
    losses: int
    kills: int
    deaths: int
    assists: int
    creeps: int


class ChampionDto(BaseModel):
    championName: str
    wins: int
    losses: int
    ban: int
    pick: int
    description: str
