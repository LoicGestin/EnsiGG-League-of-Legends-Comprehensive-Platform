import React from "react";

interface SideChampProps {
    championNames: string[];
}

export default function SideChamp({ championNames } : SideChampProps)  {
    const formatChampionName = (name: string) => {
        return name.replace(/['\s]/g, ''); // Remove apostrophes and spaces
    };
    return (
        <div className="h-full flex flex-col w-[23%] rounded-md bg-slate-800">
            {championNames.map((name, index) => (
                <div
                    key={index}
                    className="w-full h-[20%] bg-slate-200 flex items-center justify-center bg-no-repeat  bg-cover"
                    style={{ backgroundImage: `url(/icons/splashes/${formatChampionName(name)}_0.jpg)` }}
                ></div>
            ))}
            {}

        </div>
    );
};

