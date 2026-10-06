import * as React from 'react';
import { db } from '@/server/db';
import { testimonials } from '@/server/db/schema';
import { desc } from 'drizzle-orm';
import { TestimonialManager } from '@/components/features/admin/TestimonialManager';

export const dynamic = 'force-dynamic';

export default async function AdminTestimoniPage() {
  const allTestimonials = await db
    .select()
    .from(testimonials)
    .orderBy(desc(testimonials.createdAt));

  return <TestimonialManager items={allTestimonials} />;
}
