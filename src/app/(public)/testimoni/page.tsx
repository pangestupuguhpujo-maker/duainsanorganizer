import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getAllPublishedTestimonials } from '@/server/repositories/testimonial.repo';
import { Star, Sparkles, Quote, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Testimoni Klien',
  description:
    'Ulasan dan pengalaman nyata para pasangan pengantin yang telah mempercayakan hari bahagia pernikahan mereka kepada Dua Insan Organizer di Pekanbaru, Riau.',
};

export default async function TestimoniPage() {
  const testimonials = await getAllPublishedTestimonials();

  return (
    <div className="py-12 sm:py-20">
      <Container size="lg">
        {/* Header with Luxury Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Cerita Nyata & Ulasan Pengantin</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-brand-forest tracking-tight leading-[1.15]">
            Kebahagiaan Tulus dari Mereka yang{' '}
            <span className="italic text-brand-olive font-light">Telah Memulai Kisah</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-sans">
            Rasa syukur pasangan mempelai dan ketenangan para orang tua adalah tolak ukur kehormatan terbesar bagi seluruh tim Dua Insan Organizer.
          </p>

          {/* Trust Metric Pill */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-brand-forest">
            <div className="flex items-center space-x-1.5 bg-white px-3.5 py-1.5 rounded-full border border-brand-border shadow-2xs">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold">5.0 / 5.0 Rating Kepuasan</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white px-3.5 py-1.5 rounded-full border border-brand-border shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Ulasan Pasangan Asli</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid with Luxury Watermark */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 sm:mb-28">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative group p-8 rounded-2xl bg-white border border-brand-border/80 shadow-xs hover:border-brand-ochre/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle Quote Watermark */}
              <div className="absolute top-6 right-6 text-brand-forest/5 group-hover:text-brand-ochre/15 transition-colors pointer-events-none">
                <Quote className="w-12 h-12 fill-current" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1" aria-label={`Rating ${t.rating} dari 5 bintang`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {t.eventDate && (
                    <span className="text-[11px] font-medium text-brand-muted">
                      {t.eventDate}
                    </span>
                  )}
                </div>

                <p className="text-sm text-brand-charcoal/90 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-3.5 pt-5 border-t border-brand-border/70">
                {t.clientPhoto ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-border group-hover:border-brand-ochre/60 transition-colors bg-white flex-shrink-0 shadow-2xs">
                    <Image
                      src={t.clientPhoto}
                      alt={t.clientName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-forest text-brand-ivory flex items-center justify-center font-medium text-sm flex-shrink-0">
                    {t.clientName.charAt(0)}
                  </div>
                )}
                <div className="overflow-hidden">
                  <h3 className="font-serif text-base font-medium text-brand-forest">
                    {t.clientName}
                  </h3>
                  <p className="text-xs text-brand-muted truncate">
                    {t.weddingTitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Conversion Banner */}
        <div className="rounded-3xl bg-brand-forest text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-ochre px-3.5 py-1 rounded-full bg-white/10 border border-brand-ochre/30 inline-block">
              ✦ Giliran Anda Menikmati Hari Bahagia
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug">
              Ingin Menikmati Pesta Pernikahan dengan Ketenangan Mutlak?
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-2xl mx-auto">
              Percayakan koordinasi teknis, protokoler, dan pendampingan keluarga kepada tim Dua Insan Organizer. Kami siap mendampingi Anda di Pekanbaru dan sekitarnya.
            </p>
            <div className="pt-3">
              <Link href="/konsultasi">
                <Button variant="primary" size="lg" className="bg-brand-ochre text-brand-forest hover:bg-brand-ochre/90">
                  Konsultasikan Tanggal Acara Anda
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
