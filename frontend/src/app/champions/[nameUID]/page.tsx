import { Searchbar } from "@/components/organisms/Searchbar";
import { Sidebar } from "@/components/organisms/Sidebar";
import { AppLayout } from "@/components/templates/AppLayout";
import { ChampionsLayout } from "@/components/templates/ChampionsLayout";
import Image from "next/image";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  return (
    <AppLayout>
      <Searchbar />
      <div className="absolute left-0 top-0" style={{ left: "177px", top: "232px" }}>
        <div className="p-4 flex items-center text-white">
          <div className="mr-4 mt-8">
            <Image src={`/icons/champions/${nameUID}.png`} alt={nameUID} width={81} height={89} />
          </div>
          <div className="text-xl">{nameUID}</div>
        </div>
        <div className="bg-gray-900 p-4 rounded" style={{ left: "147px", top: "366px", width: "1176px", height: "623px" }} >
        </div>
      </div>
    </AppLayout>
  );
}
