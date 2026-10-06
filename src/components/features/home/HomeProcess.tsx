import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MessageSquare, Palette, ClipboardCheck, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    phase: 'Tahap Persiapan Awal',
    icon: <MessageSquare className="w-5 h-5 text-brand-forest" />,
    title: 'Konsultasi & Penentuan Arah',
    description:
      'Mendengarkan impian pernikahan Anda, memetakan skala tamu di Pekanbaru, preferensi adat keluarga, serta menyusun estimasi anggaran yang realistis.',
  },
  {
    number: '02',
    phase: 'Tahap Pengembangan Konsep',
    icon: <Palette className="w-5 h-5 text-brand-forest" />,
    title: 'Kurasi Rekanan Vendor',
    description:
      'Penyusunan moodboard visual serta rekomendasi vendor terpercaya (venue, dekorasi, katering, foto/video, MC, hingga busana) sesuai selera Anda.',
  },
  {
    number: '03',
    phase: 'Tahap Penyelarasan Tim',
    icon: <ClipboardCheck className="w-5 h-5 text-brand-forest" />,
    title: 'Rundown & Technical Meeting',
    description:
      'Penyusunan panduan acara menit ke menit, simulasi mitigasi kendala lapangan bersama seluruh vendor pada TM, serta gladi bersih keluarga inti.',
  },
  {
    number: '04',
    phase: 'Hari Bahagia',
    icon: <Sparkles className="w-5 h-5 text-brand-forest" />,
    title: 'Pelaksanaan Khidmat Hari-H',
    description:
      'Kapten Tim dan kru Dua Insan mengawal alur acara secara sigap dan santun di lapangan, memastikan kedua mempelai dan orang tua tersenyum tenang.',
  },
];

export function HomeProcess() {
  return (
    <section className="py-20 lg:py-28 bg-brand-ivory border-b border-brand-border/60">
      <Container size="lg">
        <SectionHeading
          badge="Alur Pendampingan"
          title="Empat Langkah Menuju Ketenangan Hari Bahagia"
          description="Sistem kerja terencana yang mengeliminasi kebingungan calon pengantin sejak tahap ide awal hingga hari pelaksanaan."
        />

        {/* Sequential Connected Step Cards */}
        <div className="relative pt-6">
          {/* Subtle connector line on desktop */}
          <div className="hidden lg:block absolute top-16 left-16 right-16 h-[2px] bg-gradient-to-r from-brand-border via-brand-ochre/40 to-brand-border -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col p-6 sm:p-7 rounded-2xl bg-white border border-brand-border/80 shadow-xs hover:border-brand-ochre/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Step Top Bar: Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-light text-brand-ochre group-hover:text-brand-forest transition-colors">
                    {step.number}
                  </span>
                  <div className="p-3 rounded-xl bg-brand-ivory border border-brand-border shadow-2xs group-hover:bg-brand-forest group-hover:text-white transition-all">
                    {React.cloneElement(step.icon, {
                      className: 'w-5 h-5 text-brand-forest group-hover:text-white transition-colors',
                    })}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <span className="text-[11px] font-semibold text-brand-olive uppercase tracking-wider block">
                    {step.phase}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-brand-forest group-hover:text-brand-forest-light transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
