import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';

export function Footer() {
  return (
    <footer className="bg-brand-forest-dark text-white/80 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3">
              <Image
                src="/images/logo/logo.png"
                alt="Dua Insan Organizer Logo"
                width={48}
                height={48}
                unoptimized
                className="w-10 h-auto object-contain bg-white/10 p-1 rounded"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-normal tracking-wide text-brand-ivory">
                  Dua Insan
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-olive-light font-semibold -mt-0.5">
                  Wedding Organizer
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-olive-light font-medium">
                {siteConfig.contact.city} & Sekitarnya
              </span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-sans">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-white transition-colors">
                  Layanan Organizer
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-white transition-colors">
                  Paket Pernikahan
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Dokumentasi Portofolio
                </Link>
              </li>
              <li>
                <Link href="/testimoni" className="hover:text-white transition-colors">
                  Cerita Pengantin
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Utama */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-sans">
              Layanan Kami
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/paket" className="hover:text-white transition-colors">
                  Full Wedding Planning
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-white transition-colors">
                  Wedding Day Coordination (Day-Of)
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-white transition-colors">
                  Intimate Wedding Package
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-white transition-colors">
                  Prosesi Akad & Pemberkatan
                </Link>
              </li>
              <li>
                <Link href="/konsultasi" className="hover:text-white transition-colors">
                  Konsultasi Wedding Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Informasi Kontak & Jam Kantor */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-sans">
              Layanan & Kontak
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-olive-light flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-olive-light flex-shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-brand-olive-light flex-shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <InstagramIcon className="w-4 h-4 text-brand-olive-light flex-shrink-0" />
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.instagram}
                </a>
              </div>
              <div className="flex items-start space-x-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-olive-light flex-shrink-0 mt-0.5" />
                <span className="text-xs">{siteConfig.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/kebijakan-privasi" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
