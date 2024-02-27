import { Searchbar } from "@/components/organisms/Searchbar";
import { ChampionsLayout } from "@/components/templates/ChampionsLayout";

export default function Page() {
  return (
    <div>
      <ChampionsLayout>
        <div className="mx-auto w-3/4">
          <Searchbar />
        </div>
      </ChampionsLayout>
    </div>
  );
}
