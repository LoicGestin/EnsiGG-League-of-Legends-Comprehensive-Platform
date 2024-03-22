export function LeagueEntryDTO(data: any) {
  this.summonerId = data.summonerId;
  this.summonerName = data.summonerName;
  this.queueType = data.queueType;
  this.tier = data.tier;
  this.rank = data.rank;
  this.leaguePoints = data.leaguePoints;
  this.wins = data.wins;
  this.losses = data.losses;
}
