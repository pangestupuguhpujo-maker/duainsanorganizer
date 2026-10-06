import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const faqs = sqliteTable(
  'faqs',
  {
    id: text('id').primaryKey(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    category: text('category').notNull().default('Umum'),
    displayOrder: integer('display_order').notNull().default(0),
    isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(true),
  },
  (table) => [
    index('idx_faqs_published_order').on(table.isPublished, table.displayOrder),
    index('idx_faqs_category').on(table.category),
  ]
);
