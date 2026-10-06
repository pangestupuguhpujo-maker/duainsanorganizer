'use client';

import * as React from 'react';
import Image from 'next/image';
import { useActionState } from 'react';
import { loginAction } from '@/server/actions/auth.actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center p-2 mb-4">
          <Image
            src="/images/logo/logo.png"
            alt="Dua Insan Organizer"
            width={120}
            height={120}
            unoptimized
            className="w-24 h-auto object-contain"
            priority
          />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal tracking-tight">
          Portal Administrasi
        </h1>
        <p className="mt-2 text-sm text-brand-muted">
          Masuk untuk mengelola inquiry calon pengantin dan konten layanan.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-sm border border-brand-border rounded-lg sm:px-10">
          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div
                className="p-3.5 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm"
                role="alert"
              >
                {state.error}
              </div>
            )}

            <div>
              <Input
                label="Email Administrator"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@duainsanorganizer.com"
                error={state?.fieldErrors?.email}
              />
            </div>

            <div>
              <Input
                label="Kata Sandi"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                error={state?.fieldErrors?.password}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={isPending}
              >
                Masuk ke Dashboard
              </Button>
            </div>
          </form>

          <div className="mt-6 border-t border-brand-border pt-4 text-center">
            <p className="text-xs text-brand-muted">
              Dua Insan Wedding Organizer &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
