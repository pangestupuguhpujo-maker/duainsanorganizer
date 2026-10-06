'use server';

import { consultationSchema } from '@/schemas/consultation.schema';
import { createLead } from '../repositories/lead.repo';
import { checkRateLimit } from '../auth/rate-limit';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export interface ConsultationActionState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  whatsAppRedirectUrl?: string;
}

export async function submitConsultationAction(
  prevState: ConsultationActionState | null,
  formData: FormData
): Promise<ConsultationActionState> {
  const rawData = {
    fullName: formData.get('fullName'),
    whatsappNumber: formData.get('whatsappNumber'),
    email: formData.get('email') || '',
    eventDate: formData.get('eventDate'),
    venueLocation: formData.get('venueLocation'),
    city: formData.get('city'),
    guestCountEstimate: formData.get('guestCountEstimate'),
    interestedPackageId: formData.get('interestedPackageId') || '',
    budgetRange: formData.get('budgetRange') || '',
    message: formData.get('message') || '',
    preferredContactMethod: formData.get('preferredContactMethod') || 'WHATSAPP',
    website_trap: formData.get('website_trap') || '',
    consent: formData.get('consent') === 'on' || formData.get('consent') === 'true',
  };

  const validation = consultationSchema.safeParse(rawData);
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false, fieldErrors };
  }

  const data = validation.data;

  // 1. Anti-spam honeypot detection
  // If the hidden website_trap field is filled by a bot, simulate success without writing to database
  if (data.website_trap && data.website_trap.trim().length > 0) {
    return { success: true };
  }

  // 2. Rate limiting (max 3 submissions per 10 minutes per phone number)
  const phoneKey = data.whatsappNumber.replace(/\D/g, '');
  const rateLimit = checkRateLimit({
    key: `lead:submit:${phoneKey}`,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.success) {
    return {
      success: false,
      error: 'Anda telah mengirimkan beberapa permohonan. Tim kami akan segera menghubungi Anda melalui nomor WhatsApp yang terdaftar.',
    };
  }

  try {
    // 3. Persist to database
    await createLead({
      fullName: data.fullName,
      whatsappNumber: data.whatsappNumber,
      email: data.email || undefined,
      eventDate: data.eventDate,
      venueLocation: data.venueLocation,
      city: data.city,
      guestCountEstimate: data.guestCountEstimate,
      interestedPackageId: data.interestedPackageId || undefined,
      budgetRange: data.budgetRange || undefined,
      message: data.message || undefined,
      preferredContactMethod: data.preferredContactMethod,
    });

    // 4. Generate optional instant WhatsApp follow-up URL
    const waUrl = buildWhatsAppLink({
      clientName: data.fullName,
      eventDate: data.eventDate,
      customMessage: `Halo Dua Insan Organizer, saya ${data.fullName}. Saya baru saja mengirimkan formulir konsultasi pernikahan untuk tanggal ${data.eventDate} di ${data.venueLocation}, ${data.city}. Mohon informasinya mengenai langkah selanjutnya. Terima kasih.`,
    });

    return {
      success: true,
      whatsAppRedirectUrl: waUrl,
    };
  } catch (error) {
    console.error('Failed to submit consultation lead:', error);
    return {
      success: false,
      error: 'Terjadi gangguan saat menyimpan permohonan Anda. Silakan coba kembali atau hubungi kami langsung via WhatsApp.',
    };
  }
}
