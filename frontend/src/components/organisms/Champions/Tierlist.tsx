import React, { useState } from "react";
import ChampionsList from "./ChampionsList";
import ChampiChamp from "./ChampiChamp";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectChoice = (choice) => {
    setSelectedChoice(choice);
    setIsOpen(false);
  };

  return (
    <div className="rounded bg-gray-900 p-4">
      <div className="mb-16 flex items-end justify-between rounded bg-black p-4 text-white">
        <h1 className="mb-2 mr-4 flex items-center font-serif text-4xl">
          <img className="ml-4 h-20 w-20" src="chibi-yasuo-r.png" alt="Yasuo" />
          Champions Tierlist
          <img className="ml-4 h-20 w-20" src="chibi-yasuo.png" alt="Yasuo" />
        </h1>

        <div className="dropdown relative py-6">
          <button
            onClick={toggleDropdown}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {selectedChoice || "Rank"}
          </button>
          <div
            className={`absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ${isOpen ? "block" : "hidden"}`}
          >
            <div
              className="dropdown-menu-item cursor-pointer px-4 py-2 text-black"
              onClick={() => selectChoice("Iron+")}
            >
              Iron+
            </div>
            <div
              className="dropdown-menu-item cursor-pointer px-4 py-2 text-black"
              onClick={() => selectChoice("Bronze+")}
            >
              Bronze+
            </div>
            <div
              className="dropdown-menu-item cursor-pointer px-4 py-2 text-black"
              onClick={() => selectChoice("Silver+")}
            >
              Silver+
            </div>
            <div
              className="dropdown-menu-item cursor-pointer px-4 py-2 text-black"
              onClick={() => selectChoice("Gold+")}
            >
              Gold+
            </div>
            <div
              className="dropdown-menu-item cursor-pointer px-4 py-2 text-black"
              onClick={() => selectChoice("Plat+")}
            >
              Plat+
            </div>
            <div
              className="dropdown-menu-item cursor-pointer px-4 py-2 text-black"
              onClick={() => selectChoice("Emerald+")}
            >
              Emerald+
            </div>
            <div
              className="dropdown-menu-item cursor-pointer px-4 py-2 text-black"
              onClick={() => selectChoice("Diamond+")}
            >
              Diamond+
            </div>
            <div
              className="dropdown-menu-item cursor-pointer px-4 py-2 text-black"
              onClick={() => selectChoice("Master+")}
            >
              Master+
            </div>
          </div>
        </div>
      </div>
      <ChampiChamp />
    </div>
  );
};

export default DropdownMenu;
