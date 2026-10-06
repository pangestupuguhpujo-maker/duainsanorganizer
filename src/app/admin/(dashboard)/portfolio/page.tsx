import * as React from 'react';
import Link from 'next/link';
import { db } from '@/server/db';
import { portfolios } from '@/server/db/schema';
import { desc } from 'drizzle-orm';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function AdminPortfolioPage() {
  const allPortfolios = await db
    .select()
    .from(portfolios)
    .orderBy(desc(portfolios.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
          Pengelolaan Portofolio
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Daftar dokumentasi acara pernikahan yang telah tersimpan di sistem.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-3.5">Judul Acara</th>
                <th className="px-6 py-3.5">Pasangan Pengantin</th>
                <th className="px-6 py-3.5">Venue & Kota</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Status Unggulan</th>
                <th className="px-6 py-3.5">Status Publikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {allPortfolios.map((item) => (
                <tr key={item.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-charcoal">
                    <Link href={`/portfolio/${item.slug}`} target="_blank" className="hover:underline">
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-brand-muted">
                    {item.coupleName}
                  </td>
                  <td className="px-6 py-4 text-brand-muted text-xs">
                    {item.venueName}, {item.city}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-brand-forest">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    {item.isFeatured ? (
                      <Badge variant="warning">Featured</Badge>
                    ) : (
                      <Badge variant="outline">Standar</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.isPublished ? (
                      <Badge variant="success">Tayang</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
