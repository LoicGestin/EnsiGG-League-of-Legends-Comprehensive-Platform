import {SummonerDTO} from "@/components/objects/SummonerDTO";
import {MatchDTO} from "@/components/objects/MatchDTO";
// @ts-ignore
export default function SingelMatche({ data, id}){
    // Convert data object into an array of objects with index



    let players =  data.info
    return(
        <div className="bg-slate-100 m-3 w-full rounded-xl p-3">

            <p>Matches {data.info.gameType}</p>
            <p>{data.info.gameCreation}</p>
            <p>{data.info.platformId}</p>
            <p>{data.info.participants[0].win}</p>

        </div>
    )
}