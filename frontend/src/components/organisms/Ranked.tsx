import {LeagueEntryDTO} from "@/components/objects/LeagueEntryDTO";
// @ts-ignore
export default function Ranked({ data }){

    let league = new LeagueEntryDTO(data);
    let isSoloq = league.queueType === 'RANKED_SOLO_5x5';
    let winrate = league.wins / (league.losses + league.wins) * 100 ;

    return(
        <div className="mx-auto flex w-full  justify-between rounded-xl bg-slate-100 px-[1.5vw] py-[1.5vh] m-3">
            <div className={"flex-col w-auto pl-5 pr-3"}>
            <h2>{'Ranked ' + ( isSoloq ? "Solo/Duo" : "Flex")}</h2>
            <p>{league.tier}</p>
            <p>LP: {league.leaguePoints}</p>
            </div>
            <div  className={"flex-col w- pr-10 "}>
            <p>{league.wins + "W - " + league.losses + "L"}</p>
            <p>{winrate.toFixed(2)} %</p>
            </div>
        </div>

    )
}