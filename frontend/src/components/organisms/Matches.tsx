import {SummonerDTO} from "@/components/objects/SummonerDTO";
import SingelMatche from "@/components/organisms/SingelMatche";


export default function Matches({ data, id }){
    return (
        <div className="w-full  ">
            {data.map((match) => (
                // eslint-disable-next-line react/jsx-key
                <SingelMatche data={match} id={id}></SingelMatche>
            ))}
        </div>
    );
}