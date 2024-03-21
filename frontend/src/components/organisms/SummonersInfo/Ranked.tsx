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
    <div className="flex justify-between rounded-md space-x-5 bg-slate-800 px-[1vw] py-[1vh]">
      <div className={"flex-col space-y-2"}>
        <h2>{"Ranked " + (isSoloq ? "Solo/Duo" : "Flex")}</h2>
          <div className={"flex space-x-2"}>
          <Image
            src={`/icons/RankedEmblemsLatest/Rank=${league.tier}.png`}
            alt="Rank"
            width={72}
            height={72}
          />
              <div className={"flex-col"}>
                  <p>{league.tier}</p>
                  <p>LP: {league.leaguePoints}</p>
              </div>

          </div>
      </div>
      <div className={"flex-col"}>
        <p>{league.wins + "W - " + league.losses + "L"}</p>
        <p>{winrate.toFixed(2)} %</p>
      </div>
    </div>
  );
}
