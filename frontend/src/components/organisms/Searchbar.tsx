import { Text } from "../atoms/Text";
import Image from "next/image";

/**
 * Searchbar for index all pages.
 */
export function Searchbar() {
  return (
    <div className="mx-auto flex w-3/4 justify-between rounded-xl bg-slate-100 px-3 py-3.5">
      <div className="flex grow items-center space-x-4">
        <div className="h-5 w-5 shrink-0">
          <Image src="/loupe.webp" alt="loupe" width={20} height={20} />
        </div>

        <button className="rounded-md bg-blue-900 px-12 py-1">
          <h2>
            <Text
              text="EUW"
              textClass="text-white text-center text-xs font-bold"
            />
          </h2>
        </button>
        <div className="h-full border border-slate-950"></div>
        <input
          placeholder="Search Yourself or a Champion"
          className="w-full bg-transparent text-slate-950 focus:outline-none"
        ></input>
      </div>

      <button className="rounded-md bg-blue-900 px-1 py-2.5">
        <h2>
          <Text
            text="ENSI.GG"
            textClass="text-white text-center text-xs font-bold"
          />
        </h2>
      </button>
    </div>
  );
}
