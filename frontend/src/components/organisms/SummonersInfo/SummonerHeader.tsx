import { SummonerDTO } from "@/components/objects/SummonerDTO";

export default function SummonerHeader({ data }: any) {
  // @ts-ignore
    let summonerDTO = new SummonerDTO(data);

  return (
    <div className=" rounded-md flex-col mb-10 px-[1.5vw] py-[1.5vh]">
        <img className={"float-left mr-3 "} src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/${summonerDTO.profileIconId}.png`} alt={"Item Image"} width={100} height={100}/>
        <p style={{fontSize : "36px", fontWeight: "bold"}}> {summonerDTO.name} </p>
        <p> Level: {summonerDTO.summonerLevel}</p>
    </div>
  );
}
