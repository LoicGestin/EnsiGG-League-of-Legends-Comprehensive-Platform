import { SummonerDTO } from "@/components/objects/SummonerDTO";

export default function SummonerHeader({ data }: any) {
  // @ts-ignore
    let summonerDTO = new SummonerDTO(data);

  return (
    <div className=" rounded-md flex-col bg-slate-800 px-[1.5vw] py-[1.5vh]">
        <h2>Summoner Info</h2>
        <p>Summoner Name: {summonerDTO.name} </p>
        <p>Summoner Level: {summonerDTO.summonerLevel}</p>
    </div>
  );
}
