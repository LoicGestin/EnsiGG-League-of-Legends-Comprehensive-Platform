import React from "react";
import Link from "next/link";
import championsData from "../../../../public/assets/champions.json";

const ChampionsList = () => {
  return (
    <div className="bg-gray-900 p-4 text-center">
      <h1 className="mb-4 text-2xl text-white">Champions</h1>
      <div className="grid grid-cols-6 gap-4">
        {championsData.map((champion) => (
          <Link key={champion.id} href={`/champion/${champion.id}`} passHref>
            <div className="flex flex-col items-center text-white">
              <img src={champion.icon} alt={champion.name} />
              <div>{champion.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChampionsList;
