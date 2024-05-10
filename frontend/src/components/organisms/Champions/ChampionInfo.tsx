import Image from "next/image";
import { ChampionDTO } from "@/components/objects/ChampionDTO";
import ChampionStats from "./ChampionStat";
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
      <ChampionStats data={data} championName={championName} />
    </div>
  );
}
