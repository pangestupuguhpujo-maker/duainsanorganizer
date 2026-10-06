'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import {
  LayoutDashboard,
  Users,
  Package,
  Sparkles,
  Camera,
  MessageSquareQuote,
  HelpCircle,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { logoutAction } from '@/server/actions/auth.actions';

const navIcons: Record<string, React.ReactNode> = {
  Overview: <LayoutDashboard className="w-4 h-4 mr-3" />,
  'Leads / Inquiry': <Users className="w-4 h-4 mr-3" />,
  'Paket Wedding': <Package className="w-4 h-4 mr-3" />,
  Layanan: <Sparkles className="w-4 h-4 mr-3" />,
  Portofolio: <Camera className="w-4 h-4 mr-3" />,
  Testimoni: <MessageSquareQuote className="w-4 h-4 mr-3" />,
  FAQ: <HelpCircle className="w-4 h-4 mr-3" />,
  Pengaturan: <Settings className="w-4 h-4 mr-3" />,
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-forest-dark text-white min-h-screen flex flex-col flex-shrink-0 border-r border-white/10">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/10 space-x-3">
        <Image
          src="/images/logo/logo.png"
          alt="Dua Insan"
          width={36}
          height={36}
          unoptimized
          className="w-8 h-auto object-contain bg-white/10 p-1 rounded"
        />
        <div>
          <span className="font-serif font-medium text-sm tracking-wide text-brand-ivory block leading-tight">
            Dua Insan
          </span>
          <span className="text-[10px] text-brand-olive-light uppercase tracking-wider block">
            Admin Workspace
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {siteConfig.adminNavLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-brand-forest text-brand-ivory shadow-sm'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              {navIcons[item.label] || <LayoutDashboard className="w-4 h-4 mr-3" />}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center px-3 py-2 text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 mr-2" />
          Lihat Website Publik
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center px-3 py-2 text-xs font-medium text-red-300 hover:text-red-100 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Keluar dari Sistem
          </button>
        </form>
      </div>
    </aside>
  );
}
