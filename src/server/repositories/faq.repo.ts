import { db } from '../db';
import { faqs } from '../db/schema';
import { eq, asc } from 'drizzle-orm';

export async function getAllPublishedFaqs() {
  return db
    .select()
    .from(faqs)
    .where(eq(faqs.isPublished, true))
    .orderBy(asc(faqs.displayOrder));
}
