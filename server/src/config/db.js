import mongoose from "mongoose";

/**
 * Connect to MongoDB. Resolves to a boolean indicating success.
 * The server still boots without a database (contact falls back gracefully).
 */
export async function connectDB(uri) {
  if (!uri) {
    console.warn("[db] MONGODB_URI not set — running without persistence.");
    return false;
  }
  try {
    await mongoose.connect(uri);
    console.log("[db] MongoDB connected.");
    return true;
  } catch (err) {
    console.error("[db] Connection failed:", err.message);
    return false;
  }
}
