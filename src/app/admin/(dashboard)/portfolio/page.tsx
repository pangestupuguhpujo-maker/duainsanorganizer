import * as React from 'react';
import { db } from '@/server/db';
import { portfolios } from '@/server/db/schema';
import { desc } from 'drizzle-orm';
import { PortfolioManager } from '@/components/features/admin/PortfolioManager';

export const dynamic = 'force-dynamic';

export default async function AdminPortfolioPage() {
  const allPortfolios = await db
    .select()
    .from(portfolios)
    .orderBy(desc(portfolios.createdAt));

  return <PortfolioManager items={allPortfolios} />;
}
