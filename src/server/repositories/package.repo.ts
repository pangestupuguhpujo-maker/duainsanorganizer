import { db } from '../db';
import { packages, packageFeatures } from '../db/schema';
import { eq, and, asc } from 'drizzle-orm';

export interface PackageWithFeatures {
  id: string;
  serviceId: string | null;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  priceNote: string | null;
  coverImage: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: number;
  updatedAt: number;
  features: {
    id: string;
    featureText: string;
    isIncluded: boolean;
    displayOrder: number;
  }[];
}

export async function getFeaturedPackages(): Promise<PackageWithFeatures[]> {
  const pkgs = await db
    .select()
    .from(packages)
    .where(and(eq(packages.isActive, true), eq(packages.isFeatured, true)))
    .orderBy(asc(packages.displayOrder));

  if (!pkgs.length) return [];

  const pkgIds = pkgs.map((p) => p.id);
  const allFeatures = await db
    .select()
    .from(packageFeatures)
    .orderBy(asc(packageFeatures.displayOrder));

  return pkgs.map((pkg) => ({
    ...pkg,
    features: allFeatures.filter((f) => f.packageId === pkg.id),
  }));
}

export async function getAllActivePackages(): Promise<PackageWithFeatures[]> {
  const pkgs = await db
    .select()
    .from(packages)
    .where(eq(packages.isActive, true))
    .orderBy(asc(packages.displayOrder));

  if (!pkgs.length) return [];

  const allFeatures = await db
    .select()
    .from(packageFeatures)
    .orderBy(asc(packageFeatures.displayOrder));

  return pkgs.map((pkg) => ({
    ...pkg,
    features: allFeatures.filter((f) => f.packageId === pkg.id),
  }));
}

export async function getPackageBySlug(slug: string): Promise<PackageWithFeatures | null> {
  const [pkg] = await db
    .select()
    .from(packages)
    .where(and(eq(packages.slug, slug), eq(packages.isActive, true)))
    .limit(1);

  if (!pkg) return null;

  const features = await db
    .select()
    .from(packageFeatures)
    .where(eq(packageFeatures.packageId, pkg.id))
    .orderBy(asc(packageFeatures.displayOrder));

  return {
    ...pkg,
    features,
  };
}
