import { verifyToken } from '@/lib/verifyJwt';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')!.value!;

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }

  const user = await User.findById<User>(payload.userId);

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true, message: 'Authentication successful', data: {
      email: user.email,
      id: user._id
    }
  }, { status: 200 })
}
