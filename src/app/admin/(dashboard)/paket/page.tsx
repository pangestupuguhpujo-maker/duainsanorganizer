import * as React from 'react';
import { db } from '@/server/db';
import { packages } from '@/server/db/schema';
import { asc } from 'drizzle-orm';
import { PackageManager } from '@/components/features/admin/PackageManager';

export const dynamic = 'force-dynamic';

export default async function AdminPaketPage() {
  const allPackages = await db
    .select()
    .from(packages)
    .orderBy(asc(packages.displayOrder));

  return <PackageManager items={allPackages} />;
}
