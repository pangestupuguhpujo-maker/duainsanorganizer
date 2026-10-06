import { cookies } from 'next/headers';
import { db } from '../db';
import { sessions, users } from '../db/schema';
import { eq, and, gt } from 'drizzle-orm';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'dua_insan_session_token';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN';
}

/**
 * Generate a cryptographically secure random session token.
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a new session in the database and set the HttpOnly cookie.
 */
export async function createSession(userId: string): Promise<string> {
  const sessionId = generateSessionToken();
  const now = Date.now();
  const expiresAt = now + SESSION_DURATION_MS;

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
    createdAt: now,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(expiresAt),
  });

  return sessionId;
}

/**
 * Validate the current session from HttpOnly cookie and return the authenticated user if valid.
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      return null;
    }

    const now = Date.now();

    // Query session joined with active user
    const result = await db
      .select({
        sessionId: sessions.id,
        userId: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        isActive: users.isActive,
        expiresAt: sessions.expiresAt,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, now)))
      .limit(1);

    if (!result.length || !result[0].isActive) {
      return null;
    }

    const user = result[0];
    return {
      id: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error('Failed to get current user session:', error);
    return null;
  }
}

/**
 * Destroy the current session in database and delete the cookie.
 */
export async function destroySession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (sessionId) {
      await db.delete(sessions).where(eq(sessions.id, sessionId));
    }

    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch (error) {
    console.error('Failed to destroy session:', error);
  }
}
