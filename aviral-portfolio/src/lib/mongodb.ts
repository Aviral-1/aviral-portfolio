import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Extend NodeJS global type so TypeScript doesn't complain
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

/**
 * Global cache prevents multiple connections during hot-reload in dev
 * and across serverless function invocations in production.
 */
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection immediately (no new connection = no RAM spike)
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,    // Don't buffer ops when disconnected
      maxPoolSize: 5,           // Limit connection pool to prevent RAM spikes
      serverSelectionTimeoutMS: 5000, // Fail fast if DB unreachable
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mg) => {
        console.log("[MongoDB] Connected successfully");
        return mg;
      })
      .catch((err) => {
        cached.promise = null; // Reset promise so retries work
        console.error("[MongoDB] Connection failed:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
