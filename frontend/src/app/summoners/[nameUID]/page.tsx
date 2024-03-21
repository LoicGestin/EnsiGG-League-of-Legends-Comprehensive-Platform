import { Searchbar } from "@/components/organisms/Searchbar";
import { SummonersLayout } from "@/components/templates/SummonersLayout";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  return (
    <div>
      <SummonersLayout name={nameUID}>
        <div className="mx-auto w-3/4">
          <Searchbar />
        </div>
      </SummonersLayout>
    </div>
  );
}
