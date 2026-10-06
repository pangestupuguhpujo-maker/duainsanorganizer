import * as React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi dan perlindungan data calon pengantin oleh Dua Insan Organizer.',
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container size="md">
        <div className="space-y-6 bg-white p-8 sm:p-12 rounded-2xl border border-brand-border shadow-xs text-brand-charcoal text-sm leading-relaxed">
          <h1 className="font-serif text-3xl font-normal text-brand-forest">
            Kebijakan Privasi
          </h1>
          <p className="text-xs text-brand-muted">
            Pembaruan Terakhir: {new Date().getFullYear()}
          </p>

          <h2 className="font-serif text-xl font-medium text-brand-forest pt-4">
            1. Pengumpulan Informasi
          </h2>
          <p>
            Dua Insan Organizer menghargai privasi setiap calon klien. Data pribadi yang Anda masukkan melalui formulir konsultasi (nama lengkap, nomor telepon/WhatsApp, alamat email, rencana tanggal pernikahan, lokasi venue, dan estimasi anggaran) hanya digunakan untuk keperluan komunikasi profesional dan penyusunan proposal pernikahan.
          </p>

          <h2 className="font-serif text-xl font-medium text-brand-forest pt-4">
            2. Penggunaan & Keamanan Data
          </h2>
          <p>
            Data Anda disimpan secara aman di dalam infrastruktur terlindungi dan tidak akan pernah diperjualbelikan, disewakan, atau dibagikan kepada pihak ketiga yang tidak berhubungan tanpa persetujuan eksplisit Anda.
          </p>

          <h2 className="font-serif text-xl font-medium text-brand-forest pt-4">
            3. Publikasi Dokumentasi Portofolio
          </h2>
          <p>
            Foto atau video dokumentasi acara pernikahan yang dipublikasikan pada website atau media sosial Dua Insan Organizer selalu melalui proses konfirmasi dan persetujuan bersama pasangan pengantin sebelum penayangan.
          </p>

          <h2 className="font-serif text-xl font-medium text-brand-forest pt-4">
            4. Hak Klien
          </h2>
          <p>
            Anda memiliki hak untuk meminta pembaruan, koreksi, atau penghapusan data kontak Anda dari sistem kami kapan saja dengan menghubungi kami melalui saluran resmi.
          </p>
        </div>
      </Container>
    </div>
  );
}
