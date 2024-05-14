"use client";

import { PersonnageDTO } from "@/components/objects/PersonnageDTO";
import Image from "next/image";
import { useState } from "react";
interface Props {
  data: PersonnageDTO[];
}

/**
 * Personnage Pannel.
 */
export default function Personnages({ data }: Props) {
  const [actif, setActif] = useState<number>(0);

  return (
    <div className="flex flex-col space-y-4 divide-y-2 divide-slate-950 rounded-md bg-slate-800 p-2">
      <div className="flex justify-center space-x-1">
        <span
          className={`rounded-md p-1 ${actif === 0 ? "bg-slate-600" : "bg-slate-800"}`}
        >
          <button onClick={() => setActif(0)}>Ranked Solo</button>
        </span>
        <span
          className={`rounded-md p-1 ${actif === 1 ? "bg-slate-600" : "bg-slate-800"}`}
        >
          <button onClick={() => setActif(1)}>Ranked Flex</button>
        </span>
      </div>
      <div className="flex flex-col divide-y-2 divide-slate-950">
        {data.map((personnage, key) => {
          if (personnage.queueId === (actif === 0 ? 420 : 440)) {
            return (
              <div className="my-auto py-1" key={key}>
                <SinglePersonnage personnage={personnage} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

interface SinglePersonnageProps {
  personnage: PersonnageDTO;
}

function SinglePersonnage({ personnage }: SinglePersonnageProps) {
  const nbGames = personnage.wins + personnage.losses;

  return (
    <div className="flex items-center justify-between px-1">
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${personnage.championName}.png`}
        alt={personnage.championName}
        width={40}
        height={40}
      />
      <span className="text-white">{personnage.championName}</span>
      <div className="flex flex-col items-center">
        <span>
          {Math.round(
            ((personnage.kills + personnage.assists) * 10) / personnage.deaths,
          ) / 10}
          KDA
        </span>
        <span>
          {Math.round((personnage.kills * 10) / nbGames) / 10}/
          {Math.round((personnage.deaths * 10) / nbGames) / 10}/
          {Math.round((personnage.assists * 10) / nbGames) / 10}
        </span>
      </div>
      <div className="flex flex-col">
        <span>{Math.round((personnage.wins * 100) / nbGames)}%</span>
        <span>{nbGames} games</span>
      </div>
    </div>
  );
}
