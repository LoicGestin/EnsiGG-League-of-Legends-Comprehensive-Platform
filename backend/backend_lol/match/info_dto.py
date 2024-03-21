from typing import List

from match.participant_dto import ParticipantDto
from match.teams_dto import TeamDto
from pydantic import BaseModel


class InfoDto(BaseModel):
    gameCreation: int
    gameDuration: int
    gameEndTimestamp: int
    gameId: int
    gameMode: str
    gameName: str
    gameStartTimestamp: int
    gameType: str
    gameVersion: str
    mapId: int
    participants: List[ParticipantDto]
    platformId: str
    queueId: int
    teams: List[TeamDto]
    tournamentCode: str
