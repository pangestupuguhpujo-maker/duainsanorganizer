import { siteConfig } from '@/config/site';

export interface WhatsAppMessageParams {
  packageName?: string;
  clientName?: string;
  eventDate?: string;
  customMessage?: string;
}

export function buildWhatsAppLink(params?: WhatsAppMessageParams): string {
  let phone = siteConfig.contact.whatsapp.replace(/\D/g, '');
  if (phone.startsWith('0')) {
    phone = '62' + phone.slice(1);
  }

  let text = 'Halo Dua Insan Organizer, saya ingin berkonsultasi mengenai rencana pernikahan kami.';

  if (params?.packageName) {
    text = `Halo Dua Insan Organizer, saya tertarik dengan paket "${params.packageName}" dan ingin menanyakan informasi ketersediaan jadwal serta detail penawaran.`;
  }

  if (params?.clientName && params?.eventDate) {
    text = `Halo Dua Insan Organizer, saya ${params.clientName}. Kami merencanakan pernikahan pada tanggal ${params.eventDate} dan ingin berkonsultasi mengenai layanan Wedding Organizer.`;
  }

  if (params?.customMessage) {
    text = params.customMessage;
  }

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
