import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Sparkles, Coffee, Home, Video, FileText } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description:
    'Kontak resmi Dua Insan Wedding Organizer Pekanbaru. Layanan temu janji fleksibel di cafe pilihan atau kunjungan langsung ke rumah calon klien, nomor WhatsApp, dan email resmi.',
};

export default function KontakPage() {
  const waUrl = buildWhatsAppLink({
    customMessage: 'Halo Dua Insan Organizer, saya ingin mengatur janji temu konsultasi pernikahan di Pekanbaru.',
  });

  return (
    <div className="py-12 sm:py-20">
      <Container size="lg">
        {/* Header with Luxury Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Kontak & Temu Janji Fleksibel</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-brand-forest tracking-tight leading-[1.15]">
            Mari Duduk Bersama Membicarakan{' '}
            <span className="italic text-brand-olive font-light">Hari Bahagia Anda</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-sans">
            Tanpa sekat dan tanpa rasa cemas. Kami siap menemui Anda di cafe favorit, berkunjung ke rumah untuk musyawarah keluarga, maupun konsultasi daring dari mana saja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20 sm:mb-28">
          {/* Left: Contact Info Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-brand-border/80 p-8 sm:p-10 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-brand-olive uppercase tracking-wider block">
                  Informasi Resmi
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-brand-forest">
                  Saluran Komunikasi Langsung
                </h2>
              </div>

              <div className="space-y-5 text-sm text-brand-charcoal pt-2">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-brand-ivory border border-brand-border text-brand-forest mt-0.5 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-olive" />
                  </div>
                  <div>
                    <strong className="block text-brand-forest font-medium text-base">Area Layanan & Temu Janji</strong>
                    <span className="text-brand-muted leading-relaxed text-sm">
                      Pekanbaru, Riau & Sekitarnya
                      <span className="block text-xs text-brand-muted/80 mt-1">
                        (Temu janji fleksibel di cafe pilihan atau kunjungan langsung ke kediaman calon pengantin)
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-brand-ivory border border-brand-border text-brand-forest mt-0.5 flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-olive" />
                  </div>
                  <div>
                    <strong className="block text-brand-forest font-medium text-base">Telepon / WhatsApp</strong>
                    <span className="text-brand-muted text-sm">{siteConfig.contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-brand-ivory border border-brand-border text-brand-forest mt-0.5 flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-olive" />
                  </div>
                  <div>
                    <strong className="block text-brand-forest font-medium text-base">Email Resmi</strong>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-brand-forest hover:text-brand-olive transition-colors text-sm"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-brand-ivory border border-brand-border text-brand-forest mt-0.5 flex-shrink-0">
                    <InstagramIcon className="w-5 h-5 text-brand-olive" />
                  </div>
                  <div>
                    <strong className="block text-brand-forest font-medium text-base">Instagram Resmi</strong>
                    <a
                      href={siteConfig.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-forest hover:text-brand-olive transition-colors text-sm"
                    >
                      {siteConfig.contact.instagram}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-brand-ivory border border-brand-border text-brand-forest mt-0.5 flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-olive" />
                  </div>
                  <div>
                    <strong className="block text-brand-forest font-medium text-base">Waktu Konsultasi</strong>
                    <span className="text-brand-muted text-sm">{siteConfig.contact.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-border/70 flex flex-col sm:flex-row gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="whatsapp" size="md" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2 fill-current" />
                    Chat WhatsApp
                  </Button>
                </a>
                <Link href="/konsultasi" className="flex-1">
                  <Button variant="primary" size="md" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Formulir Reservasi
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Flexible On-Location Meeting System */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-brand-border/80 p-8 sm:p-10 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-brand-olive uppercase tracking-wider block">
                  Kenyamanan Anda Prioritas Kami
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-brand-forest">
                  Fasilitas Temu Janji Fleksibel
                </h2>
              </div>

              <p className="text-sm text-brand-muted leading-relaxed font-sans">
                Karena kami belum mengoperasikan kantor fisik umum di Pekanbaru, seluruh proses konsultasi kami hadirkan secara jemput bola (*on-location*). Anda bebas menentukan lokasi yang paling tenang:
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    icon: Coffee,
                    title: 'Temu Janji di Cafe / Coffee Shop',
                    desc: 'Diskusi santai dan leluasa di cafe favorit Anda di area Pekanbaru untuk membedah moodboard, tema dekorasi, dan konsep acara.',
                  },
                  {
                    icon: Home,
                    title: 'Kunjungan Langsung ke Rumah Calon Pengantin',
                    desc: 'Tim kami siap berkunjung langsung ke kediaman Anda untuk musyawarah keluarga bersama orang tua tanpa repot keluar rumah.',
                  },
                  {
                    icon: Video,
                    title: 'Konsultasi Daring (Online Meeting)',
                    desc: 'Tersedia sesi Zoom atau WhatsApp Video Call bagi calon pengantin yang sedang bertugas atau berdomisili di luar kota Pekanbaru.',
                  },
                  {
                    icon: FileText,
                    title: 'Sampel Dokumentasi & Simulasi Anggaran',
                    desc: 'Kami membawakan portofolio dokumentasi fisik asli serta memaparkan simulasi alokasi anggaran langsung di lokasi pertemuan.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-brand-ivory/50 border border-brand-border/80 hover:bg-white hover:border-brand-ochre/40 transition-all flex items-start space-x-3.5"
                  >
                    <div className="p-2 rounded-xl bg-white border border-brand-border text-brand-forest mt-0.5 flex-shrink-0 shadow-2xs">
                      <item.icon className="w-4 h-4 text-brand-olive" />
                    </div>
                    <div>
                      <strong className="block text-brand-forest font-serif text-base mb-1">
                        {item.title}
                      </strong>
                      <span className="text-xs sm:text-sm text-brand-muted leading-relaxed block">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-brand-forest text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl text-center space-y-5">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-ochre px-3.5 py-1 rounded-full bg-white/10 border border-brand-ochre/30 inline-block">
            ✦ Kuota Eksklusif Terbatas
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug">
            Ingin Memastikan Ketersediaan Tanggal Acara Anda Terlebih Dahulu?
          </h3>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-xl mx-auto">
            Karena kami memegang teguh komitmen 1 Tim Khusus per Hari, kami sarankan memeriksa ketersediaan tanggal seawal mungkin.
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-brand-ochre hover:bg-brand-ochre/90 text-brand-forest font-medium px-6 py-3.5 rounded-xl text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Cek Ketersediaan Tanggal Sekarang</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
