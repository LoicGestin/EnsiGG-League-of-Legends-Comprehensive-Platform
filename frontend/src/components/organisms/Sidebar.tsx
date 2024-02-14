import Link from "next/link";
import { Text } from "../atoms/Text";
import { LabelImage } from "../molecules/LabelImage";

export function Sidebar() {
  return (
    <div className="mt-5 flex flex-col">
      <h2>
        <Text
          text="ENSI.GG"
          textClass="text-white text-center text-xs font-bold"
        />
      </h2>
      <div className="flex flex-col">
        <Link href="/">
          <LabelImage
            text="Champions"
            textClass=""
            path=""
            alt=""
            width={40}
            height={40}
          />
        </Link>
        <Link href="/">
          <LabelImage
            text="Tier List"
            textClass=""
            path=""
            alt=""
            width={40}
            height={40}
          />
        </Link>
        <Link href="/">
          <LabelImage
            text="Draft"
            textClass=""
            path=""
            alt=""
            width={40}
            height={40}
          />
        </Link>
      </div>
    </div>
  );
}
