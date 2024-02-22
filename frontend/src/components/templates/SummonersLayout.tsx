import { ReactNode } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { SummonersInfo } from "../organisms/SummonersInfo/SummonersInfo";

/**
 * Template of the app layout.
 */
interface Props {
  children: ReactNode;
  name: string;
}

export function SummonersLayout({ children, name }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <SummonersInfo name={name} />
    </div>
  );
}
