import { jwtVerify } from 'jose';
import { getJwtSecret } from './serverEnv';

export interface JwtPayload {
  userId: string;
}

export async function verifyToken(token: string, runtimeEnv?: Record<string, any>): Promise<JwtPayload | null> {
  try {
    const secretKey = getJwtSecret(runtimeEnv);
    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify<JwtPayload>(token, secret);
    return payload;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}
