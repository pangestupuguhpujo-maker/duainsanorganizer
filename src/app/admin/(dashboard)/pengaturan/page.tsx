import * as React from 'react';
import { db } from '@/server/db';
import { siteSettings } from '@/server/db/schema';
import { updateSiteSettingsAction } from '@/server/actions/admin.actions';
import { requireAdmin } from '@/server/auth/guard';
import { AdminCredentialsCard } from '@/components/features/admin/AdminCredentialsCard';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function AdminPengaturanPage() {
  const admin = await requireAdmin();
  const allSettings = await db.select().from(siteSettings);
  const settingsMap: Record<string, string> = {};

  for (const s of allSettings) {
    settingsMap[s.key] = s.value;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
          Pengaturan Akun & Kontak
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Kelola kredensial akun administrator serta informasi kontak resmi website.
        </p>
      </div>

      {/* 1. Keamanan Akun Administrator (Ganti Email & Password) */}
      <AdminCredentialsCard currentEmail={admin.email} />

      {/* 2. Pengaturan Kontak & Operasional */}
      <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-xl text-brand-forest font-normal">
            Kontak Resmi & Alamat
          </h2>
          <p className="text-xs text-brand-muted">
            Informasi kontak ini otomatis diperbarui pada tombol WhatsApp dan bagian kontak website.
          </p>
        </div>
        <form action={updateSiteSettingsAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Input
                label="Nomor WhatsApp Resmi (Format Angka)"
                name="whatsapp_number"
                id="whatsapp_number"
                defaultValue={settingsMap['whatsapp_number'] || '6281234567890'}
                helperText="Digunakan untuk seluruh tombol CTA WhatsApp otomatis"
                required
              />
            </div>

            <div>
              <Input
                label="Nomor Telepon Kantor (Tampilan)"
                name="phone_number"
                id="phone_number"
                defaultValue={settingsMap['phone_number'] || '+62 812-3456-7890'}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Input
                label="Alamat Instagram"
                name="instagram_handle"
                id="instagram_handle"
                defaultValue={settingsMap['instagram_handle'] || '@duainsanorganizer'}
                required
              />
            </div>

            <div>
              <Input
                label="Email Resmi"
                name="email_address"
                id="email_address"
                type="email"
                defaultValue={settingsMap['email_address'] || 'organizerduainsan@gmail.com'}
                required
              />
            </div>
          </div>

          <div>
            <Textarea
              label="Area Layanan & Temu Janji (Domisili)"
              name="office_address"
              id="office_address"
              rows={3}
              defaultValue={settingsMap['office_address'] || 'Pekanbaru, Riau (Temu Janji Fleksibel di Cafe / Kediaman Klien)'}
              required
            />
          </div>

          <div>
            <Input
              label="Jam Operasional / Konsultasi"
              name="operating_hours"
              id="operating_hours"
              defaultValue={settingsMap['operating_hours'] || 'Senin - Minggu: 09.00 - 18.00 WIB (Dengan Janji Temu)'}
              required
            />
          </div>

          <div className="pt-4 border-t border-brand-border">
            <Button type="submit" variant="primary" size="md">
              Simpan Perubahan Pengaturan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
