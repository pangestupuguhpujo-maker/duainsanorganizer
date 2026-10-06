'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HomeFaqProps {
  faqs: FaqItem[];
  isFullPage?: boolean;
}

export function HomeFaq({ faqs, isFullPage = false }: HomeFaqProps) {
  const [openId, setOpenId] = React.useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const content = (
    <>
      {!isFullPage && (
        <SectionHeading
          badge="Pertanyaan Umum"
          title="Hal yang Sering Ditanyakan Calon Pengantin"
          description="Jawaban transparan seputar proses kerja, sistem pembayaran, dan pelaksanaan teknis bersama Dua Insan."
        />
      )}

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-lg border border-brand-border overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                aria-expanded={isOpen}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between font-serif text-base sm:text-lg font-normal text-brand-forest hover:text-brand-forest-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest"
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-brand-olive transition-transform duration-200 flex-shrink-0',
                    isOpen && 'rotate-180 text-brand-forest'
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-brand-muted leading-relaxed border-t border-brand-border/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        {isFullPage ? (
          <div>
            <p className="text-sm text-brand-muted mb-4">
              Punya pertanyaan spesifik mengenai venue, konsep adat, atau ketersediaan tanggal?
            </p>
            <Link href="/konsultasi">
              <Button variant="primary" size="md">
                Konsultasi Gratis Bersama Tim Kami
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-sm text-brand-muted mb-4">
              Punya pertanyaan spesifik mengenai venue atau adat tertentu?
            </p>
            <Link href="/faq">
              <Button variant="outline" size="md">
                Lihat Seluruh Tanya Jawab
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );

  if (isFullPage) {
    return <div className="mt-8">{content}</div>;
  }

  return (
    <section className="py-16 sm:py-24 bg-brand-ivory border-b border-brand-border/60">
      <Container size="md">{content}</Container>
    </section>
  );
}
