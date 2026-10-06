'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../auth/guard';
import { updateLeadStatus } from '../repositories/lead.repo';
import {
  type LeadStatus,
  leadStatusEnum,
  packages,
  portfolios,
  testimonials,
  faqs,
  siteSettings,
  users,
} from '../db/schema';
import { db } from '../db';
import { eq, desc } from 'drizzle-orm';
import { hashPassword, verifyPassword } from '../auth/password';
import crypto from 'crypto';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface AdminActionResult {
  success?: string;
  error?: string;
}

// ==========================================
// 1. ADMIN CREDENTIALS (EMAIL & PASSWORD)
// ==========================================
export async function updateAdminCredentialsAction(
  prevState: AdminActionResult | null,
  formData: FormData
): Promise<AdminActionResult> {
  const admin = await requireAdmin();

  const newEmail = (formData.get('email') as string)?.trim().toLowerCase();
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!currentPassword) {
    return { error: 'Kata sandi saat ini wajib diisi untuk verifikasi keamanan.' };
  }

  // 1. Verify current password
  const userRows = await db.select().from(users).where(eq(users.id, admin.id)).limit(1);
  if (!userRows.length) {
    return { error: 'Pengguna administrator tidak ditemukan.' };
  }

  const currentUser = userRows[0];
  const isCurrentValid = await verifyPassword(currentUser.passwordHash, currentPassword);
  if (!isCurrentValid) {
    return { error: 'Kata sandi saat ini tidak cocok.' };
  }

  // 2. Validate new password if provided
  let newHash = currentUser.passwordHash;
  if (newPassword) {
    if (newPassword.length < 8) {
      return { error: 'Kata sandi baru minimal 8 karakter.' };
    }
    if (newPassword !== confirmPassword) {
      return { error: 'Konfirmasi kata sandi baru tidak sama.' };
    }
    newHash = await hashPassword(newPassword);
  }

  // 3. Validate new email if changed
  let updatedEmail = currentUser.email;
  if (newEmail && newEmail !== currentUser.email) {
    const existing = await db.select().from(users).where(eq(users.email, newEmail)).limit(1);
    if (existing.length && existing[0].id !== admin.id) {
      return { error: 'Email tersebut sudah digunakan oleh akun lain.' };
    }
    updatedEmail = newEmail;
  }

  // 4. Update user in database
  await db
    .update(users)
    .set({
      email: updatedEmail,
      passwordHash: newHash,
      updatedAt: Date.now(),
    })
    .where(eq(users.id, admin.id));

  revalidatePath('/admin');
  revalidatePath('/admin/pengaturan');

  return { success: 'Kredensial akun administrator berhasil diperbarui!' };
}

// ==========================================
// 2. PORTFOLIO CRUD ACTIONS
// ==========================================
export async function savePortfolioAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = formData.get('id') as string;
  const title = (formData.get('title') as string)?.trim();
  const coupleName = (formData.get('coupleName') as string)?.trim();
  const eventDate = (formData.get('eventDate') as string)?.trim() || null;
  const venueName = (formData.get('venueName') as string)?.trim();
  const city = (formData.get('city') as string)?.trim() || 'Pekanbaru';
  const category = (formData.get('category') as string)?.trim() || 'Grand Ballroom & Adat Tradisi';
  const coverImage = (formData.get('coverImage') as string)?.trim();
  const storyDescription = (formData.get('storyDescription') as string)?.trim();
  const isFeatured = formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true';
  const isPublished = formData.get('isPublished') === 'on' || formData.get('isPublished') === 'true';

  if (!title || !coupleName || !venueName || !coverImage || !storyDescription) {
    throw new Error('Semua kolom wajib diisi dengan lengkap.');
  }

  const now = Date.now();

  if (id) {
    // Update
    await db
      .update(portfolios)
      .set({
        title,
        coupleName,
        eventDate,
        venueName,
        city,
        category,
        coverImage,
        storyDescription,
        isFeatured,
        isPublished,
        updatedAt: now,
      })
      .where(eq(portfolios.id, id));
  } else {
    // Insert
    let baseSlug = slugify(`${coupleName}-${venueName}`);
    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const exists = await db.select().from(portfolios).where(eq(portfolios.slug, slug)).limit(1);
      if (!exists.length) break;
      slug = `${baseSlug}-${counter++}`;
    }

    await db.insert(portfolios).values({
      id: crypto.randomUUID(),
      title,
      slug,
      coupleName,
      eventDate,
      venueName,
      city,
      category,
      coverImage,
      storyDescription,
      isFeatured,
      isPublished,
      createdAt: now,
      updatedAt: now,
    });
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  revalidatePath('/');
}

export async function deletePortfolioAction(id: string): Promise<void> {
  await requireAdmin();
  await db.delete(portfolios).where(eq(portfolios.id, id));

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  revalidatePath('/');
}

// ==========================================
// 3. TESTIMONIAL CRUD ACTIONS
// ==========================================
export async function saveTestimonialAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = formData.get('id') as string;
  const clientName = (formData.get('clientName') as string)?.trim();
  const weddingTitle = (formData.get('weddingTitle') as string)?.trim();
  const quote = (formData.get('quote') as string)?.trim();
  const rating = parseInt(formData.get('rating') as string, 10) || 5;
  const clientPhoto = (formData.get('clientPhoto') as string)?.trim() || null;
  const eventDate = (formData.get('eventDate') as string)?.trim() || null;
  const isFeatured = formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true';
  const isPublished = formData.get('isPublished') === 'on' || formData.get('isPublished') === 'true';

  if (!clientName || !weddingTitle || !quote) {
    throw new Error('Nama pengantin, judul acara, dan kutipan ulasan wajib diisi.');
  }

  const now = Date.now();

  if (id) {
    await db
      .update(testimonials)
      .set({
        clientName,
        weddingTitle,
        quote,
        rating,
        clientPhoto,
        eventDate,
        isFeatured,
        isPublished,
      })
      .where(eq(testimonials.id, id));
  } else {
    await db.insert(testimonials).values({
      id: crypto.randomUUID(),
      clientName,
      weddingTitle,
      quote,
      rating,
      clientPhoto,
      eventDate,
      isFeatured,
      isPublished,
      displayOrder: 1,
      createdAt: now,
    });
  }

  revalidatePath('/admin/testimoni');
  revalidatePath('/testimoni');
  revalidatePath('/');
}

export async function deleteTestimonialAction(id: string): Promise<void> {
  await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, id));

  revalidatePath('/admin/testimoni');
  revalidatePath('/testimoni');
  revalidatePath('/');
}

// ==========================================
// 4. PACKAGE ACTIONS
// ==========================================
export async function savePackageAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = formData.get('id') as string;
  const name = (formData.get('name') as string)?.trim();
  const startingPrice = parseInt(formData.get('startingPrice') as string, 10) || 0;
  const priceNote = (formData.get('priceNote') as string)?.trim() || null;
  const shortDescription = (formData.get('shortDescription') as string)?.trim();
  const description = (formData.get('description') as string)?.trim();
  const coverImage = (formData.get('coverImage') as string)?.trim();
  const isFeatured = formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true';
  const isActive = formData.get('isActive') === 'on' || formData.get('isActive') === 'true';

  if (!id || !name || !shortDescription || !description) {
    throw new Error('Data paket tidak lengkap.');
  }

  await db
    .update(packages)
    .set({
      name,
      startingPrice,
      priceNote,
      shortDescription,
      description,
      ...(coverImage ? { coverImage } : {}),
      isFeatured,
      isActive,
      updatedAt: Date.now(),
    })
    .where(eq(packages.id, id));

  revalidatePath('/admin/paket');
  revalidatePath('/paket');
  revalidatePath('/');
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

// ==========================================
// 5. FAQ ACTIONS
// ==========================================
export async function saveFaqAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = formData.get('id') as string;
  const question = (formData.get('question') as string)?.trim();
  const answer = (formData.get('answer') as string)?.trim();
  const category = (formData.get('category') as string)?.trim() || 'Umum';
  const isPublished = formData.get('isPublished') === 'on' || formData.get('isPublished') === 'true';

  if (!question || !answer) {
    throw new Error('Pertanyaan dan jawaban wajib diisi.');
  }

  if (id) {
    await db
      .update(faqs)
      .set({
        question,
        answer,
        category,
        isPublished,
      })
      .where(eq(faqs.id, id));
  } else {
    await db.insert(faqs).values({
      id: crypto.randomUUID(),
      question,
      answer,
      category,
      isPublished,
      displayOrder: 1,
    });
  }

  revalidatePath('/admin/faq');
  revalidatePath('/faq');
  revalidatePath('/');
}

export async function deleteFaqAction(id: string): Promise<void> {
  await requireAdmin();
  await db.delete(faqs).where(eq(faqs.id, id));

  revalidatePath('/admin/faq');
  revalidatePath('/faq');
  revalidatePath('/');
}

// ==========================================
// 6. LEADS & SETTINGS
// ==========================================
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

