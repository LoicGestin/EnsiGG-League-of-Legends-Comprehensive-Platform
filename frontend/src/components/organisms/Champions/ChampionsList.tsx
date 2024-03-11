import React, { useState } from "react";
import Link from "next/link";
import championsData from "../../../../public/assets/champions.json";

const ChampionsList = () => {
  const [selectedLane, setSelectedLane] = useState("Fill");
  const [filteredChampions, setFilteredChampions] = useState(championsData);

  const handleLaneSelect = (lane) => {
    setSelectedLane(lane);
    if (lane === "Fill") {
      setFilteredChampions(championsData);
    } else {
      const champions_filtered = championsData.filter((champion) =>
        champion.role.includes(lane),
      );
      setFilteredChampions(champions_filtered);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded" >
      <div className="mb-16 flex items-end justify-between">
        <h1 className="px-8 py-8 text-4xl text-white">Champions</h1>
        <div className="flex items-end py-8">
          <button
            className={`mb-2 mr-4 flex h-10 w-10 items-center justify-center bg-blue-600 rounded ${selectedLane === "Fill" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            onClick={() => handleLaneSelect("Fill")}
          >
            <img
              className="h-6 w-6"
              src="icons/lanes/icon-position-fill.png"
              alt="Top"
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-10 w-10 items-center justify-center bg-blue-600 rounded ${selectedLane === "Top" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            onClick={() => handleLaneSelect("Top")}
          >
            <img
              className="h-6 w-6"
              src="icons/lanes/icon-position-top.png"
              alt="Top"
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-10 w-10 items-center justify-center bg-blue-600 rounded ${selectedLane === "Jungle" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            onClick={() => handleLaneSelect("Jungle")}
          >
            <img
              className="h-6 w-6"
              src="icons/lanes/icon-position-jungle.png"
              alt="Jungle"
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-10 w-10 items-center justify-center bg-blue-600 rounded ${selectedLane === "Mid" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            onClick={() => handleLaneSelect("Mid")}
          >
            <img
              className="h-6 w-6"
              src="icons/lanes/icon-position-middle.png"
              alt="Mid"
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-10 w-10 items-center justify-center bg-blue-600 rounded ${selectedLane === "Adc" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            onClick={() => handleLaneSelect("Adc")}
          >
            <img
              className="h-6 w-6"
              src="icons/lanes/icon-position-bottom.png"
              alt="Adc"
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-10 w-10 items-center justify-center bg-blue-600 rounded ${selectedLane === "Support" ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            onClick={() => handleLaneSelect("Support")}
          >
            <img
              className="h-6 w-6"
              src="icons/lanes/icon-position-utility.png"
              alt="Sup"
            />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {filteredChampions.map((champion) => (
          <Link key={champion.name} href={`/champions/${champion.name}`}>
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
