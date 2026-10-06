import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './index';
import path from 'path';

export async function runMigrations() {
  console.log('Starting database migrations...');
  const migrationsFolder = path.resolve(process.cwd(), 'src/server/db/migrations');
  
  try {
    await migrate(db, { migrationsFolder });
    console.log('Database migrations applied successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
