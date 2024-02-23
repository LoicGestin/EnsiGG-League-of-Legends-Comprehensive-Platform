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

    return (
    <div className={`rounded-md px-[1vw] py-[1vh] flex justify-between ${user.win ? 'bg-blue-950' : 'bg-red-950'}`}>
        <div>

          <p>{queuesData.find(queue => queue.queueId === data.info.queueId ).description}</p>
          <p>{timeSinceCreation}</p>
            <p>{user.win ? "WIN" : "LOSS"}</p>
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
