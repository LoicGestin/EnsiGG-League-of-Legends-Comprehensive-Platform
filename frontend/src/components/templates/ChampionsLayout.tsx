"use client";

import { ReactNode } from "react";
import { Sidebar } from "../organisms/Sidebar";
import { Searchbar } from "../organisms/Searchbar";
import ChampionsList from "../organisms/Champions/ChampionsList";
/**
 * Template of the list of champions layout.
 */

interface Props {
  children: ReactNode;
}

export function ChampionsLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="mx-auto mt-4 flex w-3/4 flex-col space-y-8">
        {children}
        <ChampionsList />
      </div>
    </div>
  );
}
