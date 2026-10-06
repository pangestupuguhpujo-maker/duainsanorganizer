import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight, MapPin, Calendar, Sparkles } from 'lucide-react';
import type { PortfolioWithImages } from '@/server/repositories/portfolio.repo';

interface HomePortfolioProps {
  portfolios: PortfolioWithImages[];
}

export function HomePortfolio({ portfolios }: HomePortfolioProps) {
  const featured = portfolios[0];
  const remaining = portfolios.slice(1, 3);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-brand-border/60">
      <Container size="lg">
        <SectionHeading
          badge="Dokumentasi Acara"
          title="Momen Bahagia yang Telah Kami Kawal"
          description="Setiap pasangan memiliki cerita unik. Lihat bagaimana kami mewujudkan konsep pernikahan impian di Pekanbaru dengan sentuhan kehangatan."
        />

        {featured && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            {/* Left: Featured Large Editorial Showcase */}
            <div className="lg:col-span-7">
              <Link
                href={`/portfolio/${featured.slug}`}
                className="group block h-full bg-brand-ivory/60 rounded-2xl border border-brand-border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-brand-ivory">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    unoptimized
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: 'center 46%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-brand-forest shadow-xs backdrop-blur-xs flex items-center space-x-1.5">
                      <Sparkles className="w-3 h-3 text-brand-ochre" />
                      <span>{featured.category}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-wider font-medium text-brand-ochre/90 block mb-0.5">
                      Dokumentasi Terpilih
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal drop-shadow-sm">
                      {featured.coupleName}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted">
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-brand-olive" />
                        {featured.venueName}, {featured.city}
                      </span>
                      {featured.eventDate && (
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-brand-olive" />
                          {featured.eventDate}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-brand-muted leading-relaxed line-clamp-3">
                      {featured.storyDescription}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-brand-border/70 flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-forest group-hover:text-brand-olive transition-colors flex items-center">
                      Lihat Cerita & Galeri Foto Lengkap
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-xs text-brand-muted">
                      {featured.images.length ? `${featured.images.length} Foto Momen` : 'Dokumentasi Rapi'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Stacked Secondary Stories */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {remaining.map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug}`}
                  className="group flex-1 bg-brand-ivory/60 rounded-2xl border border-brand-border overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row lg:flex-col"
                >
                  <div className="relative aspect-[16/9] sm:w-1/2 lg:w-full overflow-hidden bg-brand-ivory flex-shrink-0">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: 'center 35%' }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/95 text-brand-forest shadow-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-xs text-brand-muted">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-brand-olive" />
                          {item.venueName}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl font-normal text-brand-forest group-hover:text-brand-forest-light transition-colors">
                        {item.coupleName}
                      </h4>
                      <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                        {item.storyDescription}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-brand-border/60 flex items-center text-xs font-semibold text-brand-forest">
                      <span>Buka Album</span>
                      <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 text-center">
          <Link href="/portfolio">
            <Button variant="outline" size="lg" className="bg-white/80 hover:bg-white">
              Eksplorasi Seluruh Dokumentasi Pernikahan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
