import { SummonerDTO } from "@/components/objects/SummonerDTO";
import Image from "next/image";

/**
 * Handle and display summonerHeader
 */
interface Props {
  data: SummonerDTO;
}
export default function SummonerHeader({ data }: Props) {
  return (
    <div className=" mb-10 flex-col rounded-md px-[1.5vw] py-[1.5vh]">
      <Image
        className={"float-left mr-3 "}
        src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/${data.summonerProfileIconId}.png`}
        alt={"Item Image"}
        width={100}
        height={100}
      />
      <p style={{ fontSize: "36px", fontWeight: "bold" }}>
        {" "}
        {data.summonerName}{" "}
      </p>
      <p> Level: {data.summonerLevel}</p>
    </div>
  );
}
