import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) throw new Error("❌ MONGO_URI not set in environment variables");

let cached = global._mongoClient;

if (!cached) {
  cached = { conn: null, promise: null };
  global._mongoClient = cached;
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    cached.promise = client.connect().then((client) => {
      return {
        client,
        db: client.db("coinTracker"),
      };
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
