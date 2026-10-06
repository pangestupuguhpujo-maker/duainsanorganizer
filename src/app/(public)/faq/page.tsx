import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HomeFaq } from '@/components/features/home/HomeFaq';
import { getAllPublishedFaqs } from '@/server/repositories/faq.repo';
import { Sparkles, MessageCircle, HelpCircle, PhoneCall } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Tanya Jawab (FAQ)',
  description:
    'Pertanyaan yang sering diajukan mengenai layanan Wedding Organizer Dua Insan: alur Technical Meeting, Kapten Tim, pengamanan mahar, paket, dan sistem koordinasi di Pekanbaru.',
};

export default async function FaqPage() {
  const faqs = await getAllPublishedFaqs();
  const waUrl = buildWhatsAppLink({
    customMessage: 'Halo Dua Insan Organizer, saya ingin bertanya lebih lanjut seputar persiapan pernikahan dan ketersediaan jadwal tim.',
  });

  return (
    <div className="py-12 sm:py-20">
      <Container size="md">
        {/* Header with Luxury Badge */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Pusat Informasi & Transparansi</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-forest tracking-tight leading-[1.15]">
            Pertanyaan yang Kerap Diajukan{' '}
            <span className="italic text-brand-olive font-light">Calon Pengantin</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-sans">
            Penjelasan transparan seputar alur kerja sama, pembagian tugas Kapten Tim, pengamanan kotak mahar, hingga fleksibilitas paket pernikahan.
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-brand-ivory/50 p-6 sm:p-8 rounded-3xl border border-brand-border/80 shadow-xs mb-14">
          <HomeFaq faqs={faqs} isFullPage />
        </div>

        {/* Quick Contact Box */}
        <div className="p-8 rounded-3xl bg-white border border-brand-border/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif text-xl font-normal text-brand-forest">
              Punya Pertanyaan Spesifik Lainnya?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-md">
              Setiap rencana pernikahan memiliki keunikan tersendiri. Diskusikan langsung bersama Wedding Planner kami kapan saja.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-3 rounded-xl text-xs font-semibold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Tanya Langsung via WhatsApp</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
