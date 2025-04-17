import { useState, useEffect } from "react";
import { useAuth , userId } from "@clerk/nextjs";
import toast from "react-hot-toast"; // Import the toast notification

export default function CoinTracker() {
  const { isLoaded, userId } = useAuth(); // Get user authentication state from Clerk
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    if (!isLoaded) return; // Ensure the auth state is loaded before checking the user
  }, [isLoaded]);

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
      toast.success("Data saved successfully!");  // Success toast
    } else {
      if (data.error === "User not authenticated") {
        toast.error("You must be logged in to save data!");  // Error toast for not logged in
      } else {
        toast.error("Error saving data");  // General error toast
      }
    }
  };

  return (
    <div>
      <h1>Coin Tracker</h1>
      <p>Heads: {heads}</p>
      <p>Tails: {tails}</p>
      <p>Wins: {wins}</p>
      <p>Losses: {losses}</p>

      {/* Conditionally render the Save Data button based on user authentication */}
      {isLoaded && userId ? (
        <button onClick={saveSessionData}>Save Data</button>
      ) : (
        <p>You must be logged in to save data.</p>
      )}
    </div>
  );
}
