'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { updateAdminCredentialsAction } from '@/server/actions/admin.actions';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';

export function AdminCredentialsCard({ currentEmail }: { currentEmail: string }) {
  const [state, formAction, isPending] = useActionState(updateAdminCredentialsAction, null);

  return (
    <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-brand-border">
        <div className="w-10 h-10 rounded-lg bg-brand-forest/10 flex items-center justify-center text-brand-forest">
          <KeyRound className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-serif text-xl text-brand-forest font-normal">
            Keamanan Akun Administrator
          </h2>
          <p className="text-xs text-brand-muted">
            Ganti alamat email login atau kata sandi akses dashboard admin Anda.
          </p>
        </div>
      </div>

      {state?.error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-start space-x-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      {state?.success && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm flex items-start space-x-2.5">
          <ShieldCheck className="w-5 h-5 shrink-0 text-green-600 mt-0.5" />
          <span>{state.success}</span>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div>
          <Input
            label="Email Administrator (Login)"
            name="email"
            id="admin_email"
            type="email"
            defaultValue={currentEmail}
            helperText="Email yang Anda gunakan untuk masuk ke portal administrasi"
            required
          />
        </div>

        <div className="pt-2 border-t border-brand-border/60">
          <h3 className="text-xs font-semibold text-brand-forest uppercase tracking-wider mb-4">
            Ubah Kata Sandi (Kosongkan jika hanya ingin ganti email)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                label="Kata Sandi Baru"
                name="newPassword"
                id="new_password"
                type="password"
                placeholder="Minimal 8 karakter"
              />
            </div>
            <div>
              <Input
                label="Konfirmasi Kata Sandi Baru"
                name="confirmPassword"
                id="confirm_password"
                type="password"
                placeholder="Ulangi kata sandi baru"
              />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#FAFBF9] border border-brand-border/80">
          <Input
            label="Kata Sandi Saat Ini (Verifikasi Keamanan)"
            name="currentPassword"
            id="current_password"
            type="password"
            placeholder="Masukkan kata sandi lama Anda"
            helperText="Wajib dimasukkan untuk memvalidasi bahwa Anda adalah pemilik sah akun"
            required
          />
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" size="md" disabled={isPending}>
            {isPending ? 'Menyimpan Perubahan...' : 'Perbarui Kredensial Administrator'}
          </Button>
        </div>
      </form>
    </div>
  );
}
