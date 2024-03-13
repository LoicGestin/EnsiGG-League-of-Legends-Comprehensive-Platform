from typing import List

from match.info_dto import InfoDto
from match.metadata_dto import MetadataDto
from pydantic import BaseModel


class MatchDto(BaseModel):
    metadata: MetadataDto
    info: InfoDto
