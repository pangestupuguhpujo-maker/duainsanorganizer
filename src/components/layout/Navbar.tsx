'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Menu, X, PhoneCall } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-brand-ivory/95 backdrop-blur-md shadow-xs border-b border-brand-border/60 py-2.5'
          : 'bg-brand-ivory py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/images/logo/logo.png"
            alt="Dua Insan Organizer Logo"
            width={48}
            height={48}
            unoptimized
            className="w-10 h-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-normal tracking-wide text-brand-forest">
              Dua Insan
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-olive font-semibold -mt-0.5">
              Wedding Organizer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-forest relative py-1',
                  isActive
                    ? 'text-brand-forest font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-forest'
                    : 'text-brand-charcoal/80'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/konsultasi">
            <Button variant="primary" size="md">
              <PhoneCall className="w-4 h-4 mr-2" />
              Konsultasi Acara
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Buka Menu Navigasi"
            className="p-2 rounded-md text-brand-forest hover:bg-brand-forest/5 focus:outline-none focus:ring-2 focus:ring-brand-forest"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-brand-border bg-brand-ivory px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-forest/10 text-brand-forest font-semibold'
                      : 'text-brand-charcoal/80 hover:bg-brand-forest/5 hover:text-brand-forest'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-brand-border/60">
            <Link href="/konsultasi" className="block w-full">
              <Button variant="primary" size="md" className="w-full">
                <PhoneCall className="w-4 h-4 mr-2" />
                Konsultasikan Pernikahan Anda
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
