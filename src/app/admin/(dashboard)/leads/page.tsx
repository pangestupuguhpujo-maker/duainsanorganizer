import * as React from 'react';
import Link from 'next/link';
import { getLeadsPaginated } from '@/server/repositories/lead.repo';
import { type LeadStatus, leadStatusEnum } from '@/server/db/schema';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, MessageCircle, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
  }>;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'NEW':
      return <Badge variant="warning">Baru</Badge>;
    case 'CONTACTED':
      return <Badge variant="info">Dihubungi</Badge>;
    case 'CONSULTATION':
      return <Badge variant="default">Konsultasi</Badge>;
    case 'PROPOSAL':
      return <Badge variant="info">Proposal</Badge>;
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

export default async function AdminLeadsPage({ searchParams }: Props) {
  const { page, status, search } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const currentStatus = (status as LeadStatus) || 'ALL';

  const { items, pagination } = await getLeadsPaginated({
    page: currentPage,
    limit: 15,
    status: currentStatus,
    search: search || '',
  });

  const statuses: { label: string; value: string }[] = [
    { label: 'Semua Status', value: 'ALL' },
    { label: 'Baru (NEW)', value: 'NEW' },
    { label: 'Dihubungi', value: 'CONTACTED' },
    { label: 'Konsultasi', value: 'CONSULTATION' },
    { label: 'Proposal Dikirim', value: 'PROPOSAL' },
    { label: 'Terkonfirmasi (Deal)', value: 'CONFIRMED' },
    { label: 'Selesai', value: 'COMPLETED' },
    { label: 'Dibatalkan', value: 'CANCELLED' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
            Daftar Inquiry & Leads
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Kelola seluruh permohonan konsultasi masuk dari calon pengantin. Total: {pagination.total} leads.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-brand-border">
        {statuses.map((s) => {
          const isActive = currentStatus === s.value;
          return (
            <Link
              key={s.value}
              href={`/admin/leads?status=${s.value}${search ? `&search=${search}` : ''}`}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-brand-forest text-brand-ivory font-semibold shadow-xs'
                  : 'bg-white text-brand-muted hover:bg-brand-ivory border border-brand-border'
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-brand-border shadow-xs overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center text-sm text-brand-muted">
            Tidak ditemukan data inquiry untuk filter saat ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
                <tr>
                  <th className="px-5 py-3.5">Nama Calon Pengantin</th>
                  <th className="px-5 py-3.5">Nomor WhatsApp</th>
                  <th className="px-5 py-3.5">Rencana Tanggal</th>
                  <th className="px-5 py-3.5">Lokasi / Venue</th>
                  <th className="px-5 py-3.5">Tamu</th>
                  <th className="px-5 py-3.5">Paket Diminati</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {items.map((lead) => {
                  const phoneNum = lead.whatsappNumber.replace(/\D/g, '');
                  const waChatUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(
                    `Halo Kak ${lead.fullName}, terima kasih telah menghubungi Dua Insan Organizer terkait rencana pernikahan pada ${lead.eventDate}. Apakah ada waktu luang untuk kita berdiskusi santai?`
                  )}`;

                  return (
                    <tr key={lead.id} className="hover:bg-brand-ivory/40 transition-colors">
                      <td className="px-5 py-4 font-medium text-brand-charcoal">
                        {lead.fullName}
                      </td>
                      <td className="px-5 py-4 text-brand-muted">
                        <div className="flex items-center space-x-2">
                          <span>{lead.whatsappNumber}</span>
                          <a
                            href={waChatUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-full text-emerald-600 hover:bg-emerald-50"
                            title="Chat langsung di WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </a>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-brand-muted whitespace-nowrap">
                        {lead.eventDate}
                      </td>
                      <td className="px-5 py-4 text-brand-muted">
                        {lead.venueLocation}, {lead.city}
                      </td>
                      <td className="px-5 py-4 text-brand-muted">
                        {lead.guestCountEstimate} Pax
                      </td>
                      <td className="px-5 py-4 text-brand-charcoal font-medium text-xs">
                        {lead.packageName || 'Konsultasi Umum'}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium text-brand-forest bg-brand-forest/5 hover:bg-brand-forest/10 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Kelola
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted bg-[#FAFBF9]">
            <span>
              Menampilkan halaman <strong>{pagination.page}</strong> dari <strong>{pagination.totalPages}</strong> ({pagination.total} total)
            </span>
            <div className="flex items-center space-x-2">
              {pagination.page > 1 && (
                <Link
                  href={`/admin/leads?page=${pagination.page - 1}&status=${currentStatus}`}
                  className="px-2.5 py-1.5 rounded bg-white border border-brand-border text-brand-charcoal hover:bg-brand-ivory flex items-center"
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Sebelumnya
                </Link>
              )}
              {pagination.page < pagination.totalPages && (
                <Link
                  href={`/admin/leads?page=${pagination.page + 1}&status=${currentStatus}`}
                  className="px-2.5 py-1.5 rounded bg-white border border-brand-border text-brand-charcoal hover:bg-brand-ivory flex items-center"
                >
                  Berikutnya <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
