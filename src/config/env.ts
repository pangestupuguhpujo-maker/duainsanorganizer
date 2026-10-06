import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().default('file:./local.db'),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Dua Insan Organizer'),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().default('6281234567890'),
  NEXT_PUBLIC_OFFICE_CITY: z.string().default('Jakarta Selatan'),
  NEXT_PUBLIC_OFFICE_ADDRESS: z.string().default('Jl. Gandaria Tengah III No. 12, Kebayoran Baru, Jakarta Selatan'),
});

const parsedEnv = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_OFFICE_CITY: process.env.NEXT_PUBLIC_OFFICE_CITY,
  NEXT_PUBLIC_OFFICE_ADDRESS: process.env.NEXT_PUBLIC_OFFICE_ADDRESS,
});

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Environment configuration error. Please check your .env file.');
}

export const env = parsedEnv.data;
