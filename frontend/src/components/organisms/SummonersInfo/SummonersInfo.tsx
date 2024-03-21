import { SummonerDTO } from "@/components/objects/SummonerDTO";
import { LeagueEntryDTO } from "@/components/objects/LeagueEntryDTO";
import { array } from "prop-types";
import dynamic from "next/dynamic";
import Ranked from "@/components/organisms/SummonersInfo/Ranked";
import SummonerHeader from "@/components/organisms/SummonersInfo/SummonerHeader";
import Matchs from "@/components/organisms/SummonersInfo/Matchs";
import api from "@/services/api";

const League = dynamic(() => import("./Ranked"));

export async function getServerSideProps(summonerName: string) {
  const apiKey = "RGAPI-5d063476-cbcf-4a4c-a30e-53fd34332a93";
  let name = summonerName.split("%3A")[0];
  let tag = summonerName.split("%3A")[1];

  console.log(summonerName);
  console.log(summonerName);
  console.log(summonerName);
  console.log(summonerName);
  console.log(summonerName);
  console.log(summonerName);
  console.log(summonerName);
  console.log(summonerName);

  const apiUrlAccount = `http://localhost:8000/summoner/${name}/${tag}`;

  const data = await fetch(apiUrlAccount, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
  });

  const accountInfo = await data.json();

  console.log(accountInfo);

  return getServerSidePropsExt(accountInfo.summonerPuuid);
}
export async function getServerSidePropsExt(puuid: string) {
  const apiKey = "RGAPI-5d063476-cbcf-4a4c-a30e-53fd34332a93";

  const apiUrlID = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;

  const data = await fetch(apiUrlID, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
  });
  const summonerInfo = await data.json();

  const apiUrlLeague = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.id}?api_key=${apiKey}`;
  const league = await fetch(apiUrlLeague, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
  });
  const jsonResponseLeague = await league.json();

  const apiUrlMatchId = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerInfo.puuid}/ids?start=0&count=20&api_key=${apiKey}`;
  const matchIdResponse = await fetch(apiUrlMatchId, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
  });
  const matchIdJson = await matchIdResponse.json();
  const matches = [];
  for (let match of matchIdJson) {
    const apiUrlMatch = `https://europe.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${apiKey}`;
    const matchResponse = await fetch(apiUrlMatch, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Charset": "application/json; charset=UTF-8",
      },
    });
    const matchResponseJson = await matchResponse.json();
    matches.push(matchResponseJson);
  }
  return [summonerInfo, jsonResponseLeague, matches];
}

// @ts-ignore
interface Props {
  name: string;
}

export async function SummonersInfo({ name }: Props) {
  let data;
  if (name.length > 60) {
    data = await getServerSidePropsExt(name);
  } else {
    data = await getServerSideProps(name);
  }
  // @ts-ignore
  const summonerInfo = new SummonerDTO(data[0]);
  const leagueInfoSoloq = data[1][0];
  const leagueInfoFlex = data[1][1];
  const matches = data[2];
  return (
    <div className="mx-auto w-10/12 flex-col space-y-3 text-white ">
      <SummonerHeader data={summonerInfo}></SummonerHeader>

      <div className="flex w-full space-x-3">
        <div className=" flex w-5/12 flex-col space-y-1 ">
          <Ranked data={leagueInfoSoloq}></Ranked>
          <Ranked data={leagueInfoFlex}></Ranked>
        </div>
        <Matchs data={matches} id={summonerInfo.puuid}></Matchs>
      </div>
    </div>
  );
}
