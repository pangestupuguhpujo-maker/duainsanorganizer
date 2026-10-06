import { db } from '../db';
import { testimonials } from '../db/schema';
import { eq, and, asc } from 'drizzle-orm';

export async function getFeaturedTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(and(eq(testimonials.isPublished, true), eq(testimonials.isFeatured, true)))
    .orderBy(asc(testimonials.displayOrder))
    .limit(6);
}

export async function getAllPublishedTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isPublished, true))
    .orderBy(asc(testimonials.displayOrder));
}
