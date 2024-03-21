export function ChampionMasteryDto(data: any) {
  this.puuid = data.puuid;
  this.championPointsUntilNextLevel = data.championPointsUntilNextLevel;
  this.chestGranted = data.chestGranted;
  this.championId = data.championId;
  this.lastPlayTime = data.lastPlayTime;
  this.championLevel = data.championLevel;
  this.summonerId = data.summonerId;
  this.championPoints = data.championPoints;
  this.championPointsSinceLastLevel = data.championPointsSinceLastLevel;
  this.tokensEarned = data.tokensEarned;
}
