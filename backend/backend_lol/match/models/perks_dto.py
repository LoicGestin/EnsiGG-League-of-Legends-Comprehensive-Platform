from typing import List

from pydantic import BaseModel


class PerkStatsDto(BaseModel):
    defense: int
    flex: int
    offense: int


class PerkStyleSelectionDto(BaseModel):
    perk: int
    var1: int
    var2: int
    var3: int


class PerkStyleDto(BaseModel):
    description: str
    selections: List[PerkStyleSelectionDto]
    style: int


class PerksDto(BaseModel):
    statPerks: PerkStatsDto
    styles: List[PerkStyleDto]
