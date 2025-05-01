import mongoose from 'mongoose';

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Define global variable type
declare global {
  var mongoose: MongooseConnection | undefined;
}

// Define global mongoose connection
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

// Save the connection in the global object
if (!global.mongoose) {
  global.mongoose = cached;
}

// Get MongoDB URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Connect to MongoDB
 */
export async function connectToDatabase() {
  try {
    // Check if MongoDB URI is defined
    if (!MONGODB_URI) {
      console.error('MongoDB URI is not defined in environment variables');
      throw new Error(
        'Please define the MONGODB_URI environment variable in .env.local'
      );
    }

    // If we have an existing connection, return it
    if (cached.conn) {
      return cached.conn;
    }

    // If a connection is already in progress, wait for it
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then((mongoose) => {
          console.log('Connected to MongoDB successfully');
          return mongoose;
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB:', error);
          throw error;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB connection error:', error);
    
    // For development purposes, return a mock connection
    // This allows the app to function with static data even without MongoDB
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock MongoDB connection for development');
      return mongoose; // Return mongoose instance without connection
    }
    
    throw error;
  }
} 