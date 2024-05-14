import React, { useState } from "react";
import Link from "next/link";
import championsData from "../../../../public/assets/champions.json";
import Image from "next/image";

/**
 * Display role position and champions that can be played as the role.
 */

const ChampionsList = () => {
  const [selectedLane, setSelectedLane] = useState("Fill");
  const [filteredChampions, setFilteredChampions] = useState(championsData);

  const handleLaneSelect = (lane: any) => {
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
          <Image
            className="ml-4 h-20 w-20"
            src="/chibi-yasuo-r.png"
            alt="Yasuo"
            width={80}
            height={80}
          />
          Champions
          <Image
            className="ml-4 h-20 w-20"
            src="/chibi-yasuo.png"
            alt="Yasuo"
            width={80}
            height={80}
          />
        </h1>

        <div className="mb-4 flex items-end">
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Fill" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => handleLaneSelect("Fill")}
          >
            <Image
              src="/icons/lanes/icon-position-fill.png"
              alt="Fill"
              height={24}
              width={24}
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Top" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => handleLaneSelect("Top")}
          >
            <Image
              src="/icons/lanes/icon-position-top.png"
              alt="Top"
              height={24}
              width={24}
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Jungle" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => handleLaneSelect("Jungle")}
          >
            <Image
              src="/icons/lanes/icon-position-jungle.png"
              alt="Jungle"
              height={24}
              width={24}
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Mid" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => handleLaneSelect("Mid")}
          >
            <Image
              src="/icons/lanes/icon-position-middle.png"
              alt="Mid"
              height={24}
              width={24}
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Adc" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => handleLaneSelect("Adc")}
          >
            <Image
              src="/icons/lanes/icon-position-bottom.png"
              alt="Adc"
              height={24}
              width={24}
            />
          </button>
          <button
            className={`mb-2 mr-4 flex h-14 w-14 items-center justify-center rounded bg-black ${
              selectedLane === "Support" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
            onClick={() => handleLaneSelect("Support")}
          >
            <Image
              src="/icons/lanes/icon-position-utility.png"
              alt="Adc"
              height={24}
              width={24}
            />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 rounded bg-gray-800 p-4">
        {filteredChampions.map((champion) => (
          <Link key={champion.name} href={`/champions/${champion.name}`}>
            <div className="flex flex-col items-center text-white">
              <Image
                src={champion.icon}
                alt={champion.name}
                width={104}
                height={104}
              />
              <div>{champion.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChampionsList;
