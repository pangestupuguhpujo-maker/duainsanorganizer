import { db } from '../db';
import { services } from '../db/schema';
import { eq, asc } from 'drizzle-orm';

export async function getAllActiveServices() {
  return db
    .select()
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(asc(services.displayOrder));
}

export async function getServiceBySlug(slug: string) {
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  return service || null;
}
