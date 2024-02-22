import { LeagueEntryDTO } from "@/components/objects/LeagueEntryDTO";
import Image from "next/image";

/**
 * Display summoners ranking.
 */
export default function Ranked({ data }: any) {
  // @ts-ignore
    let league = new LeagueEntryDTO(data);
  let isSoloq = league.queueType === "RANKED_SOLO_5x5";
  let winrate = (league.wins / (league.losses + league.wins)) * 100;

  return (
    <div className="m-3 mx-auto flex  w-full justify-between rounded-xl bg-slate-800 px-[1.5vw] py-[1.5vh]">
      <div className={"w-auto  flex-col pl-5 pr-3"}>
        <h2>{"Ranked " + (isSoloq ? "Solo/Duo" : "Flex")}</h2>
        <div>
          <Image
            src={`/icons/RankedEmblemsLatest/Rank=${league.tier}.png`}
            alt="Rank"
            width={50}
            height={50}
          />
          <p>{league.tier}</p>
          <p>LP: {league.leaguePoints}</p>
        </div>
      </div>
      <div className={"w- flex-col pr-10 "}>
        <p>{league.wins + "W - " + league.losses + "L"}</p>
        <p>{winrate.toFixed(2)} %</p>
      </div>
    </div>
  );
}
