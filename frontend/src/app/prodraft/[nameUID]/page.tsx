"use client"
import { Searchbar } from "@/components/organisms/Searchbar";
import { AppLayout } from "@/components/templates/AppLayout";
import Image from "next/image";
import ProdraftRoom from "@/components/organisms/Prodraft/ProdraftRoom";
import {ProdraftRoomLayout} from "@/components/templates/ProdrafRoomtLayout";

export default function Page({
  params: { nameUID },
}: {
  params: { nameUID: string };
}) {
  return (
      <div>
           <ProdraftRoomLayout/>
      </div>
  );
}
