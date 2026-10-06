import * as React from 'react';
import Link from 'next/link';
import { db } from '@/server/db';
import { leads, packages, portfolios, testimonials } from '@/server/db/schema';
import { eq, desc, count } from 'drizzle-orm';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Users, Package, Camera, MessageSquareQuote, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

function getStatusBadge(status: string) {
  switch (status) {
    case 'NEW':
      return <Badge variant="warning">Inquiry Baru</Badge>;
    case 'CONTACTED':
      return <Badge variant="info">Dihubungi</Badge>;
    case 'CONSULTATION':
      return <Badge variant="default">Konsultasi</Badge>;
    case 'CONFIRMED':
      return <Badge variant="success">Deal / Terkonfirmasi</Badge>;
    case 'COMPLETED':
      return <Badge variant="success">Selesai</Badge>;
    case 'CANCELLED':
      return <Badge variant="outline">Dibatalkan</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default async function AdminOverviewPage() {
  // Aggregate summary metrics
  const [totalLeadsResult] = await db.select({ value: count() }).from(leads);
  const [newLeadsResult] = await db.select({ value: count() }).from(leads).where(eq(leads.status, 'NEW'));
  const [activePackagesResult] = await db.select({ value: count() }).from(packages).where(eq(packages.isActive, true));
  const [publishedPortfoliosResult] = await db.select({ value: count() }).from(portfolios).where(eq(portfolios.isPublished, true));
  const [totalTestimonialsResult] = await db.select({ value: count() }).from(testimonials).where(eq(testimonials.isPublished, true));

  // Get 5 latest leads
  const latestLeads = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(5);

  const stats = [
    {
      label: 'Inquiry Baru',
      value: newLeadsResult.value,
      subtext: `Dari total ${totalLeadsResult.value} leads`,
      icon: <Users className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50',
    },
    {
      label: 'Paket Aktif',
      value: activePackagesResult.value,
      subtext: 'Tersedia di katalog publik',
      icon: <Package className="w-5 h-5 text-brand-forest" />,
      bg: 'bg-emerald-50',
    },
    {
      label: 'Portofolio Publik',
      value: publishedPortfoliosResult.value,
      subtext: 'Dokumentasi acara tayang',
      icon: <Camera className="w-5 h-5 text-sky-600" />,
      bg: 'bg-sky-50',
    },
    {
      label: 'Ulasan Klien',
      value: totalTestimonialsResult.value,
      subtext: 'Testimoni terverifikasi',
      icon: <MessageSquareQuote className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
          Ringkasan Operasional
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Pantau calon klien dan status konten Dua Insan Organizer secara real-time.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-lg border border-brand-border shadow-xs flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-medium text-brand-muted block">{s.label}</span>
              <span className="text-2xl font-semibold text-brand-charcoal mt-1 block">{s.value}</span>
              <span className="text-[11px] text-brand-muted/80 mt-0.5 block">{s.subtext}</span>
            </div>
            <div className={`p-3 rounded-md ${s.bg}`}>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Latest Leads Section */}
      <div className="bg-white rounded-lg border border-brand-border shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-brand-charcoal">
              Inquiry Calon Pengantin Terbaru
            </h2>
            <p className="text-xs text-brand-muted mt-0.5">
              Daftar reservasi jadwal konsultasi yang baru masuk ke sistem.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-medium text-brand-forest hover:text-brand-forest-dark flex items-center"
          >
            Lihat Semua Leads <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {latestLeads.length === 0 ? (
          <div className="p-8 text-center text-sm text-brand-muted">
            Belum ada data inquiry masuk saat ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
                <tr>
                  <th className="px-6 py-3">Nama Klien</th>
                  <th className="px-6 py-3">WhatsApp</th>
                  <th className="px-6 py-3">Rencana Acara</th>
                  <th className="px-6 py-3">Lokasi / Venue</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {latestLeads.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-ivory/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-brand-charcoal">
                      {item.fullName}
                    </td>
                    <td className="px-6 py-4 text-brand-muted">
                      {item.whatsappNumber}
                    </td>
                    <td className="px-6 py-4 text-brand-muted">
                      {item.eventDate}
                    </td>
                    <td className="px-6 py-4 text-brand-muted">
                      {item.venueLocation}, {item.city}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/leads/${item.id}`}
                        className="text-xs font-medium text-brand-forest hover:underline"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
