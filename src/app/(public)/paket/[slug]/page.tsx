import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getPackageBySlug, getAllActivePackages } from '@/server/repositories/package.repo';
import { formatRupiah } from '@/lib/utils';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Check, Calendar, MessageCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { getPackageImageConfig } from '@/lib/constants/package-images';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pkgs = await getAllActivePackages();
  return pkgs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    return { title: 'Paket Tidak Ditemukan' };
  }

  return {
    title: `${pkg.name} - Paket Wedding Organizer`,
    description: pkg.shortDescription,
    openGraph: {
      title: `${pkg.name} | Dua Insan Organizer`,
      description: pkg.shortDescription,
      images: [{ url: pkg.coverImage }],
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const waUrl = buildWhatsAppLink({ packageName: pkg.name });

  return (
    <div className="py-12 sm:py-16">
      <Container size="lg">
        {/* Breadcrumb Back Link */}
        <div className="mb-8">
          <Link
            href="/paket"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-brand-olive hover:text-brand-forest transition-colors bg-white px-3.5 py-1.5 rounded-full border border-brand-border shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Kembali ke Katalog Paket
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-[11px] font-semibold text-brand-forest uppercase tracking-widest">
                <span>✦ Fasilitas Pernikahan Terpadu</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-brand-forest tracking-tight leading-[1.15]">
                {pkg.name}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-sans">
                {pkg.shortDescription}
              </p>
            </div>

            {/* Cover Image */}
            {(() => {
              const imgConfig = getPackageImageConfig(pkg.slug);
              return (
                <div className={`relative ${imgConfig.detailAspectRatio} rounded-2xl overflow-hidden shadow-md border border-brand-border/80 bg-brand-ivory group`}>
                  <Image
                    src={imgConfig.detailImage || pkg.coverImage}
                    alt={pkg.name}
                    fill
                    priority
                    unoptimized
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    style={{ objectPosition: imgConfig.detailObjectPosition }}
                  />
                </div>
              );
            })()}

            {/* Full Description */}
            <div className="space-y-4 pt-2">
              <h2 className="font-serif text-2xl font-normal text-brand-forest">
                Deskripsi & Alur Pelaksanaan
              </h2>
              <p className="text-sm sm:text-base text-brand-charcoal/90 leading-relaxed whitespace-pre-line">
                {pkg.description}
              </p>
            </div>

            {/* Detailed Feature List */}
            <div className="space-y-6 pt-4 border-t border-brand-border">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-brand-forest">
                  Rincian Cakupan Layanan
                </h2>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-olive bg-brand-olive/10 px-3 py-1 rounded-full">
                  {pkg.features.length} Item Terpadu
                </span>
              </div>

              {/* Categorized Features */}
              {(() => {
                const grouped: Record<string, { id: string; text: string }[]> = {};
                pkg.features.forEach((feature) => {
                  const parts = feature.featureText.split(': ');
                  const category = parts.length > 1 ? parts[0] : 'Kelengkapan Acara';
                  const itemText = parts.length > 1 ? parts.slice(1).join(': ') : feature.featureText;
                  if (!grouped[category]) {
                    grouped[category] = [];
                  }
                  grouped[category].push({ id: feature.id, text: itemText });
                });

                return (
                  <div className="space-y-6">
                    {Object.entries(grouped).map(([category, items]) => (
                      <div
                        key={category}
                        className="bg-white rounded-xl border border-brand-border/80 p-5 sm:p-6 shadow-2xs space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
                          <h3 className="font-serif text-lg sm:text-xl font-medium text-brand-forest flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-ochre mr-2.5 inline-block" />
                            {category}
                          </h3>
                          <span className="text-xs text-brand-muted">
                            {items.length} Komponen
                          </span>
                        </div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {items.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-start text-xs sm:text-sm text-brand-charcoal"
                            >
                              <div className="p-1 rounded-full bg-brand-forest/10 text-brand-forest mr-2.5 mt-0.5 flex-shrink-0">
                                <Check className="w-3 h-3" />
                              </div>
                              <span className="leading-snug">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-brand-muted font-semibold block">
                  Investasi Paket
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-brand-forest mt-1 block">
                  Konsultasi Penawaran
                </span>
                {pkg.priceNote && (
                  <p className="text-xs text-brand-muted mt-1.5 font-medium">
                    {pkg.priceNote}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-lg bg-brand-ivory/60 border border-brand-border space-y-2">
                <div className="flex items-center text-xs font-medium text-brand-forest">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                  Kunci Tanggal dengan DP 20%
                </div>
                <p className="text-[11px] text-brand-muted leading-relaxed">
                  Jadwal pernikahan Anda akan terkunci secara eksklusif. Kami hanya menerima 1 pesta pernikahan per hari untuk menjaga fokus dan kualitas layanan kru.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link href={`/konsultasi?paket=${pkg.id}`} className="block w-full">
                  <Button variant="primary" size="lg" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Pesan Jadwal Konsultasi
                  </Button>
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="whatsapp" size="lg" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2 fill-current" />
                    Tanya via WhatsApp
                  </Button>
                </a>
              </div>

              <div className="pt-4 border-t border-brand-border/60 text-center">
                <span className="text-xs text-brand-muted">
                  Butuh penyesuaian jumlah tamu atau rundown khusus? Sampaikan pada sesi konsultasi pertama.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
