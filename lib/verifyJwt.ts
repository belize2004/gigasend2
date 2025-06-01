import { jwtVerify } from 'jose';
import { JWT_SECRET } from './constant';

export interface JwtPayload {
  userId: string;
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify<JwtPayload>(token, secret);
    return payload;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}
