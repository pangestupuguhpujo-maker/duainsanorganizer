'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../auth/guard';
import { updateLeadStatus } from '../repositories/lead.repo';
import { type LeadStatus, leadStatusEnum, packages, siteSettings } from '../db/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id') as string;
  const status = formData.get('status') as LeadStatus;
  const adminNotes = formData.get('adminNotes') as string;

  if (!id || !leadStatusEnum.includes(status)) {
    throw new Error('Data status tidak valid');
  }

  await updateLeadStatus(id, status, adminNotes || '');
  revalidatePath('/admin');
  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${id}`);
}

export async function togglePackageActiveAction(packageId: string, currentStatus: boolean) {
  await requireAdmin();

  await db
    .update(packages)
    .set({
      isActive: !currentStatus,
      updatedAt: Date.now(),
    })
    .where(eq(packages.id, packageId));

  revalidatePath('/admin/paket');
  revalidatePath('/paket');
  revalidatePath('/');
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdmin();

  const keys = ['phone_number', 'whatsapp_number', 'email_address', 'office_address', 'operating_hours', 'instagram_handle'];
  const now = Date.now();

  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null && value !== undefined) {
      await db
        .insert(siteSettings)
        .values({
          key,
          value,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: {
            value,
            updatedAt: now,
          },
        });
    }
  }

  revalidatePath('/admin/pengaturan');
  revalidatePath('/kontak');
  revalidatePath('/');
}
