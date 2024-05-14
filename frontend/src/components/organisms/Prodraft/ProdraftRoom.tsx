import SideChamp from "@/components/organisms/Prodraft/SideChamp";
import HeaderPro from "@/components/organisms/Prodraft/HeaderPro";
import Chatbox from "@/components/organisms/Prodraft/Chatbox";
import ChampGrid from "@/components/organisms/Prodraft/ChampGrid";
import SideBan from "@/components/organisms/Prodraft/SideBan";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

export default function ProdraftRoom() {
  const [selectedChampionsBlue, setSelectedChampionsBlue] = useState<string[]>(
    [],
  );
  const [bannedChampionsBlue, setBannedChampionsBlue] = useState<string[]>([]);
  const [selectedChampionsRed, setSelectedChampionsRed] = useState<string[]>(
    [],
  );
  const [bannedChampionsRed, setBannedChampionsRed] = useState<string[]>([]);
  const [stateChangedByClick, setStateChangedByClick] = useState(false);
  const [actionQueue, setActionQueue] = useState<number[]>([
    3, 4, 3, 4, 3, 4, 1, 2, 2, 1, 1, 2, 4, 3, 4, 3, 2, 1, 1, 2,
  ]);


  const socketRef = useRef<Socket | null>(null);
  let urlPath = '';
  let isBlue = false;
  let isRed = false;


  if (typeof window !== 'undefined') {
    urlPath = window.location.pathname;
    isBlue = urlPath.endsWith("_blue");
    isRed = urlPath.endsWith("_red");
  }

  const roomFromUrl = urlPath.substring(urlPath.lastIndexOf("/") + 1);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("state_change", (data) => {
      const {
        selectedChampionsBlue,
        bannedChampionsBlue,
        selectedChampionsRed,
        bannedChampionsRed,
        actionQueue,
        timeLeft,
      } = data;

      setSelectedChampionsBlue(selectedChampionsBlue);
      setBannedChampionsBlue(bannedChampionsBlue);
      setSelectedChampionsRed(selectedChampionsRed);
      setBannedChampionsRed(bannedChampionsRed);
      setActionQueue(actionQueue);

    });

    socketRef.current.on("initial_state", (data) => {
      setSelectedChampionsBlue(data.selectedChampionsBlue);
      setBannedChampionsBlue(data.bannedChampionsBlue);
      setSelectedChampionsRed(data.selectedChampionsRed);
      setBannedChampionsRed(data.bannedChampionsRed);
      setActionQueue(data.actionQueue);

    });

    socketRef.current?.emit("join_room", roomFromUrl);
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);



  const handleTimeOut = () => {
    if (actionQueue.length > 0) {
      const action = actionQueue.shift();
      switch (action) {
        case 1: // selectedChampionsBlue
          setSelectedChampionsBlue([...selectedChampionsBlue, "croix"]);
          break;
        case 2: // selectedChampionsRed
          setSelectedChampionsRed([...selectedChampionsRed, "croix"]);
          break;
        case 3: // bannedChampionsBlue
          setBannedChampionsBlue([...bannedChampionsBlue, "croix"]);
          break;
        case 4: // bannedChampionsRed
          setBannedChampionsRed([...bannedChampionsRed, "croix"]);
          break;
        default:
      }
      setActionQueue([...actionQueue]); // Update the queue
    }
  };
  const emitStateChanges = () => {
    socketRef.current?.emit(
      "state_change",
      {
        selectedChampionsBlue,
        bannedChampionsBlue,
        selectedChampionsRed,
        bannedChampionsRed,
        actionQueue,

      },
      roomFromUrl,
    );
  };

  const handleChampionClick = (name: string) => {
    if (actionQueue.length === 0) return; // No more actions to process

    if (
      selectedChampionsBlue.includes(name) ||
      bannedChampionsBlue.includes(name) ||
      selectedChampionsRed.includes(name) ||
      bannedChampionsRed.includes(name)
    ) {
      return;
    }

    if ((isBlue || isRed) && !stateChangedByClick) {
      if (
        (isBlue && actionQueue[0] === 1) || //  Blue picks champ
        (isRed && actionQueue[0] === 2) || //  Red picks champ
        (isBlue && actionQueue[0] === 3) || // Blue bans champ
        (isRed && actionQueue[0] === 4) // Red bans champ
      ) {
        const action = actionQueue.shift();

        switch (action) {
          case 1: // selectedChampionsBlue
            setSelectedChampionsBlue([...selectedChampionsBlue, name]);
            break;
          case 2: // selectedChampionsRed
            setSelectedChampionsRed([...selectedChampionsRed, name]);
            break;
          case 3: // bannedChampionsBlue
            setBannedChampionsBlue([...bannedChampionsBlue, name]);
            break;
          case 4: // bannedChampionsRed
            setBannedChampionsRed([...bannedChampionsRed, name]);
            break;
          default:
        }
        setActionQueue([...actionQueue]);
        setStateChangedByClick(true);

      }
    }
  };

  useEffect(() => {
    if (selectedChampionsRed.length === 5) {
      //clearInterval(timerId);

    }
  }, [selectedChampionsRed.length]);

  useEffect(() => {
    if (stateChangedByClick) {
      emitStateChanges();
      setStateChangedByClick(false);
    }
  }, [stateChangedByClick]);

  return (
    <div className="flex flex-col items-center  justify-between bg-blue-900 text-white">
      <HeaderPro leftTitle="Equipe 1" rightTitle="Equipe 2" ></HeaderPro>
      <div className={"flex h-[63vh] w-full justify-between"}>
        <SideChamp championNames={selectedChampionsBlue} />
        <ChampGrid
          onChampionClick={handleChampionClick}
          selectedChampionsBlue={selectedChampionsBlue}
          selectedChampionsRed={selectedChampionsRed}
          bannedChampionsBlue={bannedChampionsBlue}
          bannedChampionsRed={bannedChampionsRed}
        />
        <SideChamp championNames={selectedChampionsRed} />
      </div>
      <div className={"flex h-[24vh] w-full justify-between"}>
        <SideBan championNames={bannedChampionsBlue} />
        <Chatbox/>
        <SideBan championNames={bannedChampionsRed} />
      </div>
    </div>
  );
}
