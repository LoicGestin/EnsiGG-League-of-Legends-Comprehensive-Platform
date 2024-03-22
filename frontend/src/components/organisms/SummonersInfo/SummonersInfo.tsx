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
  let name = summonerName.split("%3A")[0];
  let tag = summonerName.split("%3A")[1];

  const apiUrlAccount = `http://localhost:8000/summoner/by-name/${name}/${tag}`;

  const data = await fetch(apiUrlAccount, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
  });
  const accountInfo = await data.json();

  return getServerSidePropsExt(accountInfo, accountInfo.summonerPuuid);
}

interface Props {
  summonerInfo: SummonerDTO;
  summonerPuuid: String;
}

export async function getServerSidePropsExt(summonerInfo, summonerPuuid) {
  const apiKey = "RGAPI-4f73f4ca-6f31-444c-9f8c-224bf12626e3";
  if (summonerInfo === null) {
    const apiUrlAccount = `http://localhost:8000/summoner/by-puuid/${summonerPuuid}`;
    const x = await fetch(apiUrlAccount, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Charset": "application/json; charset=UTF-8",
      },
    });
    summonerInfo = await x.json();
  }

  const apiUrlLeague = `http://localhost:8000/league/${summonerPuuid}`;
  const league = await fetch(apiUrlLeague, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
  });
  const jsonResponseLeague = await league.json();

  const apiUrlMatchId = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=20&api_key=${apiKey}`;
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

interface Props {
  name: string;
}

export async function SummonersInfo({ name }: Props) {
  let data;
  if (name.length > 60) {
    data = await getServerSidePropsExt(null, name);
  } else {
    data = await getServerSideProps(name);
  }

  const summonerInfo = data[0] as SummonerDTO;
  const leagueInfoSoloq = data[1][0] as LeagueEntryDTO;
  const leagueInfoFlex = data[1][1] as LeagueEntryDTO;
  const matches = data[2];

  return (
    <div className="mx-auto w-10/12 flex-col space-y-3 text-white ">
      <SummonerHeader data={summonerInfo} />

      <div className="flex w-full space-x-3">
        <div className=" flex w-5/12 flex-col space-y-1 ">
          <Ranked data={leagueInfoSoloq} />
          <Ranked data={leagueInfoFlex} />
        </div>
        <Matchs data={matches} id={summonerInfo.summonerPuuid} />
      </div>
    </div>
  );
}
