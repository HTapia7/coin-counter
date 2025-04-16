"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CoinCounter from "@/components/CoinCounter.jsx";
import WinLossCounter from "@/components/WinLossCounter.jsx";
import 'react-toastify/dist/ReactToastify.css'; 


export default function Home() {
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/save-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ heads, tails, wins, losses }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("Saved successfully:", data.insertedId);

        // Reset counters to 0 after successful save
        setHeads(0);
        setTails(0);
        setWins(0);
        setLosses(0);

        // Show success toast
        toast.success("Successful! Check Dashboard!!");
      } else {
        console.error("Save failed:", data.error);
        // Show error toast
        toast.error("Failed to save session.");
      }
    } catch (err) {
      console.error("Error saving:", err);
      // Show error toast
      toast.error("Error saving session.");
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Save Button Section */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>

      {/* Main Counters Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Coin Counter Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg w-full lg:w-[48%]">
          <CoinCounter
            heads={heads}
            setHeads={setHeads}
            tails={tails}
            setTails={setTails}
          />
        </div>

        {/* Win/Loss Counter Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg w-full lg:w-[48%]">
          <WinLossCounter
            wins={wins}
            setWins={setWins}
            losses={losses}
            setLosses={setLosses}
          />
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={true} 
          newestOnTop={true} 
          rtl={false} 
          pauseOnFocusLoss={true} 
          draggable={true} 
          pauseOnHover={true}
/>

    </div>
  );
}
