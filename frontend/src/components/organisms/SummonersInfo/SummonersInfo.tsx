import { SummonerDTO } from "@/components/objects/SummonerDTO";
import { LeagueEntryDTO } from "@/components/objects/LeagueEntryDTO";
import dynamic from "next/dynamic";
import Ranked from "@/components/organisms/SummonersInfo/Ranked";
import SummonerHeader from "@/components/organisms/SummonersInfo/SummonerHeader";
import Matchs from "@/components/organisms/SummonersInfo/Matchs";
import Personnages from "./Personnages";

const BASE_URL = "http://localhost:8000";

export async function getServerSideProps(summonerName: string) {
  let name = summonerName.split("%3A")[0];
  let tag = summonerName.split("%3A")[1];

  const apiUrlAccount = `${BASE_URL}/summoner/by-name/${name}/${tag}`;

  const data = await fetch(apiUrlAccount, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
    cache: "no-store",
  });
  const accountInfo = await data.json();

  return getServerSidePropsExt(accountInfo, accountInfo.summonerPuuid);
}

interface Props {
  summonerInfo: SummonerDTO;
  summonerPuuid: String;
}

export async function getServerSidePropsExt(
  summonerInfo: SummonerDTO | null,
  summonerPuuid: String,
) {
  if (summonerInfo === null) {
    const apiUrlAccount = `${BASE_URL}/summoner/by-puuid/${summonerPuuid}`;
    const x = await fetch(apiUrlAccount, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Charset": "application/json; charset=UTF-8",
      },
      cache: "no-store",
    });
    summonerInfo = await x.json();
  }

  const apiUrlLeague = `${BASE_URL}/league/${summonerPuuid}`;
  const league = await fetch(apiUrlLeague, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
    cache: "no-store",
  });
  const jsonResponseLeague = await league.json();

  const apiUrlMatches = `${BASE_URL}/get_all_matches/?summoner_puuid=${summonerPuuid}`;
  const matchesResponse = await fetch(apiUrlMatches, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json; charset=UTF-8",
    },
    cache: "no-store",
  });
  const matchesResponseJson = await matchesResponse.json();

  const apiUrlPersonnages = `${BASE_URL}/personnages/${summonerInfo?.summonerId}`;
  const personnagesResponse = await fetch(apiUrlPersonnages);

  const personnagesResponseJson = await personnagesResponse.json();
  return [
    summonerInfo,
    jsonResponseLeague,
    matchesResponseJson,
    personnagesResponseJson,
  ];
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
  const personnages = data[3];

  return (
    <div className="mx-auto w-5/6 flex-col space-y-3 text-white ">
      <SummonerHeader data={summonerInfo} />

      <div className="flex w-full space-x-3">
        <div className=" flex w-5/12 flex-col space-y-1 ">
          <Ranked data={leagueInfoSoloq} />
          <Ranked data={leagueInfoFlex} />
          <Personnages data={personnages} />
        </div>
        <Matchs data={matches} id={summonerInfo.summonerPuuid} />
      </div>
    </div>
  );
}
