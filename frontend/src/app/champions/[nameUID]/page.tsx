import { Searchbar } from "@/components/organisms/Searchbar";
import { ChampionsLayout } from "@/components/templates/ChampionsLayout";
import Image from "next/image";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  return (
    <div>
      <div className="mx-auto w-3/4">
        <Image src={`/icons/champions/${nameUID}.png`} alt={nameUID} width={40} height={40}/>
      </div>
    </div>
  );
}
