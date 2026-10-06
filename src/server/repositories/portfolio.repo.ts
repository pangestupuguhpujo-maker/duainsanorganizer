import { db } from '../db';
import { portfolios, portfolioImages } from '../db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';

export interface PortfolioWithImages {
  id: string;
  title: string;
  slug: string;
  coupleName: string;
  eventDate: string | null;
  venueName: string;
  city: string;
  category: string;
  coverImage: string;
  storyDescription: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: number;
  updatedAt: number;
  images: {
    id: string;
    imageUrl: string;
    caption: string | null;
    displayOrder: number;
  }[];
}

export async function getFeaturedPortfolios(): Promise<PortfolioWithImages[]> {
  const items = await db
    .select()
    .from(portfolios)
    .where(and(eq(portfolios.isPublished, true), eq(portfolios.isFeatured, true)))
    .orderBy(desc(portfolios.createdAt))
    .limit(6);

  if (!items.length) return [];

  const allImages = await db
    .select()
    .from(portfolioImages)
    .orderBy(asc(portfolioImages.displayOrder));

  return items.map((p) => ({
    ...p,
    images: allImages.filter((img) => img.portfolioId === p.id),
  }));
}

export async function getAllPublishedPortfolios(category?: string): Promise<PortfolioWithImages[]> {
  let query = db
    .select()
    .from(portfolios)
    .where(eq(portfolios.isPublished, true))
    .orderBy(desc(portfolios.createdAt));

  const items = await query;
  if (!items.length) return [];

  const allImages = await db
    .select()
    .from(portfolioImages)
    .orderBy(asc(portfolioImages.displayOrder));

  const mapped = items.map((p) => ({
    ...p,
    images: allImages.filter((img) => img.portfolioId === p.id),
  }));

  if (category && category !== 'Semua') {
    return mapped.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  return mapped;
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioWithImages | null> {
  const [item] = await db
    .select()
    .from(portfolios)
    .where(and(eq(portfolios.slug, slug), eq(portfolios.isPublished, true)))
    .limit(1);

  if (!item) return null;

  const images = await db
    .select()
    .from(portfolioImages)
    .where(eq(portfolioImages.portfolioId, item.id))
    .orderBy(asc(portfolioImages.displayOrder));

  return {
    ...item,
    images,
  };
}
