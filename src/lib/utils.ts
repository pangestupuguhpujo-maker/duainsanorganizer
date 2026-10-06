import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(timestampOrDate: number | string | Date): string {
  const date = typeof timestampOrDate === 'number' || typeof timestampOrDate === 'string'
    ? new Date(timestampOrDate)
    : timestampOrDate;

  if (isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(timestampOrDate: number | string | Date): string {
  const date = typeof timestampOrDate === 'number' || typeof timestampOrDate === 'string'
    ? new Date(timestampOrDate)
    : timestampOrDate;

  if (isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
