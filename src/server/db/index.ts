import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const defaultUrl = 'libsql://duainsan-db-pangestupuguhpujo-maker.aws-ap-northeast-1.turso.io';
const defaultToken = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTEzMDYyNDUsImlkIjoiMDFhMTEyMmItYzkwMS03MWI2LTgzMDItM2IyZGU0YmVjMWFjIiwia2lkIjoiQlBNd1dlbklNeFJCOTkwejlzOGIxLXoybW1GQzFjSjI4Z2prc3dtZ0V0MCIsInJpZCI6ImUzMjAzODNmLTZjMTAtNGQ5MS04NzZiLWU3MmQ3MGEzY2E3ZCJ9.sm_W51BmNqFtlvDtlCz80s8I9kk3CeLzLtHKg_e1akcyNCSLTNWF-alK2ZvopU4c9X4LVucyF-7xgWdEuh60Aw';

const rawUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || defaultUrl;
const url = rawUrl.trim().replace(/^["']|["']$/g, '');
const rawAuthToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN || defaultToken;
const authToken = rawAuthToken ? rawAuthToken.trim().replace(/^["']|["']$/g, '') : undefined;

export const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
export type AppDatabase = typeof db;

