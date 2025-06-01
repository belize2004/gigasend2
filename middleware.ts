import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/verifyJwt';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log('first')
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (await verifyToken(token)) {
    return NextResponse.next();
  } else {
    req.cookies.delete('token');
    return NextResponse.json({ success: false, message: 'Authentication failed' }, { status: 401 });
  }
}

export const config = {
  matcher: [
    '/api/payment/subscribe',
    '/api/auth/verify',
    '/api/uploads/:path*',
    '/api/usage'
  ],
}