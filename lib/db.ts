import mongoose from 'mongoose';
import { MONGODB_URI } from './constant';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI');
}

// Add type to globalThis to avoid TS7017 and namespace lint error
interface MongooseGlobal {
  mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

declare const globalThis: typeof global & Partial<MongooseGlobal>;

const cached = globalThis.mongoose ?? {
  conn: null,
  promise: null,
};

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {});
  }

  cached.conn = await cached.promise;
  globalThis.mongoose = cached;
  return cached.conn;
}
