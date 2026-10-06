import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { getAllActivePackages } from '@/server/repositories/package.repo';
import { Check, ArrowRight, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { getPackageImageConfig } from '@/lib/constants/package-images';
import { HomePackageMatcher } from '@/components/features/home/HomePackageMatcher';

export const metadata: Metadata = {
  title: 'Paket Wedding Organizer',
  description:
    'Daftar paket pernikahan lengkap Dua Insan Organizer: Essential Packages, Signature Packages, dan Prestige Packages di Pekanbaru, Riau.',
};

export default async function PaketPage() {
  const packagesList = await getAllActivePackages();

  return (
    <div className="py-12 sm:py-20">
      <Container size="lg">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Katalog Paket Pernikahan Terpadu</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-brand-forest tracking-tight leading-[1.15]">
            Paket Layanan yang Transparan &{' '}
            <span className="italic text-brand-olive font-light">Penuh Makna</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-sans">
            Seluruh paket dirancang secara terpadu mengintegrasikan tim pengawal, dekorasi pelaminan, tata rias, dokumentasi, hingga protokoler acara dengan fleksibilitas kustomisasi penuh.
          </p>
        </div>

        {/* Packages Grid with Signature Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-2 mb-20 sm:mb-28">
          {packagesList.map((pkg) => {
            const imgConfig = getPackageImageConfig(pkg.slug);
            const isFeatured = pkg.slug.includes('signature');

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-white border-2 border-brand-ochre shadow-xl lg:-translate-y-3 z-10'
                    : 'bg-white/95 border border-brand-border/90 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Spotlight Top Bar */}
                  {isFeatured && (
                    <div className="bg-brand-forest text-white text-center py-2 px-4 text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
                      <span>Pilihan Favorit Calon Pengantin</span>
                    </div>
                  )}

                  {/* Image Cover */}
                  <div className={`relative ${imgConfig.cardAspectRatio} w-full overflow-hidden bg-brand-ivory group`}>
                    <Image
                      src={imgConfig.cardImage || pkg.coverImage}
                      alt={pkg.name}
                      fill
                      unoptimized
                      priority={isFeatured}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: imgConfig.cardObjectPosition }}
                    />
                    {pkg.priceNote && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-brand-forest shadow-xs backdrop-blur-xs">
                          {pkg.priceNote}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <h2 className="font-serif text-2xl font-normal text-brand-forest mb-2">
                      {pkg.name}
                    </h2>
                    <p className="text-sm text-brand-muted leading-relaxed mb-5">
                      {pkg.shortDescription}
                    </p>

                    <div className="pt-3 pb-4 border-t border-b border-brand-border/60 mb-6 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-brand-muted block uppercase tracking-wider font-semibold">
                          Investasi Layanan
                        </span>
                        <span className="font-serif text-xl sm:text-2xl font-normal text-brand-forest">
                          Konsultasi Penawaran
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-forest/5 text-brand-forest border border-brand-forest/15">
                        {isFeatured ? 'Kru Lengkap' : 'Terstandar'}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <span className="text-xs uppercase font-semibold tracking-wider text-brand-olive block">
                        Cakupan Utama Paket:
                      </span>
                      <ul className="space-y-2.5">
                        {pkg.features.slice(0, 6).map((f) => (
                          <li key={f.id} className="flex items-start text-xs sm:text-sm text-brand-charcoal">
                            <Check className="w-4 h-4 text-brand-olive mr-2.5 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{f.featureText}</span>
                          </li>
                        ))}
                      </ul>
                      {pkg.features.length > 6 && (
                        <p className="text-xs text-brand-muted/90 italic pt-1 pl-6">
                          + Termasuk {pkg.features.length - 6} item fasilitas detail lainnya...
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 sm:p-7 pt-0 space-y-2.5">
                  <Link href={`/paket/${pkg.slug}`} className="block w-full">
                    <Button variant={isFeatured ? 'primary' : 'outline'} size="md" className="w-full">
                      Rincian Lengkap & Fasilitas
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                  <Link href={`/konsultasi?paket=${pkg.id}`} className="block w-full">
                    <Button variant="secondary" size="md" className="w-full bg-brand-ivory hover:bg-white text-brand-forest">
                      Reservasi Jadwal Paket Ini
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Matcher Section inside Paket Page */}
        <div className="mb-20 sm:mb-28">
          <HomePackageMatcher />
        </div>

        {/* Customization Callout Strip */}
        <div className="rounded-3xl bg-brand-forest text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-ochre px-3.5 py-1 rounded-full bg-white/10 border border-brand-ochre/30 inline-block">
              ✦ Layanan Kustomisasi Penuh
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug">
              Ingin Menyesuaikan Vendor atau Skala Acara Tertentu?
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-2xl mx-auto">
              Setiap keluarga memiliki kebutuhan berbeda. Kami dapat menyesuaikan rincian dekorasi, dokumentasi, atau jumlah kru untuk mewujudkan konsep intimate di kediaman maupun resepsi akbar di ballroom.
            </p>
            <div className="pt-3">
              <Link href="/konsultasi">
                <Button variant="primary" size="lg" className="bg-brand-ochre text-brand-forest hover:bg-brand-ochre/90">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Diskusikan Kebutuhan Bersama Tim Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
