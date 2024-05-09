import { Searchbar } from "@/components/organisms/Searchbar";
import { SingleChampionLayout } from "@/components/templates/SingleChampLayout";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  return (
    <div>
      <SingleChampionLayout championName={nameUID}>
        <div className="mx-auto w-3/4">
          <Searchbar />
        </div>
      </SingleChampionLayout>
    </div>
  );
}
