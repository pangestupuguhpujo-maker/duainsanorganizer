'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { submitConsultationAction } from '@/server/actions/consultation.actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import type { PackageWithFeatures } from '@/server/repositories/package.repo';

interface ConsultationFormProps {
  packages: PackageWithFeatures[];
  preselectedPackageId?: string;
}

export function ConsultationForm({ packages, preselectedPackageId }: ConsultationFormProps) {
  const [state, formAction, isPending] = useActionState(submitConsultationAction, null);

  if (state?.success) {
    return (
      <div className="bg-white rounded-2xl border border-brand-border p-8 sm:p-12 text-center shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-forest">
            Permohonan Berhasil Dikirimkan
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Terima kasih telah mempercayakan rencana pernikahan Anda kepada Dua Insan Organizer. Wedding Planner kami akan segera meninjau jadwal dan menghubungi Anda melalui WhatsApp.
          </p>
        </div>

        {state.whatsAppRedirectUrl && (
          <div className="pt-4 max-w-sm mx-auto space-y-3">
            <p className="text-xs text-brand-muted">
              Ingin terhubung lebih cepat dengan Wedding Consultant kami?
            </p>
            <a
              href={state.whatsAppRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button variant="whatsapp" size="lg" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2 fill-current" />
                Lanjutkan Obrolan via WhatsApp
              </Button>
            </a>
          </div>
        )}
      </div>
    );
  }

  const packageOptions = [
    { value: '', label: 'Belum menentukan paket (Konsultasi Umum)' },
    ...packages.map((p) => ({
      value: p.id,
      label: `${p.name} (Mulai Rp ${(p.startingPrice / 1000000).toLocaleString('id-ID')} Juta)`,
    })),
  ];

  const contactMethodOptions = [
    { value: 'WHATSAPP', label: 'WhatsApp (Sangat Dianjurkan)' },
    { value: 'PHONE', label: 'Telepon Langsung' },
    { value: 'EMAIL', label: 'Email Resmi' },
  ];

  const budgetOptions = [
    { value: '', label: 'Pilih perkiraan alokasi anggaran' },
    { value: '< Rp 30 Juta', label: 'Di bawah Rp 30 Juta' },
    { value: 'Rp 30 - 50 Juta', label: 'Rp 30 Juta - Rp 50 Juta' },
    { value: 'Rp 50 - 100 Juta', label: 'Rp 50 Juta - Rp 100 Juta' },
    { value: 'Rp 100 - 200 Juta', label: 'Rp 100 Juta - Rp 200 Juta' },
    { value: '> Rp 200 Juta', label: 'Di atas Rp 200 Juta' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-xs">
      <form action={formAction} className="space-y-6">
        {/* Anti-spam Honeypot field (hidden from real users) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="website_trap">Jangan isi bagian ini jika Anda manusia</label>
          <input
            id="website_trap"
            name="website_trap"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {state?.error && (
          <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm" role="alert">
            {state.error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Input
              label="Nama Lengkap Calon Mempelai"
              name="fullName"
              id="fullName"
              placeholder="Contoh: Sarah Faradiba"
              required
              error={state?.fieldErrors?.fullName}
            />
          </div>

          <div>
            <Input
              label="Nomor WhatsApp Aktif"
              name="whatsappNumber"
              id="whatsappNumber"
              placeholder="Contoh: 081234567890"
              required
              helperText="Jadwal temu dan konfirmasi dikirimkan via WhatsApp"
              error={state?.fieldErrors?.whatsappNumber}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Input
              label="Alamat Email (Opsional)"
              name="email"
              id="email"
              type="email"
              placeholder="nama@email.com"
              error={state?.fieldErrors?.email}
            />
          </div>

          <div>
            <Input
              label="Rencana Tanggal Acara"
              name="eventDate"
              id="eventDate"
              type="date"
              required
              error={state?.fieldErrors?.eventDate}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Input
              label="Lokasi / Nama Venue"
              name="venueLocation"
              id="venueLocation"
              placeholder="Contoh: Plataran Cilandak / Rumah"
              required
              error={state?.fieldErrors?.venueLocation}
            />
          </div>

          <div>
            <Input
              label="Kota Acara"
              name="city"
              id="city"
              placeholder="Contoh: Jakarta Selatan"
              required
              error={state?.fieldErrors?.city}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Input
              label="Estimasi Jumlah Tamu Undangan"
              name="guestCountEstimate"
              id="guestCountEstimate"
              type="number"
              placeholder="Contoh: 300"
              required
              error={state?.fieldErrors?.guestCountEstimate}
            />
          </div>

          <div>
            <Select
              label="Paket yang Diminati"
              name="interestedPackageId"
              id="interestedPackageId"
              options={packageOptions}
              defaultValue={preselectedPackageId || ''}
              error={state?.fieldErrors?.interestedPackageId}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Select
              label="Perkiraan Alokasi Anggaran Total"
              name="budgetRange"
              id="budgetRange"
              options={budgetOptions}
              error={state?.fieldErrors?.budgetRange}
            />
          </div>

          <div>
            <Select
              label="Metode Komunikasi Pilihan"
              name="preferredContactMethod"
              id="preferredContactMethod"
              options={contactMethodOptions}
              defaultValue="WHATSAPP"
              error={state?.fieldErrors?.preferredContactMethod}
            />
          </div>
        </div>

        <div>
          <Textarea
            label="Catatan atau Keinginan Khusus (Opsional)"
            name="message"
            id="message"
            rows={3}
            placeholder="Ceritakan gambaran konsep pernikahan yang Anda inginkan, prosesi adat tertentu, atau pertanyaan awal untuk kami..."
            error={state?.fieldErrors?.message}
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start space-x-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="consent"
              value="true"
              defaultChecked
              required
              className="mt-1 h-4 w-4 rounded border-brand-border text-brand-forest focus:ring-brand-forest"
            />
            <span className="text-xs text-brand-muted leading-relaxed">
              Saya menyetujui bahwa data kontak yang saya berikan digunakan secara aman oleh Dua Insan Organizer untuk keperluan komunikasi konsultasi pernikahan sesuai{' '}
              <a href="/kebijakan-privasi" target="_blank" className="text-brand-forest underline">
                Kebijakan Privasi
              </a>
              .
            </span>
          </label>
          {state?.fieldErrors?.consent && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {state.fieldErrors.consent}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-brand-border">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isPending}
          >
            Kirimkan Formulir Reservasi Konsultasi
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-center text-xs text-brand-muted mt-3">
            Konsultasi awal tanpa biaya &bull; Data Anda terjaga dengan aman
          </p>
        </div>
      </form>
    </div>
  );
}
