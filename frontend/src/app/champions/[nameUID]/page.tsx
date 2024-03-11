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
      <div
        className="absolute left-0 top-0"
        style={{ left: "177px", top: "232px" }}
      >
        <div className="p-4">
          <Image
            src={`/icons/champions/${nameUID}.png`}
            alt={nameUID}
            width={81}
            height={89}
          />
        </div>
      </div>
    </AppLayout>
  );
}
