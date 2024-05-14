import React from "react";

interface SideChampProps {
    championNames: string[];
}
export default function SideBan({championNames}: SideChampProps){
    const formatChampionName = (name: string) => {
        return name.replace(/['\s]/g, ''); // Remove apostrophes and spaces
    };
    return(
      <div className="h-full flex  w-[23%] rounded-md  bg-slate-500">
          {championNames.map((name, index) => (
              <img key={index} className={" h-[6vh]"} src={"../icons/champions/" + formatChampionName(name) + ".png"} alt={name} />
          ))}
          {}
      </div>
    );
}