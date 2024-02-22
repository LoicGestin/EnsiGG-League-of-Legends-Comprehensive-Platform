import { Searchbar } from "@/components/organisms/Searchbar";
import { AppLayout } from "@/components/templates/AppLayout";

export default function Page() {
  return (
    <div>
      <AppLayout>
        <Searchbar />
      </AppLayout>
    </div>
  );
}
