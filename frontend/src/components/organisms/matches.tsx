import {SummonerDTO} from "@/components/objects/SummonerDTO";

// @ts-ignore
export default function Matches({ data }){

    return(
        <div>
            <div>
                <p>Matches {data.info.gameType}</p>
                <p>{data.info.gameCreation}</p>
                <p>{data.info.platformId}</p>
                <p>{data.info.participants[0].win}</p>
            </div>
        </div>
    )
}