import { ReactNode } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { SummonersInfo } from "../organisms/SummonersInfo";

/**
 * Template of the app layout.
 */
interface Props {
  children: ReactNode;
}

export function SummonersLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <SummonersInfo name={"Sigma Shadowman"}/>
    </div>
  );
}
