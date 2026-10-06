import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLeadById } from '@/server/repositories/lead.repo';
import { updateLeadStatusAction } from '@/server/actions/admin.actions';
import { formatDate, formatDateTime, formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { ArrowLeft, MessageCircle, Phone, Mail, Calendar, MapPin, Users, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminLeadDetailPage({ params }: Props) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  const phoneNum = lead.whatsappNumber.replace(/\D/g, '');
  const waChatUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(
    `Halo Kak ${lead.fullName}, saya dari tim Dua Insan Organizer ingin menindaklanjuti permohonan konsultasi pernikahan Anda untuk tanggal ${lead.eventDate} di ${lead.venueLocation}.`
  )}`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-brand-olive hover:text-brand-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Kembali ke Daftar Leads
        </Link>
      </div>

      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-brand-border p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs text-brand-muted block">
            ID Inquiry: <code className="text-brand-charcoal">{lead.id}</code> &bull; Masuk pada {formatDateTime(lead.createdAt)}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal mt-1">
            {lead.fullName}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={waChatUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="md">
              <MessageCircle className="w-4 h-4 mr-2 fill-current" />
              Chat WhatsApp
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Lead Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-medium text-brand-forest border-b border-brand-border pb-3">
              Informasi Calon Pengantin & Acara
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-brand-muted block">Nama Lengkap</span>
                <span className="font-medium text-brand-charcoal">{lead.fullName}</span>
              </div>

              <div>
                <span className="text-xs text-brand-muted block">Nomor WhatsApp</span>
                <span className="font-medium text-brand-charcoal">{lead.whatsappNumber}</span>
              </div>

              <div>
                <span className="text-xs text-brand-muted block">Alamat Email</span>
                <span className="font-medium text-brand-charcoal">{lead.email || '-'}</span>
              </div>

              <div>
                <span className="text-xs text-brand-muted block">Metode Kontak Pilihan</span>
                <span className="font-medium text-brand-charcoal">{lead.preferredContactMethod}</span>
              </div>

              <div>
                <span className="text-xs text-brand-muted block">Rencana Tanggal Pernikahan</span>
                <span className="font-medium text-brand-forest">{lead.eventDate}</span>
              </div>

              <div>
                <span className="text-xs text-brand-muted block">Estimasi Jumlah Tamu</span>
                <span className="font-medium text-brand-charcoal">{lead.guestCountEstimate} Orang</span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-xs text-brand-muted block">Lokasi / Venue Acara</span>
                <span className="font-medium text-brand-charcoal">{lead.venueLocation}, {lead.city}</span>
              </div>

              <div>
                <span className="text-xs text-brand-muted block">Paket yang Diminati</span>
                <span className="font-medium text-brand-charcoal">
                  {lead.packageName ? (
                    <Link href={`/paket`} className="text-brand-forest underline">
                      {lead.packageName}
                    </Link>
                  ) : (
                    'Belum Memilih (Konsultasi Umum)'
                  )}
                </span>
              </div>

              <div>
                <span className="text-xs text-brand-muted block">Alokasi Anggaran Total</span>
                <span className="font-medium text-brand-charcoal">{lead.budgetRange || '-'}</span>
              </div>
            </div>

            {lead.message && (
              <div className="pt-4 border-t border-brand-border/60">
                <span className="text-xs text-brand-muted block mb-1">Catatan / Harapan Klien:</span>
                <p className="p-3.5 rounded-lg bg-brand-ivory text-brand-charcoal text-sm leading-relaxed whitespace-pre-line border border-brand-border/60">
                  {lead.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Admin Status & Notes Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-xs space-y-5">
            <h2 className="font-serif text-lg font-medium text-brand-forest border-b border-brand-border pb-3">
              Status Progres & Catatan Internal
            </h2>

            <form action={updateLeadStatusAction} className="space-y-4">
              <input type="hidden" name="id" value={lead.id} />

              <div>
                <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
                  Tahapan Status Lead
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={lead.status}
                  className="w-full rounded-md border border-brand-border bg-white px-3.5 py-2 text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-forest"
                >
                  <option value="NEW">Inquiry Baru (NEW)</option>
                  <option value="CONTACTED">Sudah Dihubungi (CONTACTED)</option>
                  <option value="CONSULTATION">Jadwal Temu Konsultasi (CONSULTATION)</option>
                  <option value="PROPOSAL">Proposal Terkirim (PROPOSAL)</option>
                  <option value="CONFIRMED">Terkonfirmasi Deal (CONFIRMED)</option>
                  <option value="COMPLETED">Pernikahan Selesai (COMPLETED)</option>
                  <option value="CANCELLED">Batal / Dibatalkan (CANCELLED)</option>
                </select>
              </div>

              <div>
                <Textarea
                  label="Catatan Internal Admin (Hanya terlihat oleh tim)"
                  name="adminNotes"
                  id="adminNotes"
                  rows={5}
                  defaultValue={lead.adminNotes || ''}
                  placeholder="Contoh: Sudah telpon dengan Mbak Sarah, jadwal temu di kantor hari Sabtu pkl 14.00..."
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="md" className="w-full">
                  Simpan Perubahan Status
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
