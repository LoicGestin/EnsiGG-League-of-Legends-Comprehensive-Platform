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
    <div className="rounded bg-gray-900 p-4">
      <div className="mb-16 flex items-end justify-between rounded bg-black p-4 text-white">
        <h1 className="mb-2 mr-4 flex items-center font-serif text-4xl">
          <img className="ml-4 h-20 w-20" src="chibi-yasuo-r.png" alt="Yasuo" />
          Champions
          <img className="ml-4 h-20 w-20" src="chibi-yasuo.png" alt="Yasuo" />
        </h1>

        <div className="mb-4 flex items-end">
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Fill" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => handleLaneSelect("Fill")}
          >
            <img
              className="h-6 w-6"
              src="icons/lanes/icon-position-fill.png"
              alt="Fill"
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Top" ? "bg-gray-800" : "hover:bg-gray-800"
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
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Jungle" ? "bg-gray-800" : "hover:bg-gray-800"
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
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Mid" ? "bg-gray-800" : "hover:bg-gray-800"
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
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Adc" ? "bg-gray-800" : "hover:bg-gray-800"
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
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Support" ? "bg-gray-800" : "hover:bg-gray-800"
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
      <div className="grid grid-cols-6 gap-4 rounded bg-gray-800 p-4">
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
