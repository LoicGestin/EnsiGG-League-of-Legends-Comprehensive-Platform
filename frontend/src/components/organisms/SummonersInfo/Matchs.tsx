import SingleMatch from "@/components/organisms/SummonersInfo/SingleMatch";

/**
 * Display matches panel.
 */
interface Props {
  data: any[];
  id: String;
}

export default function Matchs({ data, id }: Props) {
  return (
    <div className={"w-full flex-col space-y-1"}>
      {data.map((match: any, key: number) => (
        <SingleMatch key={key} data={match} id={id}></SingleMatch>
      ))}
    </div>
  );
}

export interface MatchData {
  info: GameData;
}

export interface GameData {
  queueId: any;
  gameMode: any;
  gameType: any;
  gameCreation: any;
  gameDuration: any;
  platformId: any;
  participants: any;
}
