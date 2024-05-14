"use client";

import React, { useEffect, useState } from "react";

export function ProdraftLink() {
  const [blueLink, setBlueLink] = useState("");
  const [redLink, setRedLink] = useState("");
  const [randomLink, setRandomLink] = useState("");

  useEffect(() => {
    generateLinks();
  }, []);

  const generateLinks = () => {
    const randomString = generateRandomString(20);
    const blue = `http://localhost:3001/prodraft/${randomString}_blue`;
    const red = `http://localhost:3001/prodraft/${randomString}_red`;
    const random = `http://localhost:3001/prodraft/${randomString}`;

    setBlueLink(blue);
    setRedLink(red);
    setRandomLink(random);
  };

  const generateRandomString = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const copyAllLinks = () => {
    const allLinks = blueLink + "\n" + redLink + "\n" + randomLink;
    navigator.clipboard.writeText(allLinks);
  };

  return (
    <div className="w-1075 flex flex-col items-center justify-center space-y-6 bg-gray-950 text-white">
      <div className="flex items-center">
        <img className="ml-4 h-20 w-20" src="chibi-yasuo-r.png" alt="Yasuo" />
        <h1 className="mb-4 ml-4 text-3xl">EnsiProDraft</h1>
        <img className="ml-4 h-20 w-20" src="chibi-yasuo.png" alt="Yasuo" />
      </div>
      <div className="links-in-my-bucket">
        <div
          className="link-rect1 mb-8 rounded p-4 text-center"
          style={{ backgroundColor: "#2E2782" }}
        >
          <h2 className="font-bold text-white">Blue Picks & Bans Link</h2>
          <a href={blueLink} className="text-white">
            {blueLink}
          </a>
        </div>
        <div
          className="link-rect2 mb-8 rounded p-4 text-center"
          style={{ backgroundColor: "#7E2929" }}
        >
          <h2 className="font-bold text-white">Red Picks & Bans Link</h2>
          <a href={redLink} className="text-white">
            {redLink}
          </a>
        </div>
        <div
          className="link-rect3 mb-8 rounded p-4 text-center"
          style={{ backgroundColor: "#0F223B" }}
        >
          <h2 className="font-bold text-white">Spectator Picks & Bans Link</h2>
          <a href={randomLink} className="text-white">
            {randomLink}
          </a>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={copyAllLinks}
          className="mr-2 rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-900"
        >
          Copy All
        </button>
        <button
          onClick={generateLinks}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        >
          Refresh Links
        </button>
      </div>
    </div>
  );
}
