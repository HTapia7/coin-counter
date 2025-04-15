"use client";

import CoinCounter from "@/components/CoinCounter.jsx";
import WinLossCounter from "@/components/WinLossCounter.jsx";
import Navbar from "@/components/Navbar.jsx"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar/>
      {/* Main content */}
      <div className="flex justify-between p-8">
        {/* Coin Counter Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg w-[48%]">
          <CoinCounter />
        </div>

        {/* Win/Loss Counter Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg w-[48%]">
          <WinLossCounter />
        </div>
      </div>
    </div>
  );
}
