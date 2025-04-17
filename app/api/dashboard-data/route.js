import { MongoClient, ServerApiVersion } from "mongodb";
import { getAuth } from "@clerk/nextjs/server";  // Import Clerk's getAuth function to get the userId

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function GET(req) {
  try {
    // Get the user session data from Clerk
    const { userId } = getAuth(req);

    // If no userId is found (not logged in), reject the request
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: "User not authenticated" }),
        { status: 401 }
      );
    }

    await client.connect(); // Ensure connection
    const db = client.db("coinTracker");
    const sessions = db.collection("sessions");

    // Fetch and sort sessions by createdAt in descending order, filtering by userId
    const sessionData = await sessions
      .find({ userId }) // Filter by userId to get sessions for the logged-in user
      .sort({ createdAt: -1 }) // -1 sorts in descending order
      .toArray();

    // Add the day of the week to each session
    const sessionDataWithDay = sessionData.map(session => {
      const dayOfWeek = new Date(session.createdAt).toLocaleString('en-US', { weekday: 'long' });
      return { ...session, dayOfWeek };
    });

    return new Response(JSON.stringify(sessionDataWithDay), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await client.close(); // Close connection
  }
}
