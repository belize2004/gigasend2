// import { connectToDB } from '@/lib/db';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '@/lib/constant';
// import { verifyToken } from '@/lib/verifyJwt';
import { NextResponse } from 'next/server';

export async function POST() {
  // const body = await req.json();

  // const token = req.cookies.get('token')!.value!;

  // const payload = verifyToken(token);
  // if (!payload) {
  //   return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  // }

  return NextResponse.json({ success: true, message: 'Authentication successful' }, { status: 200 })
}
