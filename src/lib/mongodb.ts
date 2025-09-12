import mongoose from "mongoose"

let isConnected = false
const MONGODB_URI = process.env.MONGODB_URI || ""

export async function connectDB() {
  if (isConnected) return

  try {
    const db = await mongoose.connect(MONGODB_URI)
    isConnected = db.connections[0].readyState === 1
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw new Error("Failed to connect to MongoDB")
  }
}
