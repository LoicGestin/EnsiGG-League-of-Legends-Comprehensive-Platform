import { Searchbar } from "@/components/organisms/Searchbar";
import { AppLayout } from "@/components/templates/AppLayout";
import Image from "next/image";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  return (
    <AppLayout>
      <div className="space-y-4">
        <Searchbar />
        <div
          className="relative mx-auto h-96 w-3/4 rounded-t-xl bg-no-repeat px-8 py-6"
          style={{ backgroundImage: `url(/icons/splashes/${nameUID}_0.jpg)` }}
        >
          <div className="absolute bottom-6 flex space-x-8">
            <Image
              src={`/icons/champions/${nameUID}.png`}
              alt={nameUID}
              width={80}
              height={80}
            />
            <div className="flex flex-col justify-between">
              <div className="text-white">{nameUID}</div>
              {/** Mettre les spells */}
              <div className="flex">{nameUID}</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
