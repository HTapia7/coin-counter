import { getAuth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/connection.js"; // Adjust path as needed

export async function POST(req) {
  console.log("📥 Incoming POST request to /api/sessions");

  // Get the user session data from Clerk
  const { userId } = await getAuth(req);
  console.log("👤 Clerk userId:", userId);

  if (!userId) {
    console.log("❌ No userId found. User not authenticated.");
    return new Response(
      JSON.stringify({ success: false, error: "User not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  let data;
  try {
    data = await req.json();
    console.log("📦 Received JSON:", data);
  } catch (err) {
    console.error("❗ Invalid JSON format:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid JSON format",
        message: err.message,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { heads, tails, wins, losses } = data;

  if (
    typeof heads !== "number" ||
    typeof tails !== "number" ||
    typeof wins !== "number" ||
    typeof losses !== "number"
  ) {
    console.warn("⚠️ Invalid data types for session values:", data);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid data types for session values",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Reuse connection to MongoDB
    const { db } = await connectToDB();
    const sessions = db.collection("sessions");

    const sessionData = {
      userId,
      heads,
      tails,
      wins,
      losses,
      createdAt: new Date(),
    };

    console.log("📝 Inserting session:", sessionData);
    const result = await sessions.insertOne(sessionData);

    if (result.acknowledged) {
      console.log("✅ Session inserted with ID:", result.insertedId);
      return new Response(
        JSON.stringify({ success: true, sessionId: result.insertedId }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      console.error("❌ Insert operation was not acknowledged");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to insert session into the database",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error("🔥 Error saving session:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
