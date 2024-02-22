export function LeagueEntryDTO(data) {
    this.leagueId = data.leagueId;
    this.summonerId = data.summonerId;
    this.summonerName = data.summonerName;
    this.queueType = data.queueType;
    this.tier = data.tier;
    this.rank = data.rank;
    this.leaguePoints = data.leaguePoints;
    this.wins = data.wins;
    this.losses = data.losses;
    this.hotStreak = data.hotStreak;
    this.veteran = data.veteran;
    this.freshBlood = data.freshBlood;
    this.inactive = data.inactive;
    this.miniSeries = data.miniSeries;
}