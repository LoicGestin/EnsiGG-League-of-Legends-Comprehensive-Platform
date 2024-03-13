from typing import List

from pydantic import BaseModel


class BanDto(BaseModel):
    championId: int
    pickTurn: int


class ObjectiveDto(BaseModel):
    first: bool
    kills: int


class ObjectivesDto(BaseModel):
    baron: ObjectiveDto
    champion: ObjectiveDto
    dragon: ObjectiveDto
    inhibitor: ObjectiveDto
    riftHerald: ObjectiveDto
    tower: ObjectiveDto


class TeamDto(BaseModel):
    bans: List[BanDto]
    objectives: ObjectivesDto
    teamId: int
    win: bool
