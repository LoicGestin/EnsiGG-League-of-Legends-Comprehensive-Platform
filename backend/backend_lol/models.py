from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, declarative_base, mapped_column, relationship

Base = declarative_base()


class UserMod(Base):
    __tablename__ = "user"

    summonerId: Mapped[str] = mapped_column(primary_key=True, index=True)
    summonerPuuid: Mapped[str]
    summonerName: Mapped[str]
    summonerTag: Mapped[str]
    summonerLevel: Mapped[int]
    summonerProfileIconId: Mapped[int]

    ranks = relationship("RanksMod")


class RanksMod(Base):
    __tablename__ = "ranks"

    summonerId: Mapped[str] = mapped_column(
        ForeignKey("user.summonerId"), primary_key=True, index=True
    )
    summonerName: Mapped[str]
    queueId: Mapped[int] = mapped_column(primary_key=True)
    wins: Mapped[int]
    losses: Mapped[int]
    tier: Mapped[str]
    rank: Mapped[str]
    leaguePoints: Mapped[int]

    personnage = relationship(
        "PersonnageMod",
        primaryjoin="and_(RanksMod.summonerId==PersonnageMod.summonerId, RanksMod.queueId==PersonnageMod.queueId)",
    )


class PersonnageMod(Base):
    __tablename__ = "personnage"

    summonerId: Mapped[str] = mapped_column(
        ForeignKey("ranks.summonerId"), primary_key=True
    )
    queueId: Mapped[int] = mapped_column(ForeignKey("ranks.queueId"), primary_key=True)
    championName: Mapped[str] = mapped_column(primary_key=True, index=True)
    wins: Mapped[int]
    losses: Mapped[int]
    kills: Mapped[int]
    deaths: Mapped[int]
    assists: Mapped[int]
    totalCreeps: Mapped[int]
    totalGameDuration: Mapped[int]


class ChampionMod(Base):
    __tablename__ = "champion"

    championName: Mapped[str] = mapped_column(primary_key=True, index=True)
    wins: Mapped[int]
    losses: Mapped[int]
    ban: Mapped[int]
    pick: Mapped[int]


class ParticipantMod(Base):
    __tablename__ = "participant"

    summonerId: Mapped[str] = mapped_column(primary_key=True)
    matchId: Mapped[str] = mapped_column(ForeignKey("match.matchId"), primary_key=True)
    summonerPuuid: Mapped[str]
    riotIdTagline: Mapped[str]
    summonerLevel: Mapped[int]
    summonerName: Mapped[str]
    champLevel: Mapped[int]
    championName: Mapped[str]
    kills: Mapped[int]
    assists: Mapped[int]
    deaths: Mapped[int]
    item0: Mapped[int]
    item1: Mapped[int]
    item2: Mapped[int]
    item3: Mapped[int]
    item4: Mapped[int]
    item5: Mapped[int]
    item6: Mapped[int]
    # perks
    spell1Casts: Mapped[int]
    spell2Casts: Mapped[int]
    spell3Casts: Mapped[int]
    spell4Casts: Mapped[int]
    summoner1Id: Mapped[int]
    summoner2Id: Mapped[int]
    teamPosition: Mapped[str]
    totalMinionsKilled: Mapped[int]
    win: Mapped[bool]


class MatchMod(Base):
    __tablename__ = "match"

    matchId: Mapped[str] = mapped_column(primary_key=True)
    dataVersion: Mapped[str]
    gameCreation: Mapped[int]
    gameDuration: Mapped[int]
    queueId: Mapped[int]

    participants = relationship(ParticipantMod)
