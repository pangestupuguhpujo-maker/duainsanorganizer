import { runMigrations } from './migrate';
import { seed } from './seed';
import { db } from './index';
import { portfolios } from './schema';

async function setup() {
  try {
    // Test if portfolios table exists and has data
    const existing = await db.select().from(portfolios).limit(1);
    if (existing.length > 0) {
      console.log('Database already initialized with portfolio data.');
      return;
    }
    console.log('Database table empty. Running seed...');
    await seed();
  } catch {
    console.log('Database tables not found. Running migrations and seed...');
    await runMigrations();
    await seed();
    console.log('Database initialized successfully.');
  }
}

setup().catch((e) => {
  console.error('Setup build warning:', e);
});
