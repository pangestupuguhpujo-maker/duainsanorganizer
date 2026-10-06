import * as React from 'react';
import { Sparkles, MapPin } from 'lucide-react';

const venues = [
  'Grand Ballroom Hotel Ratu Mayang Garden',
  'Gedung Serbaguna AURI Pekanbaru',
  'Hotel Aryaduta Pekanbaru',
  'Labersa Grand Hotel & Convention',
  'The Premiere Hotel Pekanbaru',
  'Menara BRK Syariah Ballroom',
  'Balai Guru Penggerak Riau',
  'SKA Co-Ex Pekanbaru',
  'Pernikahan Kediaman Pribadi & Outdoor',
];

export function HomeVenueTicker() {
  return (
    <section 
      aria-label="Venue dan Rekanan Pernikahan di Pekanbaru"
      className="relative w-full overflow-hidden bg-white border-y border-brand-border/80 py-4"
    >
      <div className="flex items-center">
        {/* Label Badge */}
        <div className="hidden lg:flex items-center space-x-2 pl-6 pr-4 py-1 z-10 bg-white border-r border-brand-border/70 flex-shrink-0 shadow-[4px_0_12px_rgba(0,0,0,0.03)]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-forest">
            Venue Berpengalaman
          </span>
        </div>

        {/* Infinite Running Marquee */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium text-brand-forest/90">
            {venues.concat(venues).map((venue, idx) => (
              <div key={idx} className="inline-flex items-center space-x-2.5 whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-brand-ochre flex-shrink-0" />
                <span className="hover:text-brand-forest transition-colors">{venue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
