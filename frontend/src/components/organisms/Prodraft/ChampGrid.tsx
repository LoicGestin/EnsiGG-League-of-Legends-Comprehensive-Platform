import React, { useState } from "react";
import championsData from "../../../../public/assets/champions.json";

interface ChampionsListProps {
  onChampionClick: (name: string) => void;
  selectedChampionsBlue: string[];
  selectedChampionsRed: string[];
  bannedChampionsBlue: string[];
  bannedChampionsRed: string[];
}

export default function ChampGrid({
  onChampionClick,
  selectedChampionsBlue,
  bannedChampionsBlue,
  selectedChampionsRed,
  bannedChampionsRed,
}: ChampionsListProps) {
  const [selectedLane, setSelectedLane] = useState("Fill");
  const [filteredChampions, setFilteredChampions] = useState(championsData);

  const isInAnyList = (name: string) => {
    return (
      selectedChampionsBlue.includes(name) ||
      bannedChampionsBlue.includes(name) ||
      selectedChampionsRed.includes(name) ||
      bannedChampionsRed.includes(name)
    );
  };

  const handleLaneSelect = (lane: string) => {
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
    <div className="w-[54%] rounded  bg-gray-900">
      <div className=" flex items-end justify-between rounded bg-black pb-4 text-white">
        <div className="flex items-end">
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Fill" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => handleLaneSelect("Fill")}
          >
            <img
              className="h-12 w-12"
              src="../icons/lanes/icon-position-fill.png"
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
              className="h-12 w-12"
              src="../icons/lanes/icon-position-top.png"
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
              className="h-12 w-12"
              src="../icons/lanes/icon-position-jungle.png"
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
              className="h-12 w-12"
              src="../icons/lanes/icon-position-middle.png"
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
              className="h-12 w-12"
              src="../icons/lanes/icon-position-bottom.png"
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
              className="h-12 w-12"
              src="../icons/lanes/icon-position-utility.png"
              alt="Sup"
            />
          </button>
        </div>
      </div>
      <div
        className="grid grid-cols-6 gap-4 overflow-y-auto p-4"
        style={{ maxHeight: "54vh" }}
      >
        {filteredChampions.map((champion) => (
          <div
            key={champion.name}
            onClick={() => onChampionClick(champion.name)} // Call the passed function with champion name
            className="flex cursor-pointer flex-col items-center text-white"
          >
            <div
              className={`flex flex-col items-center text-white ${isInAnyList(champion.name) ? "opacity-15" : ""} `}
            >
              <img
                className={" h-[8vh]"}
                src={champion.icon}
                alt={champion.name}
              />
              <div>{champion.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
