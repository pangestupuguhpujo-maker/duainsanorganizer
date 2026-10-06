import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const testimonials = sqliteTable(
  'testimonials',
  {
    id: text('id').primaryKey(),
    clientName: text('client_name').notNull(),
    weddingTitle: text('wedding_title').notNull(), // e.g., "Pernikahan Adat Jawa di Plataran Cilandak"
    quote: text('quote').notNull(),
    rating: integer('rating').notNull().default(5),
    clientPhoto: text('client_photo'),
    eventDate: text('event_date'),
    isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(false),
    isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(true),
    displayOrder: integer('display_order').notNull().default(0),
    createdAt: integer('created_at').notNull(),
  },
  (table) => [
    index('idx_testimonials_published').on(table.isPublished, table.isFeatured),
    index('idx_testimonials_order').on(table.displayOrder),
  ]
);
