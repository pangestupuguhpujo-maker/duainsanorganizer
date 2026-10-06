import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Calendar, MessageCircle, Heart } from 'lucide-react';

export function HomeCta() {
  const waUrl = buildWhatsAppLink();

  return (
    <section className="py-20 sm:py-28 bg-brand-forest text-brand-ivory relative overflow-hidden">
      {/* Subtle organic background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="90" cy="10" r="30" fill="currentColor" />
          <circle cx="10" cy="90" r="40" fill="currentColor" />
        </svg>
      </div>

      <Container size="md" className="relative text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-brand-olive-light uppercase tracking-widest mb-6">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Langkah Pertama Menuju Pelaminan</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-6 leading-tight">
          Mari Wujudkan Hari Bahagia yang Khidmat & Berkesan
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
          Setiap momen istimewa layak direncanakan dengan hati. Jadwalkan sesi konsultasi santai bersama Wedding Planner kami untuk membicarakan konsep dan anggaran terbaik Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/konsultasi" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-brand-ivory text-brand-forest hover:bg-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Jadwalkan Konsultasi Acara
            </Button>
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 mr-2 fill-current" />
              Tanya via WhatsApp
            </Button>
          </a>
        </div>

        <p className="mt-8 text-xs text-white/50">
          Konsultasi awal tanpa biaya &bull; Respons cepat dalam hitungan jam di jam kerja
        </p>
      </Container>
    </section>
  );
}
