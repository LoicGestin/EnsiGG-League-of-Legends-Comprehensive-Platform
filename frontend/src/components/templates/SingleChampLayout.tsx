import { Sidebar } from "../organisms/Sidebar";
import { ChampionInfo } from "../organisms/Champions/ChampionInfo";
import { ReactNode } from "react";

/**
 * Template of the summoner layout.
 */
interface Props {
  children: ReactNode;
  championName: string;
}

export function SingleChampionLayout({ children, championName }: Props) {
  return (
    <div className="flex h-screen">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="mx-auto mt-4 flex w-3/4 flex-col space-y-8">
        {children}
        <ChampionInfo championName={championName} />
      </div>
    </div>
  );
}
