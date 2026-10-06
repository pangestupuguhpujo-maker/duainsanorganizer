import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getPortfolioBySlug, getAllPublishedPortfolios } from '@/server/repositories/portfolio.repo';
import { MapPin, Calendar, ArrowLeft, HeartHandshake } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getAllPublishedPortfolios();
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);

  if (!item) {
    return { title: 'Portofolio Tidak Ditemukan' };
  }

  return {
    title: `${item.title} - Portofolio Dua Insan`,
    description: item.storyDescription,
    openGraph: {
      title: `${item.title} | Dua Insan Organizer`,
      description: item.storyDescription,
      images: [{ url: item.coverImage }],
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <Container size="lg">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-brand-olive hover:text-brand-forest transition-colors bg-white px-3.5 py-1.5 rounded-full border border-brand-border shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Kembali ke Semua Portofolio
          </Link>
        </div>

        {/* Header story */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-[11px] font-semibold text-brand-forest uppercase tracking-widest">
            <span>✦ Dokumentasi Resmi Dua Insan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-forest tracking-tight leading-[1.15]">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm text-brand-muted font-sans">
            <span className="flex items-center">
              <HeartHandshake className="w-4 h-4 mr-1.5 text-brand-olive" />
              Mempelai: <strong className="ml-1 text-brand-charcoal">{item.coupleName}</strong>
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-brand-olive" />
              {item.venueName}, {item.city}
            </span>
            {item.eventDate && (
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-brand-olive" />
                {item.eventDate}
              </span>
            )}
          </div>
        </div>

        {/* Cover Photo - Framed to prevent cropping on vertical/portrait photos */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-brand-border/80 mb-16 bg-gradient-to-b from-[#F5F2EB] via-brand-ivory to-white p-6 sm:p-10 flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-brand-ivory">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
              style={{ objectPosition: 'center 46%' }}
            />
          </div>
        </div>

        {/* Story Paragraph */}
        <div className="max-w-3xl mx-auto mb-20 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-brand-forest text-center">
            Cerita di Balik Hari Bahagia
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal/90 leading-relaxed whitespace-pre-line text-center">
            {item.storyDescription}
          </p>
        </div>

        {/* Gallery Images (Excludes Cover Photo) */}
        {(() => {
          const galleryImages = item.images.filter((img) => img.imageUrl !== item.coverImage);
          if (galleryImages.length === 0) return null;

          return (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="font-serif text-2xl font-normal text-brand-forest">
                  Dokumentasi Galeri Momen
                </h3>
                <p className="text-sm text-brand-muted mt-1">
                  Koleksi foto prosesi dan detail dekorasi acara
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="bg-white rounded-2xl border border-brand-border/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/3] w-full bg-brand-ivory">
                      <Image
                        src={img.imageUrl}
                        alt={img.caption || item.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {img.caption && (
                      <div className="p-4 text-center">
                        <p className="text-xs text-brand-muted italic">
                          {img.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Bottom CTA */}
        <div className="mt-20 p-8 sm:p-12 bg-gradient-to-br from-brand-forest to-brand-forest-dark text-white rounded-3xl border border-brand-ochre/30 text-center max-w-2xl mx-auto space-y-5 shadow-xl">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-ochre px-3.5 py-1 rounded-full bg-white/10 border border-brand-ochre/30 inline-block">
            ✦ Konsultasikan Konsep Pernikahan
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Ingin Mewujudkan Konsep Serupa?
          </h3>
          <p className="text-sm text-white/80 leading-relaxed font-sans">
            Diskusikan ketersediaan venue, rancangan dekorasi pelaminan, dan kebutuhan tim pendamping Anda bersama Wedding Planner Dua Insan Organizer.
          </p>
          <div className="pt-2">
            <Link href="/konsultasi">
              <Button variant="primary" size="lg" className="bg-brand-ochre text-brand-forest hover:bg-brand-ochre/90">
                Jadwalkan Konsultasi Acara Anda
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
