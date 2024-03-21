import { ReactNode } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { SummonersInfo } from "../organisms/SummonersInfo/SummonersInfo";

/**
 * Template of the summoner layout.
 */
interface Props {
  children: ReactNode;
  name: string;
}

export function SummonersLayout({ children, name }: Props) {
  return (
    <div className="flex h-screen">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="mx-auto mt-4 flex w-3/4 flex-col space-y-8">
        {children}
        <SummonersInfo name={name} />
      </div>
    </div>
  );
}
