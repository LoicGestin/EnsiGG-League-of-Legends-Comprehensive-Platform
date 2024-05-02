from typing import List

from cred import api_key
from loguru import logger
from match.models.match_dto import ParticipantDto
from models import ChampionMod, PersonnageMod, RanksMod, UserMod
from services import init_services
from sqlalchemy.orm import sessionmaker
from user.user_dto import ChampionDto, PersonnageDto, RanksDto, UserDto

conn = init_services()


def add_champion_of_participant(participant: ParticipantDto):
    Session = sessionmaker(bind=conn)
    with Session.begin() as session:
        champion_db = (
            session.query(ChampionMod)
            .filter(ChampionMod.championName == participant.championName)
            .first()
        )
        if not champion_db:
            new_champion = ChampionMod(
                championName=participant.championName,
                wins=int(participant.win),
                losses=1 - int(participant.win),
                ban=0,
                pick=1,
                description="filou",
            )
            session.add(new_champion)
            session.commit()
            conn.commit()
        else:
            champion_db.wins += int(participant.win)
            champion_db.losses += 1 - int(participant.win)
            champion_db.pick += 1
            session.commit()
            conn.commit()


def get_champion(championName: str) -> ChampionDto:
    """Get & Save Champion Stat in db."""
    Session = sessionmaker(bind=conn)
    with Session.begin() as session:
        existing_champion = (
            session.query(ChampionMod)
            .filter(ChampionMod.championName == championName)
            .first()
        )
    return existing_champion
