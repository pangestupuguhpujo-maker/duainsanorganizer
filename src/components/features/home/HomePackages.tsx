import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import type { PackageWithFeatures } from '@/server/repositories/package.repo';
import { getPackageImageConfig } from '@/lib/constants/package-images';

interface HomePackagesProps {
  packages: PackageWithFeatures[];
}

export function HomePackages({ packages }: HomePackagesProps) {
  return (
    <section className="py-20 lg:py-28 bg-brand-ivory border-b border-brand-border/60">
      <Container size="lg">
        <SectionHeading
          badge="Paket Pilihan"
          title="Pilihan Layanan Pernikahan Terstruktur"
          description="Dirancang untuk berbagai skala pesta pernikahan di Pekanbaru, dari keintiman keluarga kecil hingga perhelatan akbar di grand ballroom."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {packages.map((pkg) => {
            const imgConfig = getPackageImageConfig(pkg.slug);
            const isFeatured = pkg.slug.includes('signature') || pkg.isFeatured;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group ${
                  isFeatured
                    ? 'bg-white border-2 border-brand-ochre shadow-xl lg:-translate-y-3 z-10'
                    : 'bg-white/95 border border-brand-border/90 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Spotlight Banner for Featured Package */}
                {isFeatured && (
                  <div className="bg-brand-forest text-white text-center py-2 px-4 text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
                    <span>Pilihan Favorit Calon Pengantin</span>
                  </div>
                )}

                {/* Cover Image */}
                <div className={`relative ${imgConfig.cardAspectRatio} w-full overflow-hidden bg-brand-ivory`}>
                  <Image
                    src={imgConfig.cardImage || pkg.coverImage}
                    alt={pkg.name}
                    fill
                    unoptimized
                    priority={isFeatured}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: imgConfig.cardObjectPosition }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-brand-forest shadow-xs backdrop-blur-xs">
                      {pkg.priceNote || 'Tersedia'}
                    </span>
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-brand-forest mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-brand-muted line-clamp-2 mb-4 leading-relaxed">
                      {pkg.shortDescription}
                    </p>

                    <div className="pt-3 pb-4 border-t border-b border-brand-border/60 mb-5 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-brand-muted block uppercase tracking-wider font-semibold">
                          Investasi Layanan
                        </span>
                        <span className="font-serif text-xl sm:text-2xl font-medium text-brand-forest">
                          Konsultasi Penawaran
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-forest/5 text-brand-forest border border-brand-forest/15">
                        {isFeatured ? 'Kru Lengkap' : 'Terstandar'}
                      </span>
                    </div>

                    {/* Feature Highlights */}
                    <ul className="space-y-2.5 mb-6 text-sm">
                      {pkg.features.slice(0, 4).map((f) => (
                        <li key={f.id} className="flex items-start text-brand-charcoal text-xs sm:text-sm">
                          <Check className="w-4 h-4 text-brand-olive mr-2.5 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{f.featureText}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 space-y-2.5">
                    <Link href={`/paket/${pkg.slug}`} className="block w-full">
                      <Button
                        variant={isFeatured ? 'primary' : 'outline'}
                        size="md"
                        className="w-full"
                      >
                        Detail & Fasilitas Paket
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Consultation Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-brand-border/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-lg sm:text-xl font-normal text-brand-forest">
              Punya Konsep Khusus atau Skala Acara Berbeda?
            </h4>
            <p className="text-sm text-brand-muted max-w-xl">
              Kami juga melayani intimate wedding di kediaman, akad di masjid, maupun resepsi khusus dengan penyesuaian jumlah tim pendamping.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/konsultasi">
              <Button variant="secondary" size="md">
                <MessageCircle className="w-4 h-4 mr-2" />
                Diskusikan Kebutuhan Anda
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
