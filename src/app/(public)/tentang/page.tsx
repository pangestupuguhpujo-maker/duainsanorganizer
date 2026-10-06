import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, HeartHandshake, Shield, Sparkles, Calendar, ArrowRight, Award, Compass, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Mengenal lebih dekat Dua Insan Organizer, filosofi kerja, dan komitmen kami dalam mendampingi calon pengantin mewujudkan prosesi pernikahan yang khidmat di Pekanbaru, Riau.',
};

export default function TentangPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container size="lg">
        {/* Header with Luxury Badge & Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Mengenal Dua Insan Organizer</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-brand-forest tracking-tight leading-[1.15]">
            Menemani Setiap Detik Perjalanan Menuju{' '}
            <span className="italic text-brand-olive font-light">Ikrar Suci</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-sans">
            Lahir dari keyakinan bahwa hari pernikahan adalah perayaan cinta dan kehormatan keluarga yang harus dinikmati dengan penuh ketenangan, kepastian, dan kehangatan.
          </p>
        </div>

        {/* Story Section with Arch Frame & Layered Floating Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Arch Framed Image */}
              <div className="relative aspect-[4/3] rounded-t-[80px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white bg-brand-ivory z-10">
                <Image
                  src="/images/tentang-kami.jpg"
                  alt="Momen Bahagia Pengantin Bersama Dua Insan Organizer Pekanbaru"
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Social Proof Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-brand-border/80 z-20 max-w-[260px]">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-brand-forest text-white">
                    <Award className="w-5 h-5 text-brand-ochre" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-forest block">
                      Dedikasi Penuh
                    </span>
                    <span className="text-[11px] text-brand-muted block">
                      1 Tim Eksklusif / Hari Tanpa Bagi Kru
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-olive uppercase tracking-wider">
              <Compass className="w-4 h-4 text-brand-ochre" />
              <span>Filosofi & Integritas Pelayanan</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-forest font-normal leading-snug">
              Bukan Sekadar Mengatur Panggung, Melainkan Merawat Ketenangan Hati
            </h2>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Bagi kami, pernikahan adalah pertemuan dua keluarga besar, pertalian janji suci, dan awal dari sebuah babak hidup baru. Tidak boleh ada kekacauan jadwal, vendor yang salah paham, atau orang tua yang kebingungan mencari arah prosesi.
            </p>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Oleh sebab itu, kami menolak pendekatan kerja yang terburu-buru. Setiap pasangan kami dampingi layaknya sahabat dekat, memastikan setiap detail adat dan keinginan pribadi terlaksana dengan etika santun dan ketelitian mutlak.
            </p>

            <div className="pt-2 space-y-3.5">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-forest mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-brand-charcoal font-medium">
                  Kapten Tim Lapangan & Asisten Pengantin (Bride Assistant) yang siaga mendampingi
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-forest mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-brand-charcoal font-medium">
                  Rundown presisi menit ke menit dengan rencana cadangan (Plan B) teruji
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-forest mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-brand-charcoal font-medium">
                  Pengamanan tertib untuk serah terima mahar, logistik, dan kotak amplop keluarga
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Excellence */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-olive mb-2 block">
              Prinsip Kerja Kami
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
              Tiga Nilai yang Menjaga Kepercayaan Anda
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                icon: Shield,
                title: 'Integritas & Keterbukaan',
                description:
                  'Semua penawaran harga, koordinasi vendor, dan jadwal kerja disampaikan secara transparan tanpa mark-up maupun biaya tersembunyi.',
              },
              {
                number: '02',
                icon: HeartHandshake,
                title: 'Pendekatan Manusiawi & Santun',
                description:
                  'Memahami sensitivitas keluarga, mendengarkan masukan para orang tua, dan memprioritaskan ketenangan mental kedua calon mempelai.',
              },
              {
                number: '03',
                icon: Sparkles,
                title: 'Standar Eksekusi Prima',
                description:
                  'Kapten tim dan seluruh kru bergerak selaras di lapangan, sigap menangani perubahan tak terduga dengan pembawaan tenang dan profesional.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-white border border-brand-border/80 shadow-xs hover:border-brand-ochre/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-brand-ochre group-hover:text-brand-forest transition-colors">
                      {pillar.number}
                    </span>
                    <div className="p-3 rounded-xl bg-brand-ivory border border-brand-border group-hover:bg-brand-forest group-hover:text-white transition-colors">
                      <pillar.icon className="w-5 h-5 text-brand-forest group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <h4 className="font-serif text-xl font-normal text-brand-forest mb-3">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Pekanbaru Heritage Banner */}
        <div className="rounded-3xl bg-brand-forest text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl mb-16">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-ochre px-3.5 py-1 rounded-full bg-white/10 border border-brand-ochre/30 inline-block">
              ✦ Pemahaman Tradisi Adat Nusantara
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug">
              Berpengalaman Mengawal Prosesi Adat Melayu, Minangkabau, Jawa, Batak, hingga Nasional Modern
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-2xl mx-auto">
              Setiap tata cara adat memiliki kesakralan dan urutan yang tidak boleh keliru. Tim kami memastikan setiap tahapan dijalankan dengan rasa hormat kepada para tetua dan keluarga besar.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/konsultasi">
                <Button variant="primary" size="lg" className="bg-brand-ochre text-brand-forest hover:bg-brand-ochre/90">
                  <Calendar className="w-4 h-4 mr-2" />
                  Konsultasikan Acara Anda
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Lihat Dokumentasi Kami
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
