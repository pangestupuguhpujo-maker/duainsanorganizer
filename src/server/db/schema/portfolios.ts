import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const portfolios = sqliteTable(
  'portfolios',
  {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    coupleName: text('couple_name').notNull(),
    eventDate: text('event_date'), // YYYY-MM-DD
    venueName: text('venue_name').notNull(),
    city: text('city').notNull(),
    category: text('category').notNull(), // 'Tradisional' | 'Modern' | 'Intimate' | 'Outdoor'
    coverImage: text('cover_image').notNull(),
    storyDescription: text('story_description').notNull(),
    isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(false),
    isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(true),
    createdAt: integer('created_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (table) => [
    index('idx_portfolios_slug').on(table.slug),
    index('idx_portfolios_published_featured').on(table.isPublished, table.isFeatured),
    index('idx_portfolios_category').on(table.category),
  ]
);

export const portfolioImages = sqliteTable(
  'portfolio_images',
  {
    id: text('id').primaryKey(),
    portfolioId: text('portfolio_id')
      .notNull()
      .references(() => portfolios.id, { onDelete: 'cascade' }),
    imageUrl: text('image_url').notNull(),
    caption: text('caption'),
    displayOrder: integer('display_order').notNull().default(0),
  },
  (table) => [
    index('idx_portfolio_images_portfolio_id').on(table.portfolioId),
  ]
);
