import { db } from '../db';
import { leads, packages, type LeadStatus } from '../db/schema';
import { eq, desc, and, count, like, sql } from 'drizzle-orm';
import crypto from 'crypto';

export interface CreateLeadParams {
  fullName: string;
  whatsappNumber: string;
  email?: string;
  eventDate: string;
  venueLocation: string;
  city: string;
  guestCountEstimate: number;
  interestedPackageId?: string;
  budgetRange?: string;
  message?: string;
  preferredContactMethod: 'WHATSAPP' | 'EMAIL' | 'PHONE';
}

export async function createLead(params: CreateLeadParams) {
  const id = crypto.randomUUID();
  const now = Date.now();

  const [created] = await db
    .insert(leads)
    .values({
      id,
      fullName: params.fullName,
      whatsappNumber: params.whatsappNumber,
      email: params.email || null,
      eventDate: params.eventDate,
      venueLocation: params.venueLocation,
      city: params.city,
      guestCountEstimate: params.guestCountEstimate,
      interestedPackageId: params.interestedPackageId || null,
      budgetRange: params.budgetRange || null,
      message: params.message || null,
      preferredContactMethod: params.preferredContactMethod,
      status: 'NEW',
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return created;
}

export interface GetLeadsFilter {
  page?: number;
  limit?: number;
  status?: LeadStatus | 'ALL';
  search?: string;
}

export async function getLeadsPaginated(filter: GetLeadsFilter = {}) {
  const page = Math.max(1, filter.page || 1);
  const limit = Math.max(1, Math.min(100, filter.limit || 15));
  const offset = (page - 1) * limit;

  const conditions = [];

  if (filter.status && filter.status !== 'ALL') {
    conditions.push(eq(leads.status, filter.status));
  }

  if (filter.search && filter.search.trim()) {
    const term = `%${filter.search.trim()}%`;
    conditions.push(
      sql`(${leads.fullName} LIKE ${term} OR ${leads.whatsappNumber} LIKE ${term} OR ${leads.city} LIKE ${term})`
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [totalResult] = await db
    .select({ total: count() })
    .from(leads)
    .where(whereClause);

  const total = totalResult?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const items = await db
    .select({
      id: leads.id,
      fullName: leads.fullName,
      whatsappNumber: leads.whatsappNumber,
      email: leads.email,
      eventDate: leads.eventDate,
      venueLocation: leads.venueLocation,
      city: leads.city,
      guestCountEstimate: leads.guestCountEstimate,
      budgetRange: leads.budgetRange,
      preferredContactMethod: leads.preferredContactMethod,
      status: leads.status,
      adminNotes: leads.adminNotes,
      createdAt: leads.createdAt,
      updatedAt: leads.updatedAt,
      packageName: packages.name,
    })
    .from(leads)
    .leftJoin(packages, eq(leads.interestedPackageId, packages.id))
    .where(whereClause)
    .orderBy(desc(leads.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}

export async function getLeadById(id: string) {
  const [result] = await db
    .select({
      id: leads.id,
      fullName: leads.fullName,
      whatsappNumber: leads.whatsappNumber,
      email: leads.email,
      eventDate: leads.eventDate,
      venueLocation: leads.venueLocation,
      city: leads.city,
      guestCountEstimate: leads.guestCountEstimate,
      budgetRange: leads.budgetRange,
      message: leads.message,
      preferredContactMethod: leads.preferredContactMethod,
      status: leads.status,
      adminNotes: leads.adminNotes,
      createdAt: leads.createdAt,
      updatedAt: leads.updatedAt,
      interestedPackageId: leads.interestedPackageId,
      packageName: packages.name,
      packageStartingPrice: packages.startingPrice,
    })
    .from(leads)
    .leftJoin(packages, eq(leads.interestedPackageId, packages.id))
    .where(eq(leads.id, id))
    .limit(1);

  return result || null;
}

export async function updateLeadStatus(id: string, status: LeadStatus, adminNotes?: string) {
  const now = Date.now();

  const [updated] = await db
    .update(leads)
    .set({
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : undefined,
      updatedAt: now,
    })
    .where(eq(leads.id, id))
    .returning();

  return updated;
}
