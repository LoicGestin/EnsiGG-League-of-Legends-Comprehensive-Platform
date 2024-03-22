"use client";
import { MatchData } from "./Matchs";
import { useEffect, useState } from "react";
const queuesData = require("../../../../public/assets/queues.json");
const summonerData = require("../../../../public/assets/summoner.json");
const runesData = require("../../../../public/assets/runesReforged.json");
import Link from "next/link";
import Image from "next/image";

interface Props {
  data: MatchData;
  id: string;
}

export default function SingleMatch({ data, id }: Props) {
  // Convert data object into an array of objects with index

  let players = data.info.participants;
  // @ts-ignore
  let user = players.find((player) => player.puuid === id);

  let firstSum = summonerData.find((spell) => spell.key == user.summoner1Id).id;
  let secondSum = summonerData.find(
    (spell) => spell.key == user.summoner2Id,
  ).id;

  firstSum = firstSum.charAt(0).toUpperCase() + firstSum.slice(1);
  secondSum = secondSum.charAt(0).toUpperCase() + secondSum.slice(1);

  let firstRune = runesData.find(
    (rune) => rune.id == user.perks.styles[0].style,
  ).icon;
  let secondRune = runesData.find(
    (rune) => rune.id == user.perks.styles[1].style,
  ).icon;

  const [timeSinceCreation, setTimeSinceCreation] = useState("");

  useEffect(() => {
    const gameCreationTimestamp = data.info.gameCreation;
    const currentTimestamp = new Date().getTime();
    const timeDifference = currentTimestamp - gameCreationTimestamp;
    if (timeDifference < 60000) {
      // Less than 1 minute
      setTimeSinceCreation(`${Math.floor(timeDifference / 1000)} seconds ago`);
    } else if (timeDifference < 3600000) {
      // Less than 1 hour
      setTimeSinceCreation(`${Math.floor(timeDifference / 60000)} minutes ago`);
    } else if (timeDifference < 86400000) {
      // Less than 1 day
      setTimeSinceCreation(`${Math.floor(timeDifference / 3600000)} hours ago`);
    } else if (timeDifference < 2592000000) {
      // Less than 1 month (approx. 30 days)
      setTimeSinceCreation(`${Math.floor(timeDifference / 86400000)} days ago`);
    } else if (timeDifference < 31536000000) {
      // Less than 1 year (approx. 365 days)
      setTimeSinceCreation(
        `${Math.floor(timeDifference / 2592000000)} months ago`,
      );
    } else {
      // More than 1 year
      setTimeSinceCreation("More than a year ago");
    }
  }, [data.info.gameCreation]);

  const formatGameDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const kdaCalcul = (kill: number, death: number, assist: number) => {
    return ((kill + assist) / (death == 0 ? 1 : death)).toFixed(2);
  };
  return (
    <div
      className={`flex justify-between rounded-md px-[1vw] py-[1vh] ${user.win ? "bg-blue-950" : "bg-red-950"}`}
    >
      <div className={"w-2/12 flex-col pt-3 text-center "}>
        <p className="text-[16px]">
          {
            queuesData.find((queue) => queue.queueId === data.info.queueId)
              .description
          }
        </p>
        <p className="text-[12px]">{timeSinceCreation}</p>
        <p className="text-[12px]">
          {user.win ? "WIN " : "LOSS "}{" "}
          {formatGameDuration(data.info.gameDuration)}
        </p>
      </div>
      <div className="my-auto  flex  w-2/12">
        <Link href={`/champions/${user.championName.toLowerCase()}`}>
          <Image
            className={"max-w-fit"}
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${user.championName}.png`}
            alt={"Champion Image"}
            width={72}
            height={72}
          />
        </Link>
        <div className="w-72 flex-col">
          <Image
            className="min-w-[36px]"
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/Summoner${firstSum}.png`}
            alt={firstSum}
            width={36}
            height={36}
          />
          <Image
            className="min-w-[36px]"
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/Summoner${secondSum}.png`}
            alt={secondSum}
            width={36}
            height={36}
          />
        </div>
        <div className="w-72 flex-col">
          <img
            className="min-w-[36px]"
            src={`https://ddragon.canisback.com/img/${firstRune}`}
            alt={firstRune}
            width={36}
            height={36}
          />
          <img
            className="min-w-[36px]"
            src={`https://ddragon.canisback.com/img/${secondRune}`}
            alt={secondRune}
            width={36}
            height={36}
          />
        </div>
      </div>
      <div className="my-auto w-2/12 text-center text-[12px] leading-[14px] text-slate-500">
        <p>
          <span className="text-blue-600">{user.kills}</span> /{" "}
          <span className="text-red-600">{user.deaths}</span> /{" "}
          <span className="text-yellow-600">{user.assists}</span>
        </p>
        <p className="text-white">
          {kdaCalcul(user.kills, user.deaths, user.assists)} KDA
        </p>
        <p>
          {user.totalMinionsKilled} CS (
          {(user.totalMinionsKilled / (data.info.gameDuration / 60)).toFixed(2)}
          )
        </p>
        <p>{user.visionScore} vision</p>
        <p>{user.visionWardsBoughtInGame} Control Ward</p>
      </div>
      <div className="my-auto flex-col ">
        <div className="flex">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item0 == "0" ? "2056" : user.item0}.png`}
            alt={"Item Image"}
            width={30}
            height={30}
          />
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item1 == "0" ? "2056" : user.item1}.png`}
            alt={"Item Image"}
            width={30}
            height={30}
          />
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item2 == "0" ? "2056" : user.item2}.png`}
            alt={"Item Image"}
            width={30}
            height={30}
          />
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item6 == "0" ? "2056" : user.item6}.png`}
            alt={"Item Image"}
            width={30}
            height={30}
          />
        </div>
        <div className="flex">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item3 == "0" ? "2056" : user.item3}.png`}
            alt={"Item Image"}
            width={30}
            height={30}
          />
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item4 == "0" ? "2056" : user.item4}.png`}
            alt={"Item Image"}
            width={30}
            height={30}
          />
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${user.item5 == "0" ? "2056" : user.item5}.png`}
            alt={"Item Image"}
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className={"flex items-center"}>
        <div className={"flex-col "} style={{ width: "57.8px" }}>
          {players.slice(0, 5).map((player: any, key: number) => (
            <div key={key} className={"flex  "}>
              <div
                style={{
                  fontSize: "10.5px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Link href={`/summoners/${player.puuid}`}>
                  {player.summonerName}
                </Link>
              </div>
              <img
                className="ml-auto shrink-0"
                src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${player.championName}.png`}
                alt={"Champion Image"}
                width={20}
                height={20}
              />
            </div>
          ))}
        </div>

        <div className={"flex-col"} style={{ width: "57.8px" }}>
          {players.slice(5, 10).map((player: any, key: number) => (
            <div key={key} className={"flex"}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${player.championName}.png`}
                alt={"Champion Image"}
                width={20}
                height={20}
              />
              <div
                style={{
                  fontSize: "10.5px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Link href={`/summoners/${player.puuid}`}>
                  {player.summonerName}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
