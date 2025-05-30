import mongoose from 'mongoose';
import { MONGODB_URI } from './constant';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {});
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}
