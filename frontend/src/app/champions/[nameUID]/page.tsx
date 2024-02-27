import { Searchbar } from "@/components/organisms/Searchbar";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  return (
    <div>
      <div className="mx-auto w-3/4">
        <Searchbar />
      </div>
    </div>
  );
}
