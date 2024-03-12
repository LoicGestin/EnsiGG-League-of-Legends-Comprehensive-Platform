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
          <div className="absolute bottom-6 flex flex-col items-center">
            <div className="relative flex items-end space-x-8">
              <p className="absolute left-0 right-0 top-0 text-center text-white">
                {nameUID}
              </p>
              <Image
                src={`/icons/champions/${nameUID}.png`}
                alt={nameUID}
                width={80}
                height={80}
              />
              <div className="flex flex-row items-end text-white">
                <Image
                  src={`/icons/spells/${nameUID}Q.png`}
                  alt={nameUID}
                  width={40}
                  height={40}
                />
                <div style={{ marginRight: "8px" }} />
                <Image
                  src={`/icons/spells/${nameUID}W.png`}
                  alt={nameUID}
                  width={40}
                  height={40}
                />
                <div style={{ marginRight: "8px" }} />
                <Image
                  src={`/icons/spells/${nameUID}E.png`}
                  alt={nameUID}
                  width={40}
                  height={40}
                />
                <div style={{ marginRight: "8px" }} />
                <Image
                  src={`/icons/spells/${nameUID}R.png`}
                  alt={nameUID}
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
          <div className="relative flex h-96 flex-col justify-between  bg-[#05101F] px-8 py-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <span>Winrate</span>
                <span className="ml-16">Ban Rate</span>
                <span className="ml-16">Pick Rate</span>
              </div>
            </div>
            <div className="text-white">Skill Order</div>
            <div className="text-white">{nameUID} Build</div>
          </div>
        </div>
        <div className="flex w-1/4 flex-col">
          <div className="relative flex h-96 flex-col justify-between rounded-t-xl bg-[#05101F] px-8 py-6">
            <div className="text-white">{nameUID} Runes</div>
            <div className="text-white">Summoners Spells</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
