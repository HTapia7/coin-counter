'use client';

import { useState } from "react";
import Headicon from "@/assets/headsicon.png";
import Tailsicon from "@/assets/tailsicon.png";
import Image from "next/image";

const CoinCounter = () => {
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-8">
      <div className="bg-zinc-800 rounded-xl p-6 shadow-lg w-full max-w-3xl space-y-6">
        <div className="flex justify-around gap-6">
          {/* Heads */}
          <div
            onClick={() => setHeads(heads + 1)}
            className="flex items-center gap-4 bg-green-800 hover:bg-green-700 transition-colors rounded-lg px-6 py-4 cursor-pointer w-full justify-center"
          >
            <Image src={Headicon} alt="Heads" width={60} height={60} />
            <div className="text-center">
              <p className="text-lg text-green-300 font-semibold">Heads</p>
              <p className="text-2xl font-bold">{heads}</p>
            </div>
          </div>

          {/* Tails */}
          <div
            onClick={() => setTails(tails + 1)}
            className="flex items-center gap-4 bg-red-800 hover:bg-red-700 transition-colors rounded-lg px-6 py-4 cursor-pointer w-full justify-center"
          >
            <Image src={Tailsicon} alt="Tails" width={60} height={60} />
            <div className="text-center">
              <p className="text-lg text-red-300 font-semibold">Tails</p>
              <p className="text-2xl font-bold">{tails}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinCounter;
