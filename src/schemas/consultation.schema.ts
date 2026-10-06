import { z } from 'zod';

export const consultationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Nama lengkap minimal 2 karakter')
    .max(100, 'Nama lengkap maksimal 100 karakter'),
  whatsappNumber: z
    .string()
    .trim()
    .min(9, 'Nomor WhatsApp minimal 9 digit')
    .max(16, 'Nomor WhatsApp maksimal 16 digit')
    .regex(/^[0-9+]+$/, 'Nomor WhatsApp hanya boleh berisi angka dan tanda +'),
  email: z
    .string()
    .trim()
    .email('Format email tidak valid')
    .optional()
    .or(z.literal('')),
  eventDate: z
    .string()
    .min(1, 'Tanggal rencana pernikahan wajib diisi'),
  venueLocation: z
    .string()
    .trim()
    .min(2, 'Nama gedung / venue / area wajib diisi')
    .max(150, 'Nama lokasi maksimal 150 karakter'),
  city: z
    .string()
    .trim()
    .min(2, 'Kota rencana acara wajib diisi')
    .max(50, 'Nama kota maksimal 50 karakter'),
  guestCountEstimate: z.coerce
    .number()
    .min(10, 'Estimasi tamu minimal 10 orang')
    .max(10000, 'Estimasi tamu melebihi batas wajar'),
  interestedPackageId: z
    .string()
    .optional()
    .or(z.literal('')),
  budgetRange: z
    .string()
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .max(1000, 'Pesan maksimal 1000 karakter')
    .optional()
    .or(z.literal('')),
  preferredContactMethod: z
    .enum(['WHATSAPP', 'EMAIL', 'PHONE'])
    .default('WHATSAPP'),
  // Honeypot field for anti-spam. Must remain empty!
  website_trap: z.string().optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, 'Anda harus menyetujui kebijakan privasi untuk melanjutkan'),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
