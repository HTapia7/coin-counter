import { MongoClient, ServerApiVersion } from "mongodb";
import { getAuth } from "@clerk/nextjs/server";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function POST(req) {
  // Get the user session data from Clerk
  const { userId } = getAuth(req);

  // If no userId is found (user not authenticated), reject the request
  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, error: "User not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Parse the incoming request body
  let data;
  try {
    data = await req.json();
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON format" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { heads, tails, wins, losses } = data;

  if (typeof heads !== "number" || typeof tails !== "number" || typeof wins !== "number" || typeof losses !== "number") {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid data types for session values" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await client.connect(); // Ensure connection
    const db = client.db("coinTracker");
    const sessions = db.collection("sessions");

    // Create the session document
    const sessionData = {
      userId,
      heads,
      tails,
      wins,
      losses,
      createdAt: new Date(),
    };

    // Insert the session into the database
    const result = await sessions.insertOne(sessionData);

    if (result.acknowledged) {
      return new Response(
        JSON.stringify({ success: true, sessionId: result.insertedId }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to insert session into the database" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error("Error saving session:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close(); // Ensure the connection is closed
  }
}
