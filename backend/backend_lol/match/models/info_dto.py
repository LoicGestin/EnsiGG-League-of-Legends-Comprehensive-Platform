from typing import List

from match.models.match_dto import ParticipantDto
from match.models.teams_dto import TeamDto
from pydantic import BaseModel


class InfoDto(BaseModel):
    gameCreation: int
    gameDuration: int
    participants: List[ParticipantDto]
    queueId: int
    teams: List[TeamDto]
