from champions.champion_dto import ChampionDto
from match.models.match_dto import ParticipantDto
from models import ChampionMod
from services import init_services
from sqlalchemy.orm import sessionmaker

conn = init_services()


def add_champion_of_participant(participant: ParticipantDto):
    """Save in the database champion."""
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
    """Get Champion Stat in db."""
    Session = sessionmaker(bind=conn)
    with Session.begin() as session:
        existing_champion = (
            session.query(ChampionMod)
            .filter(ChampionMod.championName == championName)
            .first()
        )

        championDto = ChampionDto.model_validate(existing_champion.__dict__)

    return championDto
