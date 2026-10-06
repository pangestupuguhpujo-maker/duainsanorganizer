import * as React from 'react';
import { HomeHero } from '@/components/features/home/HomeHero';
import { HomeVenueTicker } from '@/components/features/home/HomeVenueTicker';
import { HomeValues } from '@/components/features/home/HomeValues';
import { HomePackages } from '@/components/features/home/HomePackages';
import { HomePackageMatcher } from '@/components/features/home/HomePackageMatcher';
import { HomeProcess } from '@/components/features/home/HomeProcess';
import { HomePortfolio } from '@/components/features/home/HomePortfolio';
import { HomeTestimonials } from '@/components/features/home/HomeTestimonials';
import { HomeFaq } from '@/components/features/home/HomeFaq';
import { HomeCta } from '@/components/features/home/HomeCta';
import { getAllActivePackages } from '@/server/repositories/package.repo';
import { getFeaturedPortfolios } from '@/server/repositories/portfolio.repo';
import { getFeaturedTestimonials } from '@/server/repositories/testimonial.repo';
import { getAllPublishedFaqs } from '@/server/repositories/faq.repo';

export const revalidate = 3600; // ISR 1 hour

export default async function HomePage() {
  const [packages, portfolios, testimonials, faqs] = await Promise.all([
    getAllActivePackages(),
    getFeaturedPortfolios(),
    getFeaturedTestimonials(),
    getAllPublishedFaqs(),
  ]);

  return (
    <>
      <HomeHero />
      <HomeVenueTicker />
      <HomeValues />
      <HomePackages packages={packages} />
      <HomePackageMatcher />
      <HomeProcess />
      <HomePortfolio portfolios={portfolios} />
      <HomeTestimonials testimonials={testimonials} />
      <HomeFaq faqs={faqs.slice(0, 4)} />
      <HomeCta />
    </>
  );
}
