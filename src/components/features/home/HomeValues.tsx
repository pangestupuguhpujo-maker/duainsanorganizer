import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { Clock, Calculator, BookOpen, HeartHandshake, Shield, Sparkles, CheckCircle } from 'lucide-react';

const values = [
  {
    number: '01',
    icon: <Clock className="w-5 h-5 text-brand-forest" />,
    title: 'Rundown Menit ke Menit & Skenario Cadangan',
    description:
      'Setiap transisi prosesi, kedatangan pengantin, hingga sesi santap siang dirancang presisi dengan rencana cadangan (Plan B) yang siap dieksekusi tanpa panik.',
  },
  {
    number: '02',
    icon: <Calculator className="w-5 h-5 text-brand-forest" />,
    title: 'Transparansi Penuh Tanpa Mark-up Vendor',
    description:
      'Pengelolaan anggaran terbuka. Anda bebas memilih rekanan vendor dekorasi, katering, atau MUA terbaik di Pekanbaru dengan pembayaran langsung tanpa biaya tersembunyi.',
  },
  {
    number: '03',
    icon: <BookOpen className="w-5 h-5 text-brand-forest" />,
    title: 'Penghayatan Tradisi Adat & Protokoler Modern',
    description:
      'Berpengalaman mengawal tata upacara adat Melayu, Minangkabau, Jawa, Batak, hingga prosesi nasional modern dengan tata krama santun dan khidmat.',
  },
  {
    number: '04',
    icon: <Shield className="w-5 h-5 text-brand-forest" />,
    title: 'Pengamanan Mahar, Logistik & Kotak Amplop',
    description:
      'Sistem serah terima mahar yang tertib, pengawalan alur kado/amplop bersama keluarga inti, serta usher khusus untuk kenyamanan tamu kehormatan/VIP.',
  },
];

export function HomeValues() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-brand-border/60">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Editorial Statement */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-forest/5 border border-brand-forest/15 text-xs font-semibold text-brand-forest uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
              <span>Filosofi & Integritas Kerja</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-forest leading-[1.2] tracking-tight">
              Ketelitian Penuh Kasih di Balik Setiap Momen Sakral
            </h2>

            <p className="text-base text-brand-muted leading-relaxed">
              Bagi kami, pernikahan bukan sekadar memandu urutan acara di atas panggung. Ini adalah hari sekali seumur hidup yang mempertemukan doa, restu, dan kehormatan dua keluarga besar.
            </p>

            {/* Special Highlight Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-ivory to-[#F5F2EB] border border-brand-border/90 shadow-xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-brand-forest text-white">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-brand-forest">
                    Asisten Pribadi Pengantin (Bride Assistant)
                  </h4>
                  <p className="text-xs text-brand-muted">
                    Pendampingan fisik & ketenangan mental
                  </p>
                </div>
              </div>
              <p className="text-xs text-brand-charcoal/80 leading-relaxed border-t border-brand-border/70 pt-3">
                Kru khusus yang selalu berada di samping kedua mempelai—memastikan hidrasi cukup, kerapian busana tetap prima, hingga membantu mengatasi rasa gugup sebelum melangkah ke pelaminan.
              </p>
            </div>
          </div>

          {/* Right: Structured Value Blocks */}
          <div className="lg:col-span-7 space-y-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="group p-6 sm:p-7 rounded-2xl bg-brand-ivory/50 border border-brand-border/80 hover:bg-white hover:border-brand-ochre/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <span className="font-serif text-2xl font-light text-brand-ochre group-hover:text-brand-forest transition-colors">
                      {v.number}
                    </span>
                    <div className="w-px h-8 bg-brand-border mt-2 hidden sm:block" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white border border-brand-border shadow-2xs group-hover:border-brand-ochre/40 transition-colors">
                        {v.icon}
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-brand-forest">
                        {v.title}
                      </h3>
                    </div>
                    <p className="text-sm text-brand-muted leading-relaxed pl-0 sm:pl-11">
                      {v.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
