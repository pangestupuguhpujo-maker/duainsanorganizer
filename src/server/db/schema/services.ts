import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const services = sqliteTable(
  'services',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    shortDescription: text('short_description').notNull(),
    description: text('description').notNull(),
    icon: text('icon'),
    displayOrder: integer('display_order').notNull().default(0),
    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (table) => [
    index('idx_services_slug').on(table.slug),
    index('idx_services_order').on(table.displayOrder),
  ]
);
