import { connectToDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/constant';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password)
    return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });

  await connectToDB();

  const userExists = await User.findOne({ email });
  if (userExists) return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

  const res = NextResponse.json({ success: true, message: 'User created successfully', data: { name, email } }, { status: 201 })

  res.cookies.set('token', token);

  return res;
}
