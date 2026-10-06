import * as React from 'react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloatingButton() {
  const waUrl = buildWhatsAppLink();

  return (
    <aside aria-label="Kontak WhatsApp Langsung">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi cepat via WhatsApp"
        className="fixed bottom-6 right-6 z-30 inline-flex items-center space-x-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#1EBE5D] hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
          Konsultasi via WhatsApp
        </span>
      </a>
    </aside>
  );
}
