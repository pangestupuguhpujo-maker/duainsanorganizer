import * as React from 'react';
import { db } from '@/server/db';
import { services } from '@/server/db/schema';
import { asc } from 'drizzle-orm';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function AdminLayananPage() {
  const allServices = await db
    .select()
    .from(services)
    .orderBy(asc(services.displayOrder));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
          Pengelolaan Layanan
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Daftar kategori spektrum layanan yang disediakan oleh Dua Insan Organizer.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Nama Layanan</th>
                <th className="px-6 py-3.5">Slug</th>
                <th className="px-6 py-3.5">Deskripsi Singkat</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {allServices.map((service) => (
                <tr key={service.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-brand-muted">
                    #{service.displayOrder}
                  </td>
                  <td className="px-6 py-4 font-medium text-brand-charcoal">
                    {service.title}
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted font-mono">
                    /{service.slug}
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted max-w-md">
                    {service.shortDescription}
                  </td>
                  <td className="px-6 py-4">
                    {service.isActive ? (
                      <Badge variant="success">Aktif</Badge>
                    ) : (
                      <Badge variant="outline">Non-aktif</Badge>
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
