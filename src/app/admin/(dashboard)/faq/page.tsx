import * as React from 'react';
import { db } from '@/server/db';
import { faqs } from '@/server/db/schema';
import { asc } from 'drizzle-orm';
import { FaqManager } from '@/components/features/admin/FaqManager';

export const dynamic = 'force-dynamic';

export default async function AdminFaqPage() {
  const allFaqs = await db
    .select()
    .from(faqs)
    .orderBy(asc(faqs.displayOrder));

  return <FaqManager items={allFaqs} />;
}
