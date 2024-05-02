import { LeagueEntryDTO } from "@/components/objects/LeagueEntryDTO";
import Image from "next/image";

/**
 * Display summoners ranking.
 */
interface Props {
  data: LeagueEntryDTO;
}

export default function Ranked({ data }: Props) {
  let isSoloq = data.queueId === 420;
  let winrate = (data.wins / (data.losses + data.wins)) * 100;

  return (
    <div className="flex items-center justify-between space-x-5 rounded-md bg-slate-800 px-[1vw] py-[1vh]">
      <div className={"flex-col items-start space-y-2"}>
        <h2>{"Ranked " + (isSoloq ? "Solo/Duo" : "Flex")}</h2>
        <div className={"flex items-center space-x-2"}>
          <div className="h-[72px] w-[72px]">
            <Image
              src={`/icons/RankedEmblemsLatest/Rank=${data.tier}.png`}
              alt="Rank"
              width={72}
              height={72}
            />
          </div>
          <div className={"flex-col"}>
            <p>{data.tier}</p>
            <p>LP: {data.leaguePoints}</p>
          </div>
        </div>
      </div>
      <div
        className={`flex w-20 flex-col ${data.wins === 0 && data.losses === 0 && "hidden"}`}
      >
        <span>{data.wins + "W - " + data.losses + "L"}</span>
        <span>{winrate.toFixed(2)} %</span>
      </div>
    </div>
  );
}
