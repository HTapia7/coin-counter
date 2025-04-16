import { useState } from "react";

export default function CoinTracker() {
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const saveSessionData = async () => {
    const response = await fetch("/api/save-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ heads, tails, wins, losses }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Data saved successfully!");
    } else {
      alert("Error saving data");
    }
  };

  return (
    <div>
      <h1>Coin Tracker</h1>
      <p>Heads: {heads}</p>
      <p>Tails: {tails}</p>
      <p>Wins: {wins}</p>
      <p>Losses: {losses}</p>

      <button onClick={saveSessionData}>Save Data</button>
    </div>
  );
}
