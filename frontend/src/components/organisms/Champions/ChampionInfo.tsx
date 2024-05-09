import Image from "next/image";
import { ChampionDTO } from "@/components/objects/ChampionDTO";
const BASE_URL = "http://localhost:8000";

interface Props {
  championName: string;
}

/**
 * Get the data for a specific champion and return a JSX.Element.
 */
export async function ChampionInfo({ championName }: Props) {
  // Get data
  const apiURLChampion = `${BASE_URL}/champion/${championName}`;

  const apiDataChampion = await fetch(apiURLChampion, { cache: "no-store" });

  const data = (await apiDataChampion.json()) as ChampionDTO;

  return (
    <div>
      <div className="space-y-4">
        <div
          className="relative mx-auto h-96 w-3/4 rounded-t-xl bg-cover bg-no-repeat px-8 py-6"
          style={{
            backgroundImage: `url(/icons/splashes/${championName}_0.jpg)`,
          }}
        >
          <div className="absolute bottom-6 flex flex-col items-center">
            <div className="relative flex items-end space-x-8">
              <p className="absolute left-0 right-0 top-0 text-center text-white">
                {championName}
              </p>
              <Image
                src={`/icons/champions/${championName}.png`}
                alt={championName}
                width={80}
                height={80}
              />
              <div className="flex flex-row items-end text-white">
                <Image
                  src={`/icons/spells/${championName}Q.png`}
                  alt={championName}
                  width={40}
                  height={40}
                />
                <div style={{ marginRight: "8px" }} />
                <Image
                  src={`/icons/spells/${championName}W.png`}
                  alt={championName}
                  width={40}
                  height={40}
                />
                <div style={{ marginRight: "8px" }} />
                <Image
                  src={`/icons/spells/${championName}E.png`}
                  alt={championName}
                  width={40}
                  height={40}
                />
                <div style={{ marginRight: "8px" }} />
                <Image
                  src={`/icons/spells/${championName}R.png`}
                  alt={championName}
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-3/4">
        <div className="flex w-3/4 flex-col">
          <div className="relative flex h-96 flex-col justify-between rounded-bl-lg bg-[#05101F] px-8 py-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <span>
                  Winrate{" "}
                  {Math.round((data.wins * 1000) / (data.losses + data.wins)) /
                    10}{" "}
                  %
                </span>
                <span className="ml-16">Ban Rate {data.ban}</span>
                <span className="ml-16">Pick Rate {data.pick}</span>
              </div>
            </div>
            <div className="text-white">Skill Order</div>
            <div className="text-white">{championName} Build</div>
          </div>
        </div>
        <div className="flex w-1/4 flex-col">
          <div className="relative flex h-96 flex-col justify-between rounded-br-lg bg-[#05101F] px-8 py-6">
            <div className="text-white">{championName} Runes</div>
            <div className="text-white">Summoners Spells</div>
          </div>
        </div>
      </div>
    </div>
  );
}
