import * as React from 'react';
import { db } from '@/server/db';
import { faqs } from '@/server/db/schema';
import { asc } from 'drizzle-orm';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function AdminFaqPage() {
  const allFaqs = await db
    .select()
    .from(faqs)
    .orderBy(asc(faqs.displayOrder));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
          Pengelolaan FAQ (Tanya Jawab)
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Daftar pertanyaan umum yang disajikan pada halaman publik untuk membantu calon pengantin.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Pertanyaan</th>
                <th className="px-6 py-3.5">Jawaban Ringkas</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {allFaqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-brand-muted">
                    #{faq.displayOrder}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-olive/10 text-brand-forest">
                      {faq.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-brand-charcoal max-w-xs">
                    {faq.question}
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted max-w-md line-clamp-2">
                    {faq.answer}
                  </td>
                  <td className="px-6 py-4">
                    {faq.isPublished ? (
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
