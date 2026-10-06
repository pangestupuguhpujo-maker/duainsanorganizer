import * as React from 'react';
import { type AuthenticatedUser } from '@/server/auth/session';

interface AdminHeaderProps {
  user: AuthenticatedUser;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-brand-border px-6 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-sm font-semibold text-brand-charcoal">
          Sistem Pengelolaan Dua Insan Organizer
        </h2>
      </div>

      <div className="flex items-center space-x-3">
        <div className="text-right">
          <span className="block text-xs font-medium text-brand-charcoal">
            {user.name}
          </span>
          <span className="block text-[11px] text-brand-muted">
            {user.email}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-forest text-brand-ivory flex items-center justify-center font-medium text-xs">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
