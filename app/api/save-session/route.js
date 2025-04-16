import { MongoClient, ServerApiVersion } from "mongodb";

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
    const { heads, tails, wins, losses } = await req.json();

    await client.connect();
    const db = client.db("coinTracker");
    const sessions = db.collection("sessions");

    const result = await sessions.insertOne({
      heads,
      tails,
      wins,
      losses,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, insertedId: result.insertedId }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
