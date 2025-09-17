import mongoose from "mongoose";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

export const connectionStr = `mongodb+srv://${username}:${password}@cluster0.oftlqnj.mongodb.net/jobPortal?retryWrites=true&w=majority&appName=Cluster0`;

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(connectionStr);

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default dbConnect;
