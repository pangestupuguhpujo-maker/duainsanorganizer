'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Sparkles, CheckCircle2, ArrowRight, MessageCircle, HelpCircle, Users, Building2, Clock } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface MatcherResult {
  packageName: string;
  packageSlug: string;
  tagline: string;
  crewEstimate: string;
  suitableFor: string;
  reason: string;
}

export function HomePackageMatcher() {
  const [venueType, setVenueType] = useState<'rumah' | 'gedung' | 'ballroom'>('gedung');
  const [guestScale, setGuestScale] = useState<'intimate' | 'medium' | 'grand'>('medium');
  const [duration, setDuration] = useState<'akad' | 'standar' | 'fullday'>('standar');

  // Compute recommendation
  const getRecommendation = (): MatcherResult => {
    if (venueType === 'ballroom' || guestScale === 'grand' || duration === 'fullday') {
      return {
        packageName: 'Prestige Packages',
        packageSlug: 'prestige-packages',
        tagline: 'Perhelatan Akbar & Standar VIP',
        crewEstimate: '10 - 14 Kru Profesional',
        suitableFor: 'Ballroom Hotel & Resepsi Tamu Skala Besar (>600 tamu)',
        reason:
          'Kombinasi venue luas dan jumlah tamu besar memerlukan tim VIP usher khusus, alur antrean foto teratur, dan pengawalan multivendor bertingkat tinggi.',
      };
    }

    if (venueType === 'rumah' || guestScale === 'intimate' || duration === 'akad') {
      return {
        packageName: 'Essential Packages',
        packageSlug: 'essential-packages',
        tagline: 'Khidmat, Hangat & Ramping',
        crewEstimate: '6 - 8 Kru Profesional',
        suitableFor: 'Intimate Wedding, Akad Masjid, atau Syukuran Rumah (<300 tamu)',
        reason:
          'Fokus pengawalan pada momen sakral ijab kabul dan kebersamaan keluarga inti dengan alur yang ringkas dan bebas rasa khawatir.',
      };
    }

    return {
      packageName: 'Signature Packages',
      packageSlug: 'signature-packages',
      tagline: 'Paling Ideal & Komprehensif',
      crewEstimate: '8 - 10 Kru Profesional',
      suitableFor: 'Gedung Serbaguna & Resepsi Standar Pekanbaru (300-600 tamu)',
      reason:
        'Pilihan paling seimbang dengan pengawalan lengkap sejak gladi bersih, asisten pengantin, kordinasi katering, hingga pelepasan pengantin.',
    };
  };

  const result = getRecommendation();

  const venueLabel = {
    rumah: 'Kediaman / Rumah / Masjid',
    gedung: 'Gedung Serbaguna (GSG)',
    ballroom: 'Grand Ballroom Hotel',
  }[venueType];

  const guestLabel = {
    intimate: '< 300 Tamu Undangan',
    medium: '300 - 600 Tamu Undangan',
    grand: '> 600 Tamu Undangan',
  }[guestScale];

  const durationLabel = {
    akad: 'Akad Nikah Saja',
    standar: 'Akad & Resepsi Siang',
    fullday: 'Full Day (Akad Pagi + Resepsi Malam)',
  }[duration];

  const waMessage = `Halo Dua Insan Organizer, saya mencoba fitur pencari paket di website dan tertarik dengan ${result.packageName}.\n\nRencana Pernikahan Kami:\n• Lokasi: ${venueLabel}\n• Estimasi Undangan: ${guestLabel}\n• Rangkaian Acara: ${durationLabel}\n\nApakah tanggal kami masih tersedia untuk konsultasi?`;

  const waUrl = buildWhatsAppLink({ customMessage: waMessage });

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-brand-border/60">
      <Container size="lg">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-forest/5 border border-brand-forest/15 text-xs font-semibold text-brand-forest uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Fitur Interaktif Calon Pengantin</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-forest tracking-tight">
            Temukan Paket yang Tepat dalam 3 Detik
          </h2>

          <p className="text-base text-brand-muted leading-relaxed">
            Bingung menentukan jumlah kru dan paket yang sesuai? Pilih kriteria rencana pernikahan Anda di bawah ini untuk melihat rekomendasi tim kami.
          </p>
        </div>

        {/* Interactive Matcher Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Controls Box */}
          <div className="lg:col-span-7 space-y-6 p-6 sm:p-8 rounded-2xl bg-brand-ivory/50 border border-brand-border">
            {/* Criteria 1: Venue */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-forest flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-brand-olive" />
                <span>1. Di mana rencana lokasi acara Anda?</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'rumah', label: 'Rumah / Masjid' },
                  { id: 'gedung', label: 'Gedung Serbaguna' },
                  { id: 'ballroom', label: 'Grand Ballroom' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVenueType(item.id as typeof venueType)}
                    className={`py-3 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      venueType === item.id
                        ? 'bg-brand-forest text-white border-brand-forest shadow-xs'
                        : 'bg-white text-brand-charcoal border-brand-border hover:border-brand-olive/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria 2: Guest Scale */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-forest flex items-center space-x-2">
                <Users className="w-4 h-4 text-brand-olive" />
                <span>2. Berapa perkiraan jumlah undangan?</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'intimate', label: '< 300 Tamu' },
                  { id: 'medium', label: '300 - 600 Tamu' },
                  { id: 'grand', label: '> 600 Tamu' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGuestScale(item.id as typeof guestScale)}
                    className={`py-3 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      guestScale === item.id
                        ? 'bg-brand-forest text-white border-brand-forest shadow-xs'
                        : 'bg-white text-brand-charcoal border-brand-border hover:border-brand-olive/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria 3: Duration */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-forest flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brand-olive" />
                <span>3. Rangkaian waktu acara?</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'akad', label: 'Akad Saja' },
                  { id: 'standar', label: 'Akad & Resepsi' },
                  { id: 'fullday', label: 'Full Day Malam' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDuration(item.id as typeof duration)}
                    className={`py-3 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      duration === item.id
                        ? 'bg-brand-forest text-white border-brand-forest shadow-xs'
                        : 'bg-white text-brand-charcoal border-brand-border hover:border-brand-olive/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation Output Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-forest to-brand-forest-dark text-white shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-brand-ochre">
                  ✦ Rekomendasi Paling Cocok
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/10 text-white/90">
                  {result.crewEstimate}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {result.packageName}
                </h3>
                <p className="text-xs text-brand-ochre/90 mt-1 font-medium">
                  {result.tagline}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
                <span className="text-[11px] font-semibold text-white/80 block uppercase tracking-wider">
                  Alasan Rekomendasi:
                </span>
                <p className="text-xs text-white/90 leading-relaxed font-sans">
                  {result.reason}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-xl text-xs font-semibold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Konsultasikan Paket Ini via WhatsApp</span>
              </a>

              <Link
                href={`/paket/${result.packageSlug}`}
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-medium transition-colors"
              >
                <span>Lihat Fasilitas Lengkap Paket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
