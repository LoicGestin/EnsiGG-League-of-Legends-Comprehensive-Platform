import { Searchbar } from "@/components/organisms/Searchbar";
import { AppLayout } from "@/components/templates/AppLayout";
import Image from "next/image";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  const backgroundImageStyle = {
    backgroundImage: `url(/icons/splashes/${nameUID}_0.jpg)`,
    backgroundSize: "cover",
  };

  return (
    <AppLayout>
      <div className="flex-row">
        <Searchbar />
        <div
          className="flex items-center justify-center rounded-lg bg-gray-900   py-64"
          style={backgroundImageStyle}
        >
          <div className="relative right-60 top-60">
            <Image
              src={`/icons/champions/${nameUID}.png`}
              alt={nameUID}
              width={81}
              height={80}
            />
            <div className="z-10 text-xl text-white">{nameUID}</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
