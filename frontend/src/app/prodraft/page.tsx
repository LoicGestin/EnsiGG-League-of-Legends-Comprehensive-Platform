import { Searchbar } from "@/components/organisms/Searchbar";
import { ProdraftLayout } from "@/components/templates/ProdraftLayout";

import { AppLayout } from "@/components/templates/AppLayout";

export default function Page() {
  return (
    <div>
      <AppLayout>
        <div className="mx-auto w-3/4">
          <Searchbar />
        </div>
        <div className="mx-auto mt-4 flex w-3/4 flex-col space-y-8">
          <ProdraftLayout />
        </div>
      </AppLayout>
    </div>
  );
}
