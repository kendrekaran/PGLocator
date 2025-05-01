import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://karan902:I2zUU1l6WKEiB3ai@cluster0.byki5.mongodb.net/pglocator';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Define the global mongoose cache type
interface GlobalMongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the NodeJS global interface
declare global {
  var mongoose: GlobalMongooseCache | undefined;
}

// Get the cached connection or initialize a new one
const cached: GlobalMongooseCache = global.mongoose || { conn: null, promise: null };

// Initialize the global cache if it doesn't exist
if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;