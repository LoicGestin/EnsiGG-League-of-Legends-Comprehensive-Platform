from typing import List

from pydantic import BaseModel


class BanDto(BaseModel):
    championId: int
    pickTurn: int


class TeamDto(BaseModel):
    bans: List[BanDto]
    teamId: int
    win: bool
