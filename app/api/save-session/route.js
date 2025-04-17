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
  try {
    // Get the user session data from Clerk
    const { userId } = getAuth(req); 

    // If there is no user logged in, reject the request
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: "User not authenticated" }),
        { status: 401 }
      );
    }

    const { heads, tails, wins, losses } = await req.json();

    // Connect to MongoDB and get the collection
    await client.connect();
    const db = client.db("coinTracker");
    const sessions = db.collection("sessions");

    // Insert the session data associated with the user
    const result = await sessions.insertOne({
      userId,  // Add the userId to associate the session with the user
      heads,
      tails,
      wins,
      losses,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, insertedId: result.insertedId }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
