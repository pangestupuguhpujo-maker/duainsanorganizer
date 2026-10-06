import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Star, ArrowRight, Sparkles, Quote } from 'lucide-react';

interface TestimonialItem {
  id: string;
  clientName: string;
  weddingTitle: string;
  quote: string;
  rating: number;
  clientPhoto: string | null;
  eventDate: string | null;
}

interface HomeTestimonialsProps {
  testimonials: TestimonialItem[];
}

export function HomeTestimonials({ testimonials }: HomeTestimonialsProps) {
  return (
    <section className="py-20 lg:py-28 bg-brand-ivory/60 border-b border-brand-border/60">
      <Container size="lg">
        <SectionHeading
          badge="Cerita Nyata Pengantin"
          title="Kepercayaan Tulus dari Mereka yang Telah Berbahagia"
          description="Rasa syukur dan kebahagiaan pasangan pengantin serta ketenangan orang tua adalah tolak ukur keberhasilan terbesar bagi tim Dua Insan Organizer."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative group p-7 sm:p-8 rounded-2xl bg-white border border-brand-border/80 shadow-xs hover:border-brand-ochre/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle Quote Watermark */}
              <div className="absolute top-6 right-6 text-brand-forest/5 group-hover:text-brand-ochre/15 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              <div>
                {/* Rating Stars & Event Date */}
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

                {/* Quote Body */}
                <p className="text-sm text-brand-charcoal/90 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3.5 pt-4 border-t border-brand-border/70">
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
                  <h4 className="font-serif text-base font-medium text-brand-forest">
                    {t.clientName}
                  </h4>
                  <p className="text-xs text-brand-muted truncate">
                    {t.weddingTitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/testimoni">
            <Button variant="outline" size="lg" className="bg-white/80 hover:bg-white">
              Baca Seluruh Cerita & Ulasan Pengantin
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
