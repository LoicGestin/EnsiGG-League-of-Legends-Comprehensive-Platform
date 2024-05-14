from pydantic import BaseModel

class ChampionDto(BaseModel):
    championName: str
    wins: int
    losses: int
    ban: int
    pick: int
