import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function DELETE(req, { params }) {
  // Ensure params is awaited
  const { id } = await params;  // Await the params before using it

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "No ID provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await client.connect(); // Ensure connection
    const db = client.db("coinTracker");
    const sessions = db.collection("sessions");

    // Ensure that the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid ID format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const objectId = new ObjectId(id);

    // Delete the document with the specific ID
    const result = await sessions.deleteOne({ _id: objectId });

    // If no document is deleted, return an error
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Session not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, deletedCount: result.deletedCount }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error deleting session:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close(); // Ensure the connection is closed
  }
}
