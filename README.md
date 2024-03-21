# Projet de Spécialité - LOL

Introducing Ensi.GG, your all-in-one platform for champions builds, tier lists, and more, our vision is to provide you with everything you need through a beautifully designed, enjoyable, and easily accessible platform.

Accessible at - https://ensi.gg

For contributing, please install [VSCode](https://code.visualstudio.com/download) and the extension Git Graph.

## Design

Please install [Figma](https://www.figma.com/).

For accessing the project please ask a lead permissions.

## Others

For editing images, please install [Paint.net](https://www.getpaint.net/download.html).

Optional VSCode extensions:

- Material Icon Theme
- One Dark Pro

## Use case

```plantuml
left to right direction
actor "User" as us
actor "Game Creator" as gc
rectangle Ensi.gg {
  usecase "Ecrire un message dans le chat de la partie" as UC1 #pink;line:red;text:black
  usecase "Spéctateur de la partie" as UC2 #pink;line:red;text:black
  usecase "Afficher détail du jeu" as UC3 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'un personnage" as UC4 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'une partie" as UC5 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'un joueur" as UC6 #Yellowgreen;line:green;text:black
  usecase "Intéragir dans la partie" as UC7 #pink;line:red;text:black
  usecase "Lancer une partie" as UC8 #pink;line:red;text:black
  usecase "Créer une partie" as UC9 #pink;line:red;text:black
}
us --> UC1
us --> UC2
us --> UC3
us --> UC4
us --> UC5
us --> UC6
gc --> UC7
gc --> UC8
gc --> UC9

us <|-- gc
```
## API Riot Games
Pour ce projet, nous utiliserons l'API de Riot games https://developer.riotgames.com/apis, voici un diagramme représentant les différents appels d'API que nous effectuerons

```plantuml
left to right direction
rectangle "Ensi.gg API" {
  usecase "Afficher détail du jeu" as UC3 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'un personnage" as UC4 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'une partie" as UC5 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'un joueur" as UC6 #Yellowgreen;line:green;text:black

  usecase "GET Summoner" as UC7
  usecase "GET League" as UC8
  usecase "GET Matches ID" as UC9
  usecase "GET Matches Infos" as UC10
  usecase "Get Mastery" as UC11
  usecase "Get Maches General Info" as UC12
  usecase "Champion General Info" as UC13
 

}
UC6 -> UC7
UC6 -> UC8
UC6 -> UC9
UC6 -> UC10
UC6 -> UC11
UC5 -> UC12
UC4 -> UC13
UC3 -- UC6
```

Détail des appels : 


GET Summoner : /lol/summoner/v4/summoners/by-name/{summonerName}   Get a summoner by summoner name.

Return :  SummonerDTO

SummonerDTO : 

accountId	string	Encrypted account ID. Max length 56 characters.
profileIconId	int	ID of the summoner icon associated with the summoner.
revisionDate	long	Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: summoner name change, summoner level change, or profile icon change.
name	string	Summoner name.
id	string	Encrypted summoner ID. Max length 63 characters.
puuid	string	Encrypted PUUID. Exact length of 78 characters.
summonerLevel	long	Summoner level associated with the summoner.


GET League : /lol/league/v4/entries/by-summoner/{encryptedSummonerId} Get league entries in all queues for a given summoner ID 

Return  : Set[LeagueEntryDTO]

LeagueEntryDTO : 

leagueId	string	
summonerId	string	Player's encrypted summonerId.
summonerName	string	
queueType	string	
tier	string	
rank	string	The player's division within a tier.
leaguePoints	int	
wins	int	Winning team on Summoners Rift.
losses	int	Losing team on Summoners Rift.
hotStreak	boolean	
veteran	boolean	
freshBlood	boolean	
inactive	boolean	
miniSeries	MiniSeriesDTO



GET Matches ID :  /lol/match/v5/matches/by-puuid/{puuid}/ids : Get a list of match ids by puuid

Return : 

List[string]



GET Matches infos  && Get Maches General Info:  /lol/match/v5/matches/{matchId}  Get a match by match id

Return  MatchDto (Object with many many info, go check : https://developer.riotgames.com/apis#match-v5/GET_getMatch )



GET Mastery : /lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID} Get all champion mastery entries sorted by number of champion points descending
Return :

List[ChampionMasteryDto]

ChampionMasteryDto : 

puuid	string	Player Universal Unique Identifier. Exact length of 78 characters. (Encrypted)
championPointsUntilNextLevel	long	Number of points needed to achieve next level. Zero if player reached maximum champion level for this champion.
chestGranted	boolean	Is chest granted for this champion or not in current season.
championId	long	Champion ID for this entry.
lastPlayTime	long	Last time this champion was played by this player - in Unix milliseconds time format.
championLevel	int	Champion level for specified player and champion combination.
summonerId	string	Summoner ID for this entry. (Encrypted)
championPoints	int	Total number of champion points for this player and champion combination - they are used to determine championLevel.
championPointsSinceLastLevel	long	Number of points earned since current level has been achieved.
tokensEarned	int	The token earned for this champion at the current championLevel. When the championLevel is advanced the tokensEarned resets to 0.


Get Champion General Info :  /lol/platform/v3/champion-rotations Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST) 

Return : ChampionInfo

ChampionInfo : 
maxNewPlayerLevel	int	
freeChampionIdsForNewPlayers	List[int]	
freeChampionIds	List[int]
