import mongoose from 'mongoose';

let isConnected = false;

const connectionToDatabase = async () => {
  if (isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

export default connectionToDatabase;
