import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const siteSettings = sqliteTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  description: text('description'),
  updatedAt: integer('updated_at').notNull(),
});
