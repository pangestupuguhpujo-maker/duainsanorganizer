import { redirect } from 'next/navigation';
import { getCurrentUser, type AuthenticatedUser } from './session';

/**
 * Server-side guard to guarantee only authenticated administrators can access protected pages/actions.
 * Redirects to /admin/login if unauthenticated.
 */
export async function requireAdmin(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();

  if (!user || user.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  return user;
}
