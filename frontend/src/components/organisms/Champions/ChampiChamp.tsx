import React, { useState } from "react";
import Link from "next/link";
import championsData from "../../../../public/assets/champions.json";

const ChampiChamp = () => {
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
    <div className="">
      <div className="">
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
      <div className="grid grid-cols-1 gap-4 rounded bg-gray-800 p-4">
        <div className="col-span-1 mb-4 flex justify-between text-white">
          <div className="flex w-1/6 justify-center px-4">Rang</div>
          <div className="flex w-1/6 justify-center px-4">Champion</div>
          <div className="flex w-1/6 justify-center px-4">Winrate</div>
          <div className="flex w-1/6 justify-center px-4">Pick Rate</div>
          <div className="flex w-1/6 justify-center px-4">Ban Rate</div>
        </div>
        {filteredChampions.map((champion) => (
          <div key={champion.name} className="rounded-md bg-gray-700 shadow-md">
            <div className="grid grid-cols-5 gap-4 px-4 py-2">
              <div className="col-span-1 flex items-center justify-center text-white">
                S
              </div>
              <Link href={`/champions/${champion.name}`} passHref>
                <div className="col-span-1 flex items-center justify-center">
                  <img
                    src={champion.icon}
                    alt={champion.name}
                    className="h-10 w-10"
                  />
                </div>
              </Link>
              <div className="col-span-1 flex items-center justify-center text-white">
                50%
              </div>
              <div className="col-span-1 flex items-center justify-center text-white">
                100%
              </div>
              <div className="col-span-1 flex items-center justify-center text-white">
                0%
              </div>
            </div>
          </div>
        ))}
      </div>
      ;
    </div>
  );
};

export default ChampiChamp;
