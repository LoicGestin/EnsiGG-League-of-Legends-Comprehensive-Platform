'use client'
import { MatchData } from "./Matchs";
import { useEffect, useState } from 'react';
const queuesData = require('../../../../public/assets/queues.json');
import Link from "next/link";

interface Props {
  data: MatchData;
  id: string;
}

export default function SingleMatch({ data, id }: Props) {
  // Convert data object into an array of objects with index

    let players = data.info.participants;
    // @ts-ignore
    let user = players.find(player => player.puuid === id);
    const [timeSinceCreation, setTimeSinceCreation] = useState('');

    useEffect(() => {
        const gameCreationTimestamp = data.info.gameCreation;
        const currentTimestamp = new Date().getTime();
        const timeDifference = currentTimestamp - gameCreationTimestamp;
        if (timeDifference < 60000) { // Less than 1 minute
            setTimeSinceCreation(`${Math.floor(timeDifference / 1000)} seconds ago`);
        } else if (timeDifference < 3600000) { // Less than 1 hour
            setTimeSinceCreation(`${Math.floor(timeDifference / 60000)} minutes ago`);
        } else if (timeDifference < 86400000) { // Less than 1 day
            setTimeSinceCreation(`${Math.floor(timeDifference / 3600000)} hours ago`);
        } else if (timeDifference < 2592000000) { // Less than 1 month (approx. 30 days)
            setTimeSinceCreation(`${Math.floor(timeDifference / 86400000)} days ago`);
        } else if (timeDifference < 31536000000) { // Less than 1 year (approx. 365 days)
            setTimeSinceCreation(`${Math.floor(timeDifference / 2592000000)} months ago`);
        } else { // More than 1 year
            setTimeSinceCreation('More than a year ago');
        }
    }, [data.info.gameCreation]);

    const formatGameDuration = (durationInSeconds : number) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const kdaCalcul = (kill: number, death: number, assist: number) =>{
        return ((kill + assist) / (death == 0 ? 1 : death)).toFixed(2);
    }
    return (
    <div className={`rounded-md px-[1vw] py-[1vh] flex justify-between ${user.win ? 'bg-blue-950' : 'bg-red-950'}`}>
        <div className={"flex-col"}>
            <div>
              <p>{queuesData.find(queue => queue.queueId === data.info.queueId ).description}</p>
              <p>{timeSinceCreation}</p>
            </div>
            <p>{user.win ? "WIN " : "LOSS "} {formatGameDuration(data.info.gameDuration) }</p>
        </div>
        <div>
            <img className="ml-auto" src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${user.championName}.png`} alt={"Champion Image"} width={72} height={72}/>
        </div>
        <div className="text-center">
            <p>{user.kills} / {user.deaths} / {user.assists}</p>
            <p>{kdaCalcul(user.kills,user.deaths,user.assists)} KDA</p>
            <p>{user.totalMinionsKilled} CS</p>
            <p>{user.visionScore} vision</p>
            <p>{user.visionWardsBoughtInGame} Control Ward</p>
        </div>
        <div className="flex-col ">
            <div className="flex">
            <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item0}.png`} alt={"Item Image"} width={30} height={30}/>
            <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item1}.png`} alt={"Item Image"} width={30} height={30}/>
            <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item2}.png`} alt={"Item Image"} width={30} height={30}/>
            </div>
            <div className="flex">
            <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item3}.png`} alt={"Item Image"} width={30} height={30}/>
            <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item4}.png`} alt={"Item Image"} width={30} height={30}/>
            <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item5}.png`} alt={"Item Image"} width={30} height={30}/>
            </div>
            <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item6}.png`} alt={"Item Image"} width={30} height={30}/>
        </div>
        <div className={"flex items-center"}>
            <div className={"flex-col "} style={{width : "57.8px"}}>
                {players.slice(0,5).map((player: any, key: number) => (
                    <div key={key} className={"flex "}>
                        <div style={{ fontSize: '10.5px', overflow: "hidden",whiteSpace: "nowrap" ,textOverflow:"ellipsis"}}>
                        <Link  href={`/summoners/${player.summonerName}`}>{player.summonerName}</Link>
                        </div>
                        <img className="ml-auto shrink-0"  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${player.championName}.png`} alt={"Champion Image"} width={20} height={20}/>
                    </div>
                ))}
            </div>

            <div className={"flex-col"} style={{width : "57.8px"}}>
                {players.slice(5,10).map((player: any, key: number) => (
                    <div key={key} className={"flex"}>
                        <img  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${player.championName}.png`} alt={"Champion Image"} width={20} height={20}/>
                        <div style={{ fontSize: '10.5px', overflow: "hidden",whiteSpace: "nowrap",textOverflow:"ellipsis" }}>
                            <Link  href={`/summoners/${player.summonerName}`}>{player.summonerName}</Link>
                        </div>
                    </div>
                ))}
            </div>


        </div>

    </div>
  );
}
