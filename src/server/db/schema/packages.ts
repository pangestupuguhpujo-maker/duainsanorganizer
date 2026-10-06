import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { services } from './services';

export const packages = sqliteTable(
  'packages',
  {
    id: text('id').primaryKey(),
    serviceId: text('service_id').references(() => services.id, { onDelete: 'set null' }),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    shortDescription: text('short_description').notNull(),
    description: text('description').notNull(),
    startingPrice: integer('starting_price').notNull(), // in IDR
    priceNote: text('price_note'), // e.g. "Kapasitas hingga 500 tamu"
    coverImage: text('cover_image').notNull(),
    isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(false),
    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
    displayOrder: integer('display_order').notNull().default(0),
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (table) => [
    index('idx_packages_slug').on(table.slug),
    index('idx_packages_active_featured').on(table.isActive, table.isFeatured),
    index('idx_packages_order').on(table.displayOrder),
  ]
);

export const packageFeatures = sqliteTable(
  'package_features',
  {
    id: text('id').primaryKey(),
    packageId: text('package_id')
      .notNull()
      .references(() => packages.id, { onDelete: 'cascade' }),
    featureText: text('feature_text').notNull(),
    isIncluded: integer('is_included', { mode: 'boolean' }).notNull().default(true),
    displayOrder: integer('display_order').notNull().default(0),
  },
  (table) => [
    index('idx_pkg_features_pkg_id').on(table.packageId),
  ]
);
