import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { packages } from './packages';

export const leadStatusEnum = [
  'NEW',
  'CONTACTED',
  'CONSULTATION',
  'PROPOSAL',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
] as const;

export type LeadStatus = (typeof leadStatusEnum)[number];

export const leads = sqliteTable(
  'leads',
  {
    id: text('id').primaryKey(),
    fullName: text('full_name').notNull(),
    whatsappNumber: text('whatsapp_number').notNull(),
    email: text('email'),
    eventDate: text('event_date').notNull(),
    venueLocation: text('venue_location').notNull(),
    city: text('city').notNull(),
    guestCountEstimate: integer('guest_count_estimate').notNull(),
    interestedPackageId: text('interested_package_id').references(() => packages.id, {
      onDelete: 'set null',
    }),
    budgetRange: text('budget_range'),
    message: text('message'),
    preferredContactMethod: text('preferred_contact_method', {
      enum: ['WHATSAPP', 'EMAIL', 'PHONE'],
    })
      .notNull()
      .default('WHATSAPP'),
    status: text('status', { enum: leadStatusEnum }).notNull().default('NEW'),
    adminNotes: text('admin_notes'),
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (table) => [
    index('idx_leads_status').on(table.status),
    index('idx_leads_created_at').on(table.createdAt),
    index('idx_leads_event_date').on(table.eventDate),
  ]
);
