import SingleMatch from "@/components/organisms/SummonersInfo/SingleMatch";

/**
 * Display matches panel.
 */
interface Props {
  data: any[];
  id: string;
}

export default function Matchs({ data, id }: Props) {
  return (
    <div className="w-full">
      {data.map((match: any, key: number) => (
        <SingleMatch key={key} data={match} id={id}></SingleMatch>
      ))}
    </div>
  );
}

export interface MatchData {
  info: GameData;
}

interface GameData {
  gameType: any;
  gameCreation: any;
  platformId: any;
  participants: any;
}
