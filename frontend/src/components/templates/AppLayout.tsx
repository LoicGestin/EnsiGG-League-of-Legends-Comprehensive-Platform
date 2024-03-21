import { ReactNode } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { Searchbar } from "../organisms/Searchbar";
/**
 * Template of the app layout.
 */
interface Props {
  children: ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="my-auto grow">{children}</div>
    </div>
  );
}
