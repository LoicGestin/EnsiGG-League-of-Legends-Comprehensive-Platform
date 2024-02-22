import { SummonerDTO } from "@/components/objects/SummonerDTO";

export default function SummonerHeader({ data }: any) {
  let summonerDTO = new SummonerDTO(data);

  return (
    <div className="m-3 mx-auto flex  w-full justify-between rounded-xl bg-slate-100 px-[1.5vw] py-[1.5vh]">
      <div>
        <h2>Summoner Info</h2>
        <p>Summoner Name: {summonerDTO.name} </p>
        <p>Summoner Level: {summonerDTO.summonerLevel}</p>
      </div>
    </div>
  );
}
