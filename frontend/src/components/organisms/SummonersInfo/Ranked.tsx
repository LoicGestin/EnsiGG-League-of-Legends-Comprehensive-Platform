import { LeagueEntryDTO } from "@/components/objects/LeagueEntryDTO";
import Image from "next/image";

/**
 * Display summoners ranking.
 */
interface Props {
  data: LeagueEntryDTO;
}

export default function Ranked({ data }: Props) {
  let isSoloq = data.queueType === "RANKED_SOLO_5x5";
  let winrate = (data.wins / (data.losses + data.wins)) * 100;

  return (
    <div className="flex justify-between space-x-5 rounded-md bg-slate-800 px-[1vw] py-[1vh]">
      <div className={"flex-col space-y-2"}>
        <h2>{"Ranked " + (isSoloq ? "Solo/Duo" : "Flex")}</h2>
        <div className={"flex space-x-2"}>
          <Image
            src={`/icons/RankedEmblemsLatest/Rank=${data.tier}.png`}
            alt="Rank"
            width={72}
            height={72}
          />
          <div className={"flex-col"}>
            <p>{data.tier}</p>
            <p>LP: {data.leaguePoints}</p>
          </div>
        </div>
      </div>
      <div className={"flex-col"}>
        <p>{data.wins + "W - " + data.losses + "L"}</p>
        <p>{winrate.toFixed(2)} %</p>
      </div>
    </div>
  );
}
