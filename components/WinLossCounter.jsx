"use client";
import { useState } from "react";

const WinLossCounter = () => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState({ wins: 0, losses: 0 });

  const handleEdit = () => {
    setEditValue({ wins, losses });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editValue.wins >= 0 && editValue.losses >= 0) {
      setWins(Number(editValue.wins));
      setLosses(Number(editValue.losses));
      setIsEditing(false);
    }
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setEditValue((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  const handleReset = () => {
    setWins(0);
    setLosses(0);
  };

  return (
    <div className="min-h-full bg-zinc-800 text-white p-6 space-y-6 flex flex-col items-center justify-between">
      <div className="flex gap-8 w-full justify-center">
        {/* Wins Section */}
        <div
          onClick={() => {
            if (!isEditing) setWins(wins + 1);
          }}
          className="bg-green-700 hover:bg-green-600 transition-colors rounded-lg px-6 py-4 cursor-pointer text-center w-full flex items-center justify-between"
        >
          <div className="text-left">
            <p className="text-lg text-green-200 font-semibold">Wins</p>
            <p className="text-3xl font-bold">{wins}</p>
          </div>
        </div>

        {/* Losses Section */}
        <div
          onClick={() => {
            if (!isEditing) setLosses(losses + 1);
          }}
          className="bg-red-700 hover:bg-red-600 transition-colors rounded-lg px-6 py-4 cursor-pointer text-center w-full flex items-center justify-between"
        >
          <div className="text-left">
            <p className="text-lg text-red-200 font-semibold">Losses</p>
            <p className="text-3xl font-bold">{losses}</p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-4 justify-center mt-4">
          <input
            type="number"
            value={editValue.wins}
            onChange={(e) => handleInputChange(e, "wins")}
            className="text-lg p-2 rounded-md bg-zinc-700 text-white"
          />
          <input
            type="number"
            value={editValue.losses}
            onChange={(e) => handleInputChange(e, "losses")}
            className="text-lg p-2 rounded-md bg-zinc-700 text-white"
          />
          <button
            onClick={handleSaveEdit}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-400"
          >
            Save
          </button>
        </div>
      )}

      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-yellow-400 px-6 py-2 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-400 px-6 py-2 rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WinLossCounter;
