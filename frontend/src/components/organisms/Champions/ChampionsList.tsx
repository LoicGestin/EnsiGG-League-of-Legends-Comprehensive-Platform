import React from "react";
import Link from "next/link";
import championsData from "../../../../public/assets/champions.json";

const ChampionsList = () => {
  return (
    <div className="bg-gray-900 p-4">
      <div className="mb-16 flex items-end justify-between">
        <h1 className="px-8 py-8 text-4xl text-white">Champions</h1>
        <div className="flex items-end">
          <button className="h-25 w-25 mb-2 mr-4 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            <img src="icons/lanes/Position_Gold-Top.png" alt="Top" />
          </button>
          <button className="mb-2 mr-4 h-auto w-auto bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            <img src="icons/lanes/Position_Gold-Jungle.png" alt="Jungle" />
          </button>
          <button className="mb-2 mr-4 h-auto w-auto bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            <img src="icons/lanes/Position_Gold-Mid.png" alt="Mid" />
          </button>
          <button className="mb-2 mr-4 h-auto w-auto bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            <img src="icons/lanes/Position_Gold-Bot.png" alt="Adc" />
          </button>
          <button className="mb-2 mr-4 h-auto w-auto bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            <img src="icons/lanes/Position_Gold-Support.png" alt="Sup" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {championsData.map((champion) => (
          <Link key={champion.id} href={`/champions/${champion.id}`}>
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
