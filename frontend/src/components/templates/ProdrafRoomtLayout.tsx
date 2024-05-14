import { ReactNode } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { Searchbar } from "../organisms/Searchbar";
import { ProdraftTest } from "../organisms/Prodraft/ProdraftLink";
import ProdraftRoom from "@/components/organisms/Prodraft/ProdraftRoom";
/**
 * Template of the app layout.
 */

export function ProdraftRoomLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div>
        <Sidebar />
      </div>
      <div className="mx-auto w-full">
        <ProdraftRoom />
      </div>
    </div>
  );
}
