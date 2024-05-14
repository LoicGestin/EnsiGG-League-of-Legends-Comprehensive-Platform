import { ReactNode } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { Searchbar } from "../organisms/Searchbar";
import { ProdraftLink } from "../organisms/Prodraft/ProdraftLink";
/**
 * Template of the app layout.
 */
interface Props {
  children: ReactNode;
}

export function ProdraftLayout() {
  return (
    <div className="flex h-screen">
      <div className="mx-auto mt-4 flex w-3/4 flex-col space-y-8">
        <ProdraftLink />
      </div>
    </div>
  );
}
