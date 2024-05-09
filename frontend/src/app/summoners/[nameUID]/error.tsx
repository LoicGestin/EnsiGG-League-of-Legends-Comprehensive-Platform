"use client";

import { Text } from "@/components/atoms/Text";
import { AppLayout } from "@/components/templates/AppLayout";

export default function Error() {
  return (
    <div>
      <AppLayout>
        <Text
          text={`No search results for the user in the Europe West region.`}
          textClass="text-lg text-center text-white"
        />
      </AppLayout>
    </div>
  );
}
