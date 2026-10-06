import * as React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ConsultationForm } from '@/components/features/consultation/ConsultationForm';
import { getAllActivePackages } from '@/server/repositories/package.repo';
import { ShieldCheck, MessageCircle, CalendarCheck, Clock, Sparkles, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konsultasi Pernikahan',
  description:
    'Jadwalkan sesi konsultasi gratis bersama Wedding Planner Dua Insan Organizer untuk merancang konsep, alokasi anggaran, dan alur hari bahagia Anda di Pekanbaru.',
};

interface Props {
  searchParams: Promise<{ paket?: string }>;
}

export default async function KonsultasiPage({ searchParams }: Props) {
  const { paket } = await searchParams;
  const packages = await getAllActivePackages();

  return (
    <div className="py-12 sm:py-20">
      <Container size="lg">
        {/* Header with Luxury Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Konsultasi & Perencanaan Acara</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-brand-forest tracking-tight leading-[1.15]">
            Rancang Hari Bahagia Anda Bersama{' '}
            <span className="italic text-brand-olive font-light">Tim Terpercaya</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-sans">
            Sampaikan tanggal dan gambaran konsep pernikahan impian Anda. Kami akan menyiapkan simulasi alur kerja, estimasi kru, serta transparansi penawaran tanpa komitmen awal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-8">
            <ConsultationForm
              packages={packages}
              preselectedPackageId={paket}
            />
          </div>

          {/* Consultation Reassurance Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-brand-border/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-brand-olive uppercase tracking-wider block">
                  Alur Tindak Lanjut
                </span>
                <h3 className="font-serif text-xl font-normal text-brand-forest">
                  Apa yang Terjadi Setelah Anda Mengirimkan Formulir?
                </h3>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-brand-charcoal pt-1">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-xl bg-brand-ivory border border-brand-border text-brand-forest mt-0.5 flex-shrink-0">
                    <Clock className="w-4 h-4 text-brand-olive" />
                  </div>
                  <div>
                    <strong className="block text-brand-forest font-medium">1. Verifikasi Tanggal Operasional</strong>
                    <span className="text-brand-muted leading-relaxed text-xs">
                      Tim kami memeriksa kalender kerja hari H untuk tanggal yang Anda ajukan (memastikan slot 1 tim/hari masih terbuka).
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-xl bg-brand-ivory border border-brand-border text-brand-forest mt-0.5 flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-brand-olive" />
                  </div>
                  <div>
                    <strong className="block text-brand-forest font-medium">2. Kontak Ramah via WhatsApp</strong>
                    <span className="text-brand-muted leading-relaxed text-xs">
                      Wedding Consultant kami akan menyapa ramah dan mencocokkan waktu pertemuan (di cafe, rumah Anda, atau online).
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-xl bg-brand-ivory border border-brand-border text-brand-forest mt-0.5 flex-shrink-0">
                    <CalendarCheck className="w-4 h-4 text-brand-olive" />
                  </div>
                  <div>
                    <strong className="block text-brand-forest font-medium">3. Sesi Diskusi & Simulasi Terbuka</strong>
                    <span className="text-brand-muted leading-relaxed text-xs">
                      Diskusi santai membedah konsep venue, dekorasi, protokoler adat, dan rincian estimasi biaya secara transparan.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-brand-border/70 space-y-2">
                <div className="flex items-center text-xs text-brand-forest font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                  Konsultasi 100% bebas biaya komitmen awal
                </div>
                <div className="flex items-center text-xs text-brand-muted">
                  <HeartHandshake className="w-4 h-4 text-brand-olive mr-2 flex-shrink-0" />
                  Privasi rencana keluarga Anda kami jaga sepenuhnya
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
