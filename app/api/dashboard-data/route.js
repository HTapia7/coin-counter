import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function GET() {
  try {
    await client.connect(); // ensure connection
    const db = client.db("coinTracker");
    const sessions = db.collection("sessions");

    // Fetch and sort sessions by createdAt in descending order
    const sessionData = await sessions
      .find()
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
    await client.close(); // close connection
  }
}
