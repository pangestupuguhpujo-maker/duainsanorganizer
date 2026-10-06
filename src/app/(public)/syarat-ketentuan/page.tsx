import * as React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan pemesanan layanan Wedding Organizer Dua Insan.',
};

export default function SyaratKetentuanPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container size="md">
        <div className="space-y-6 bg-white p-8 sm:p-12 rounded-2xl border border-brand-border shadow-xs text-brand-charcoal text-sm leading-relaxed">
          <h1 className="font-serif text-3xl font-normal text-brand-forest">
            Syarat & Ketentuan Layanan
          </h1>
          <p className="text-xs text-brand-muted">
            Pembaruan Terakhir: {new Date().getFullYear()}
          </p>

          <h2 className="font-serif text-xl font-medium text-brand-forest pt-4">
            1. Pemesanan Jadwal (Booking Date)
          </h2>
          <p>
            Kepastian jadwal pernikahan dikonfirmasi setelah pembayaran uang muka (Down Payment) sebesar 20% dari total nilai paket yang disepakati dan penandatanganan lembar kerja sama resmi.
          </p>

          <h2 className="font-serif text-xl font-medium text-brand-forest pt-4">
            2. Tahapan Pembayaran
          </h2>
          <p>
            Pembayaran dilakukan bertahap sesuai termin kerja: Uang Muka saat pemesanan, termin kedua pada saat Technical Meeting (TM), dan pelunasan paling lambat 14 hari kerja sebelum hari pelaksanaan pernikahan.
          </p>

          <h2 className="font-serif text-xl font-medium text-brand-forest pt-4">
            3. Perubahan Jadwal (Reschedule)
          </h2>
          <p>
            Permintaan perubahan tanggal acara diperbolehkan selama jadwal baru masih tersedia dan disampaikan secara tertulis minimal 60 hari sebelum tanggal awal yang disepakati tanpa biaya penalti.
          </p>

          <h2 className="font-serif text-xl font-medium text-brand-forest pt-4">
            4. Keadaan Kahar (Force Majeure)
          </h2>
          <p>
            Dalam hal terjadi keadaan kahar (bencana alam, huru-hara, atau kebijakan pemerintah darurat), kedua belah pihak sepakat untuk mencari solusi terbaik melalui musyawarah kekeluargaan demi kelangsungan acara.
          </p>
        </div>
      </Container>
    </div>
  );
}
