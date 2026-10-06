'use client';

import * as React from 'react';
import { useState } from 'react';
import { saveFaqAction, deleteFaqAction } from '@/server/actions/admin.actions';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isPublished: boolean;
}

export function FaqManager({ items }: { items: FaqItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreateModal = () => {
    setEditingItem(null);
    setIsOpen(true);
  };

  const openEditModal = (item: FaqItem) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await saveFaqAction(formData);
      closeModal();
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan FAQ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, question: string) => {
    if (confirm(`Yakin ingin menghapus pertanyaan ini?\n"${question}"`)) {
      try {
        await deleteFaqAction(id);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus FAQ');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
            Pengelolaan FAQ (Tanya Jawab)
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Tambah atau perbarui jawaban seputar layanan Dua Insan Organizer untuk membantu calon pengantin.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="primary" size="md" className="shrink-0 flex items-center space-x-2">
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Tambah FAQ Baru</span>
        </Button>
      </div>

      {/* Table */}
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
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {items.map((faq) => (
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(faq)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit FAQ"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(faq.id, faq.question)}
                        className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                        title="Hapus FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-[#FAFBF9]">
              <div>
                <h3 className="font-serif text-xl text-brand-forest font-normal">
                  {editingItem ? 'Edit Pertanyaan FAQ' : 'Tambah Pertanyaan FAQ Baru'}
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Pertanyaan dan jawaban informatif seputar pernikahan & WO.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-forest hover:bg-brand-ivory transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
              {editingItem && <input type="hidden" name="id" value={editingItem.id} />}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Kategori FAQ *"
                    name="category"
                    id="category"
                    defaultValue={editingItem?.category || 'Layanan & Pemesanan'}
                    placeholder="Contoh: Layanan / Pembayaran / Teknis"
                    required
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Pertanyaan *"
                  name="question"
                  id="question"
                  defaultValue={editingItem?.question || ''}
                  placeholder="Contoh: Apakah Dua Insan bisa melayani acara di luar kota Pekanbaru?"
                  required
                />
              </div>

              <div>
                <Textarea
                  label="Jawaban *"
                  name="answer"
                  id="answer"
                  rows={4}
                  defaultValue={editingItem?.answer || ''}
                  placeholder="Tuliskan jawaban yang ramah, informatif, dan meyakinkan..."
                  required
                />
              </div>

              <div className="pt-2 border-t border-brand-border">
                <label className="flex items-center space-x-2 text-sm text-brand-forest cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={editingItem ? editingItem.isPublished : true}
                    className="w-4 h-4 rounded text-brand-forest focus:ring-brand-olive border-brand-border"
                  />
                  <span className="font-medium">Tayangkan di Halaman FAQ (Published)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-end space-x-3">
                <Button type="button" variant="outline" size="md" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                  {isSubmitting ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Terbitkan FAQ'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
