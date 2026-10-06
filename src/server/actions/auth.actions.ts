'use server';

import { redirect } from 'next/navigation';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { loginSchema } from '@/schemas/auth.schema';
import { verifyPassword } from '../auth/password';
import { createSession, destroySession } from '../auth/session';
import { checkRateLimit } from '../auth/rate-limit';

export interface ActionState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function loginAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validation = loginSchema.safeParse(rawData);
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { fieldErrors };
  }

  const { email, password } = validation.data;
  const normalizedEmail = email.toLowerCase().trim();

  // Rate limiting: Max 5 failed attempts per 15 minutes per email/IP
  const rateLimit = checkRateLimit({
    key: `auth:login:${normalizedEmail}`,
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.success) {
    return {
      error: 'Terlalu banyak percobaan masuk. Silakan coba kembali dalam 15 menit.',
    };
  }

  try {
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (!userResult.length || !userResult[0].isActive) {
      // Generic error to prevent account enumeration
      return {
        error: 'Email atau kata sandi tidak valid.',
      };
    }

    const user = userResult[0];

    // Verify Argon2id password hash
    const isPasswordValid = await verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
      return {
        error: 'Email atau kata sandi tidak valid.',
      };
    }

    // Create session in database and set HttpOnly cookie
    await createSession(user.id);
  } catch (error) {
    console.error('Login action error:', error);
    return {
      error: 'Terjadi gangguan sistem saat proses masuk. Silakan coba sesaat lagi.',
    };
  }

  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}
