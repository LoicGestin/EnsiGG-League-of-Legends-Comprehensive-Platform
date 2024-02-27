import Link from "next/link";
import { Text } from "../atoms/Text";
import { LabelImage } from "../molecules/LabelImage";

/**
 * Sidebar for all pages.
 */
export function Sidebar() {
  return (
    <nav className="flex h-screen flex-col items-center space-y-5 bg-slate-800 px-6 py-5">
      <Link href="/" className="w-full rounded-md bg-slate-700 py-2.5">
        <h2>
          <Text
            text="ENSI.GG"
            textClass="text-white text-center text-xs font-bold"
          />
        </h2>
      </Link>
      <div className="w-14 border border-slate-700"></div>
      <div className="flex flex-col space-y-5">
        <Link href="/champions">
          <LabelImage
            text="Champions"
            textClass="text-white text-center text-xs"
            imageClass="bg-slate-700 p-2 rounded-xl"
            path="/community.webp"
            alt="Champions"
            width={40}
            height={40}
          />
        </Link>
        <Link href="/">
          <LabelImage
            text="Tier List"
            textClass="text-white text-center text-xs"
            imageClass="bg-slate-700 p-2 rounded-xl"
            path="/tierlist.webp"
            alt="TierList"
            width={40}
            height={40}
          />
        </Link>
        <Link href="/">
          <LabelImage
            text="Draft"
            textClass="text-white text-center text-xs"
            imageClass="bg-slate-700 p-2 rounded-xl"
            path="/thinking.webp"
            alt="Draft"
            width={40}
            height={40}
          />
        </Link>
      </div>
    </nav>
  );
}
