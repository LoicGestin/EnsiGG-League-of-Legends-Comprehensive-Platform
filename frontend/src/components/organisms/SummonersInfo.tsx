import {SummonerDTO} from "@/components/objects/SummonerDTO";
import {LeagueEntryDTO} from "@/components/objects/LeagueEntryDTO";
import {array} from "prop-types";
import dynamic from "next/dynamic";
import Ranked from "@/components/organisms/Ranked";
import SummonerHeader from "@/components/organisms/SummonerHeader";
import Matches from "@/components/organisms/matches";
const League = dynamic(() => import('../organisms/Ranked'));
export async function getServerSideProps(summonerName:string){
  const apiKey = "RGAPI-58ed4674-c9dd-4d24-89f7-e9b2ae2696e3";
  const apiUrlID = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;

  const data = await fetch(apiUrlID, {
    headers: {
      'Content-Type': 'application/json',
      "Accept-Charset": "application/json; charset=UTF-8",
    }
  });
  const summonerInfo = await data.json();



  const apiUrlLeague = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.id}?api_key=${apiKey}`;
  const league = await fetch(apiUrlLeague, {
    headers: {
      'Content-Type': 'application/json',
      "Accept-Charset": "application/json; charset=UTF-8",
    }
  });
  const jsonResponseLeague = await league.json();

  const apiUrlMatchId = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerInfo.puuid}/ids?start=0&count=20&api_key=${apiKey}`;
  const matchIdResponse = await fetch(apiUrlMatchId, {
    headers: {
      'Content-Type': 'application/json',
      "Accept-Charset": "application/json; charset=UTF-8",
    }
  });
  const matchIdJson = await matchIdResponse.json()
  const matches= [];
  for(let match of matchIdJson){
     const apiUrlMatch = `https://europe.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${apiKey}`;
     const matchResponse = await  fetch(apiUrlMatch, {
       headers: {
         'Content-Type': 'application/json',
         "Accept-Charset": "application/json; charset=UTF-8",
       }
     });
     const matchResponseJson = await matchResponse.json();
     matches.push(matchResponseJson)
  }
  return [summonerInfo,jsonResponseLeague, matches];
}

// @ts-ignore
export async function SummonersInfo({name}) {

  if(name == null){
    name = "Sigma Shadowman";
  }
  let data = await getServerSideProps(name);


  const summonerInfo = new SummonerDTO(data[0]);
  const leagueInfoSoloq = data[1][0];
  const leagueInfoFlex= data[1][1];
  const matches = data[2][0];
  return (
      <div className="mx-auto flex-col w-3/4 bg-slate-600 ">

        <div className="m-3">
          <SummonerHeader data={summonerInfo}></SummonerHeader>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-4/12 m-3 mr-10 ">
            <Ranked data={leagueInfoSoloq}></Ranked>
            <Ranked data={leagueInfoFlex}></Ranked>
          </div>
          <div className="mx-auto mr-3 flex w-9/12 rounded-xl bg-slate-100 px-[1.5vw] py-[1.5vh] ">
            <Matches data={matches}></Matches>
          </div>
        </div>
      </div>
  );
}