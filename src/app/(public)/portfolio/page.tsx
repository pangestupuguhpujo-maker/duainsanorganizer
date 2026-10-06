import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getAllPublishedPortfolios } from '@/server/repositories/portfolio.repo';
import { MapPin, Calendar, ArrowRight, Sparkles, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portofolio Pernikahan',
  description:
    'Galeri dokumentasi momen sakral dan resepsi pernikahan yang telah sukses dikawal oleh tim Dua Insan Organizer di berbagai venue ternama Pekanbaru, Riau.',
};

export default async function PortfolioPage() {
  const portfoliosList = await getAllPublishedPortfolios();
  const featured = portfoliosList[0];
  const gallery = portfoliosList.slice(1);

  return (
    <div className="py-12 sm:py-20">
      <Container size="lg">
        {/* Header with Luxury Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Dokumentasi & Portofolio Pengantin</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-brand-forest tracking-tight leading-[1.15]">
            Setiap Pasangan Memiliki Kisah yang{' '}
            <span className="italic text-brand-olive font-light">Abadi</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-sans">
            Inspirasi nyata dari berbagai pesta pernikahan adat nusantara, konsep modern, hingga jamuan intimate wedding yang telah kami kawal dengan penuh dedikasi di Pekanbaru.
          </p>
        </div>

        {/* Featured Large Editorial Lookbook (Item 0) */}
        {featured && (
          <div className="mb-14 sm:mb-20">
            <Link
              href={`/portfolio/${featured.slug}`}
              className="group block rounded-3xl overflow-hidden shadow-xl border border-brand-border/80 bg-white hover:border-brand-ochre/50 hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Left: Portrait Cover Photo (Full View, No Cropping of Faces) */}
                <div className="lg:col-span-5 relative bg-gradient-to-b from-[#F5F2EB] to-brand-ivory p-6 sm:p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-brand-ivory">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      unoptimized
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: 'center 46%' }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-brand-forest shadow-xs backdrop-blur-xs flex items-center space-x-1.5">
                        <Sparkles className="w-3 h-3 text-brand-ochre" />
                        <span>{featured.category} • Dokumentasi Utama</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Editorial Narrative & Details */}
                <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
                      <span>Dokumentasi Terpilih</span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-forest tracking-tight leading-[1.15]">
                      {featured.coupleName}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-muted font-sans">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-brand-olive" />
                        {featured.venueName}, {featured.city}
                      </span>
                      {featured.eventDate && (
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-brand-olive" />
                          {featured.eventDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-sans line-clamp-4">
                    {featured.storyDescription}
                  </p>

                  <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-brand-forest group-hover:text-brand-olive transition-colors">
                    <span>Buka Cerita & Galeri Foto Lengkap</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 sm:mb-28">
          {(gallery.length > 0 ? gallery : portfoliosList).map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group block bg-white rounded-2xl border border-brand-border/80 overflow-hidden shadow-xs hover:border-brand-ochre/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-ivory">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: 'center 38%' }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-brand-forest shadow-xs backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center space-x-3 text-xs text-brand-muted mb-2">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-brand-olive" />
                      {item.venueName}{item.city ? `, ${item.city}` : ''}
                    </span>
                    {item.eventDate && (
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-brand-olive" />
                        {item.eventDate}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-brand-forest group-hover:text-brand-forest-light transition-colors mb-2">
                    {item.coupleName}
                  </h3>

                  <p className="text-sm text-brand-muted line-clamp-2 leading-relaxed mb-4">
                    {item.storyDescription}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-forest group-hover:text-brand-olive transition-colors">
                  <span>Lihat Dokumentasi</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-forest to-brand-forest-dark text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-ochre px-3.5 py-1 rounded-full bg-white/10 border border-brand-ochre/30 inline-block">
              ✦ Rencanakan Hari Bahagia Anda
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug">
              Ingin Konsep Pernikahan Impian Anda Terlaksana Sempurna?
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-2xl mx-auto">
              Diskusikan ide tema, alokasi anggaran, dan ketersediaan tanggal pernikahan Anda bersama tim Dua Insan Organizer.
            </p>
            <div className="pt-3">
              <Link href="/konsultasi">
                <Button variant="primary" size="lg" className="bg-brand-ochre text-brand-forest hover:bg-brand-ochre/90">
                  Konsultasikan Acara Anda Bersama Kami
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
