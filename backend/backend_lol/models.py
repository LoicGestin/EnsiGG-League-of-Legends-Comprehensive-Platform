from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class UserMod(Base):
    __tablename__ = "user"

    summonerId = Column(String, primary_key=True, index=True)
    summonerPuuid = Column(String)
    summonerName = Column(String)
    summonerTag = Column(String)
    summonerLevel = Column(Integer)
    summonerProfileIconId = Column(Integer)

    ranks = relationship("RanksMod")


class RanksMod(Base):
    __tablename__ = "ranks"

    summonerId = Column(String, ForeignKey("user.summonerId"), primary_key=True, index=True)
    summonerName = Column(String)
    queueType = Column(String, primary_key=True)
    wins = Column(Integer)
    losses = Column(Integer)
    tier = Column(String)
    rank = Column(String)
    leaguePoints = Column(Integer)

    personnage = relationship(
        "PersonnageMod",
        primaryjoin="and_(RanksMod.summonerId==PersonnageMod.summonerId, RanksMod.queueType==PersonnageMod.queueType)",
    )


class PersonnageMod(Base):
    __tablename__ = "personnage"

    summonerId = Column(String, ForeignKey("ranks.summonerId"), primary_key=True)
    queueType = Column(String, ForeignKey("ranks.queueType"), primary_key=True)
    name = Column(String, primary_key=True, index=True)
    wins = Column(Integer)
    losses = Column(Integer)
    kill = Column(Integer)
    death = Column(Integer)
    assist = Column(Integer)
    creep = Column(Integer)
