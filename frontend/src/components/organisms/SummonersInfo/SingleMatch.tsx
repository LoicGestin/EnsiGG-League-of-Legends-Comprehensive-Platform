import { MatchData } from "./Matchs";

interface Props {
  data: MatchData;
  id: string;
}

export default function SingleMatch({ data, id }: Props) {
  // Convert data object into an array of objects with index

  let players = data.info;
  return (
    <div className="m-3 w-full rounded-xl bg-slate-100 p-3">
      <p>Matches {data.info.gameType}</p>
      <p>{data.info.gameCreation}</p>
      <p>{data.info.platformId}</p>
      <p>{data.info.participants[0].win}</p>
    </div>
  );
}
