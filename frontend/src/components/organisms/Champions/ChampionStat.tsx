import React from "react";

const ChampionStats = ({ data, championName }) => {
  const winratePercentage =
    Math.round((data.wins * 1000) / (data.losses + data.wins)) / 10;
  const pickRate = data.pick;

  return (
    <div className="mx-auto flex w-3/4">
      <div className="flex w-1/2 flex-col">
        <div className="relative flex h-96 flex-col justify-center rounded-l-lg bg-[#05101F] px-8 py-6 text-white">
          <div className="flex items-center justify-center">
            <span className="text-5xl font-semibold text-white">
              {winratePercentage}%
            </span>
          </div>
          <div className="mt-4 text-center text-white">Winrate</div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col">
        <div className="relative flex h-96 flex-col justify-center rounded-r-lg bg-[#05101F] px-8 py-6 text-white">
          <div className="flex items-center justify-center">
            <span className="text-5xl font-semibold text-white">
              {pickRate}
            </span>
          </div>
          <div className="mt-4 text-center text-white">Pick Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ChampionStats;
