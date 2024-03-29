"use client";
import DropdownMenu from "@/components/organisms/Champions/Tierlist";
import { Searchbar } from "@/components/organisms/Searchbar";
import { AppLayout } from "@/components/templates/AppLayout";

export default function Page() {
  return (
    <div>
      <AppLayout>
        <div className="mx-auto w-3/4">
          <Searchbar />
        </div>
        <div className="mx-auto mt-4 flex w-3/4 flex-col space-y-8">
          <DropdownMenu />
        </div>
      </AppLayout>
    </div>
  );
}
