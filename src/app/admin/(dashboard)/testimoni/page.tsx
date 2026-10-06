import * as React from 'react';
import { db } from '@/server/db';
import { testimonials } from '@/server/db/schema';
import { asc } from 'drizzle-orm';
import { Badge } from '@/components/ui/Badge';
import { Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminTestimoniPage() {
  const allTestimonials = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.displayOrder));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
          Pengelolaan Testimoni
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Daftar ulasan dari pasangan pengantin yang ditampilkan pada website publik.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-3.5">Nama Pasangan</th>
                <th className="px-6 py-3.5">Judul Acara</th>
                <th className="px-6 py-3.5">Rating</th>
                <th className="px-6 py-3.5">Kutipan Ulasan</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {allTestimonials.map((t) => (
                <tr key={t.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-charcoal">
                    {t.clientName}
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted">
                    {t.weddingTitle}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-0.5 text-amber-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted max-w-sm line-clamp-2">
                    &ldquo;{t.quote}&rdquo;
                  </td>
                  <td className="px-6 py-4">
                    {t.isPublished ? (
                      <Badge variant="success">Tayang</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
