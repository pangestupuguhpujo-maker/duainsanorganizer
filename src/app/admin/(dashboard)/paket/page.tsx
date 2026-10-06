import * as React from 'react';
import Link from 'next/link';
import { db } from '@/server/db';
import { packages, packageFeatures } from '@/server/db/schema';
import { asc, count, eq } from 'drizzle-orm';
import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { togglePackageActiveAction } from '@/server/actions/admin.actions';

export const dynamic = 'force-dynamic';

export default async function AdminPaketPage() {
  const allPackages = await db
    .select()
    .from(packages)
    .orderBy(asc(packages.displayOrder));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
            Pengelolaan Paket Wedding
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Kelola visibilitas paket yang ditampilkan pada katalog website publik.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Nama Paket</th>
                <th className="px-6 py-3.5">Harga Awal</th>
                <th className="px-6 py-3.5">Catatan Kapasitas</th>
                <th className="px-6 py-3.5">Status Unggulan</th>
                <th className="px-6 py-3.5">Status Tayang</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {allPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-brand-muted">
                    #{pkg.displayOrder}
                  </td>
                  <td className="px-6 py-4 font-medium text-brand-charcoal">
                    <Link href={`/paket/${pkg.slug}`} target="_blank" className="hover:underline">
                      {pkg.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-brand-forest font-medium">
                    {formatRupiah(pkg.startingPrice)}
                  </td>
                  <td className="px-6 py-4 text-brand-muted text-xs">
                    {pkg.priceNote || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {pkg.isFeatured ? (
                      <Badge variant="warning">Featured</Badge>
                    ) : (
                      <Badge variant="outline">Standar</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {pkg.isActive ? (
                      <Badge variant="success">Aktif (Tayang)</Badge>
                    ) : (
                      <Badge variant="outline">Non-aktif (Draft)</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <form action={togglePackageActiveAction.bind(null, pkg.id, pkg.isActive)}>
                      <Button
                        type="submit"
                        variant={pkg.isActive ? 'outline' : 'primary'}
                        size="sm"
                      >
                        {pkg.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      </Button>
                    </form>
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
