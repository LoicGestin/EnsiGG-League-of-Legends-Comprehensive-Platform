import { MatchData } from "./Matchs";
import Link from "next/link";

interface Props {
  data: MatchData;
  id: string;
}

export default function SingleMatch({ data, id }: Props) {
  // Convert data object into an array of objects with index

  let players = data.info.participants;
  let user;
  for(let i=0; i < players.length; i ++){
      if(players[i].puuid === id){
          user = players[i];
          break;
      }
  }
  // @ts-ignore
    return (
    <div className={`m-3 w-full rounded-xl  p-3 flex justify-between ${user.win ? 'bg-blue-950' : 'bg-red-950'}`}>
        <div>
          <p>Matches {data.info.gameType}</p>
          <p>{data.info.gameCreation}</p>
          <p>{data.info.platformId}</p>
            <p>{user.win ? "VOUS AVEZ WIN" : "GROS LOOSER"}</p>
        </div>
        <div className={"flex"}>
            <div className={"flex-col m-3 items-end"}>
                {players.slice(0,5).map((player: any, key: number) => (
                    <div key={key} className={"flex "}>
                        <Link href={`/summoners/${player.summonerName}`}>{player.summonerName}</Link>
                        <img className="ml-auto" src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${player.championName}.png`} alt={"Champion Image"} width={25} height={25}/>
                    </div>
                ))}
            </div>

            <div className={"flex-col m-3"}>
                {players.slice(5,10).map((player: any, key: number) => (
                    <div key={key} className={"flex"}>
                        <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${player.championName}.png`} alt={"Champion Image"} width={25} height={25}/>
                        <Link href={`/summoners/${player.summonerName}`}>{player.summonerName}</Link>
                    </div>
                ))}
            </div>


        </div>

    </div>
  );
}
