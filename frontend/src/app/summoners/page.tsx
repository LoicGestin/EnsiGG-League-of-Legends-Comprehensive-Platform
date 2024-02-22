import { SummonersLayout } from "@/components/templates/SummonersLayout";
import Image from "next/image";
import Link from 'next/link';
export default function Page() {
  return (
    <div>
      <SummonersLayout>
        <div>
          <span>This is the home page</span>
        </div>
      </SummonersLayout>
    </div>
  );
}
