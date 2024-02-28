import React from "react";
import Link from "next/link";
import championsData from "../../../../public/assets/champions.json";

const ChampionsList = () => {
  return (
    <div className="bg-gray-900 p-4">
      <div className="mb-4 flex justify-between">
        <h1 className="px-8 text-2xl text-white">Champions</h1>
        <div>
          <button className=" mr-4 h-10 w-10 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"></button>
          <button className="mr-4 h-10 w-10 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"></button>
          <button className="mr-4 h-10 w-10 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"></button>
          <button className="mr-4 h-10 w-10 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"></button>
          <button className="mr-4 h-10 w-10 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"></button>
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
