import { SummonersLayout } from "@/components/templates/SummonersLayout";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  return (
    <div>
      <SummonersLayout name={nameUID}>
        <div>
          <span>This is the home page</span>
        </div>
      </SummonersLayout>
    </div>
  );
}
