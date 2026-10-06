import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const rawUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:local.db';
const url = rawUrl.trim().replace(/^["']|["']$/g, '');
const rawAuthToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;
const authToken = rawAuthToken ? rawAuthToken.trim().replace(/^["']|["']$/g, '') : undefined;

export const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
export type AppDatabase = typeof db;

