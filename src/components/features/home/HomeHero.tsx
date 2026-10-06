import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Calendar, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, Star, Users } from 'lucide-react';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-brand-ivory to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-brand-border/60">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-ochre/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-olive/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Text & Editorial Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
              <span>Wedding Organizer & Planner Pekanbaru, Riau</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-forest font-normal tracking-tight leading-[1.12]">
              Pendamping Setia Menuju{' '}
              <span className="block font-serif italic text-brand-forest/90 font-light mt-1">
                Hari Bahagia Penuh Makna
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Mengorkestrasi setiap detik pernikahan Anda dengan ketelitian rasa, santun etika tradisi, dan ketenangan mutlak. Dari persiapan konsep hingga malam resepsi, kami memastikan Anda dan keluarga berdua menikmati setiap momen tanpa rasa cemas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/konsultasi" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md shadow-brand-forest/15">
                  <Calendar className="w-4 h-4 mr-2" />
                  Konsultasikan Acara Anda
                </Button>
              </Link>
              <Link href="/paket" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/60 hover:bg-white">
                  Lihat Pilihan Paket
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-6 border-t border-brand-border/80 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div className="bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-lg border border-brand-border/60 sm:border-none">
                <span className="font-serif text-2xl sm:text-3xl text-brand-forest font-medium block">
                  1 Tim
                </span>
                <span className="text-xs text-brand-muted block mt-0.5">
                  Eksklusif 1 Acara / Hari
                </span>
              </div>
              <div className="bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-lg border border-brand-border/60 sm:border-none">
                <span className="font-serif text-2xl sm:text-3xl text-brand-forest font-medium block">
                  100%
                </span>
                <span className="text-xs text-brand-muted block mt-0.5">
                  Rundown Tepat Waktu
                </span>
              </div>
              <div className="bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-lg border border-brand-border/60 sm:border-none">
                <span className="font-serif text-2xl sm:text-3xl text-brand-forest font-medium block">
                  5.0 ★
                </span>
                <span className="text-xs text-brand-muted block mt-0.5">
                  Rating Kepuasan Klien
                </span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Visual Showcase with Arch & Layering */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Grand Chandelier Card */}
              <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-brand-ochre/25 bg-white">
                <Image
                  src="/images/hero/hero-cover.jpg"
                  alt="Dekorasi Chandelier Megah Pernikahan Pekanbaru - Dua Insan Organizer"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Subtle caption bottom */}
                <div className="absolute bottom-4 right-4 text-right z-10 hidden sm:block">
                  <span className="text-[11px] font-medium text-white/90 drop-shadow-md tracking-wider uppercase">
                    Dekorasi & Tata Cahaya
                  </span>
                </div>
              </div>

              {/* Overlapping Wedding Arch Portrait (Left Bottom) */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 w-40 sm:w-48 aspect-[3/4] rounded-t-[60px] sm:rounded-t-[80px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white bg-brand-ivory z-20 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/paket/paket-signature-card-hd.jpg"
                  alt="Dokumentasi Pengantin Dua Insan Organizer"
                  fill
                  unoptimized
                  className="object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                  <p className="text-[10px] sm:text-xs font-serif text-white font-medium drop-shadow-sm">
                    Atika & Edo
                  </p>
                  <p className="text-[9px] text-white/80 font-sans tracking-tight">
                    GSG AURI Pekanbaru
                  </p>
                </div>
              </div>

              {/* Floating Glassmorphic Badge (Top Right) */}
              <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-brand-border/80 z-20 flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-semibold text-brand-forest">
                      Fokus 1 Klien/Hari
                    </span>
                  </div>
                  <span className="text-[10px] text-brand-muted block">
                    Dedikasi Penuh Tanpa Bagi Kru
                  </span>
                </div>
              </div>

              {/* Floating Guarantee Card (Bottom Right) */}
              <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-brand-border/80 z-10 flex items-center space-x-3">
                <div className="p-1.5 rounded-md bg-brand-forest/5 text-brand-forest">
                  <ShieldCheck className="w-4 h-4 text-brand-forest" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-brand-charcoal block">
                    Transparansi Penuh
                  </span>
                  <span className="text-[10px] text-brand-muted block">
                    Tanpa mark-up harga vendor
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
