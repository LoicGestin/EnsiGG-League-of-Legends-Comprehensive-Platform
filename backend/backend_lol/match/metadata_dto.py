from typing import List

from pydantic import BaseModel


class MetadataDto(BaseModel):
    dataVersion: str
    matchId: str
    participants: List[str]
