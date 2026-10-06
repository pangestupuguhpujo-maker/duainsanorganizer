'use client';

import * as React from 'react';
import { useState } from 'react';
import { saveTestimonialAction, deleteTestimonialAction } from '@/server/actions/admin.actions';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Plus, Edit2, Trash2, X, Star, Sparkles } from 'lucide-react';

interface TestimonialItem {
  id: string;
  clientName: string;
  weddingTitle: string;
  quote: string;
  rating: number;
  clientPhoto: string | null;
  eventDate: string | null;
  isFeatured: boolean;
  isPublished: boolean;
}

export function TestimonialManager({ items }: { items: TestimonialItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreateModal = () => {
    setEditingItem(null);
    setIsOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
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
      await saveTestimonialAction(formData);
      closeModal();
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan testimoni');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus testimoni dari "${name}"?`)) {
      try {
        await deleteTestimonialAction(id);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus testimoni');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
            Pengelolaan Testimoni
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Tambah ulasan baru, edit kutipan kepuasan klien, atau kelola ulasan di beranda.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="primary" size="md" className="shrink-0 flex items-center space-x-2">
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Tambah Testimoni Baru</span>
        </Button>
      </div>

      {/* Table */}
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
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-charcoal">
                    <div className="flex items-center space-x-2">
                      <span>{item.clientName}</span>
                      {item.isFeatured && (
                        <span className="inline-flex items-center text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted">
                    {item.weddingTitle}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-0.5 text-amber-500">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted max-w-sm line-clamp-2">
                    &ldquo;{item.quote}&rdquo;
                  </td>
                  <td className="px-6 py-4">
                    {item.isPublished ? (
                      <Badge variant="success">Tayang</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit Testimoni"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.clientName)}
                        className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                        title="Hapus Testimoni"
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
                  {editingItem ? 'Edit Testimoni Pengantin' : 'Tambah Testimoni Pengantin Baru'}
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Ulasan kepuasan dari pasangan yang telah mempercayakan pernikahannya.
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
                    label="Nama Pasangan / Klien *"
                    name="clientName"
                    id="clientName"
                    defaultValue={editingItem?.clientName || ''}
                    placeholder="Contoh: Nanda & Zahori"
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Tanggal Acara"
                    name="eventDate"
                    id="eventDate"
                    defaultValue={editingItem?.eventDate || ''}
                    placeholder="Contoh: 3–4 Mei 2024"
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Judul Acara / Venue *"
                  name="weddingTitle"
                  id="weddingTitle"
                  defaultValue={editingItem?.weddingTitle || ''}
                  placeholder="Contoh: Pernikahan di Grand Ballroom Hotel Ratu Mayang Garden"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-forest uppercase tracking-wider mb-2">
                    Rating Bintang *
                  </label>
                  <select
                    name="rating"
                    id="rating"
                    defaultValue={editingItem?.rating || 5}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-border bg-white text-brand-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang - Sempurna)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang - Sangat Baik)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang - Cukup)</option>
                  </select>
                </div>

                <div>
                  <Input
                    label="URL Foto Profil Klien"
                    name="clientPhoto"
                    id="clientPhoto"
                    defaultValue={editingItem?.clientPhoto || ''}
                    placeholder="/images/testimoni/testimoni-nanda-zahori.jpg"
                    helperText="Path lokal (/images/...) atau link gambar"
                  />
                </div>
              </div>

              <div>
                <Textarea
                  label="Kutipan Ulasan / Kesan Klien *"
                  name="quote"
                  id="quote"
                  rows={4}
                  defaultValue={editingItem?.quote || ''}
                  placeholder="Tuliskan pengalaman atau rasa syukur klien atas pelayanan Dua Insan Organizer..."
                  required
                />
              </div>

              <div className="flex flex-wrap gap-6 pt-3 border-t border-brand-border">
                <label className="flex items-center space-x-2 text-sm text-brand-forest cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={editingItem ? editingItem.isFeatured : true}
                    className="w-4 h-4 rounded text-brand-forest focus:ring-brand-olive border-brand-border"
                  />
                  <span className="font-medium">Tampilkan di Beranda (Featured)</span>
                </label>

                <label className="flex items-center space-x-2 text-sm text-brand-forest cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={editingItem ? editingItem.isPublished : true}
                    className="w-4 h-4 rounded text-brand-forest focus:ring-brand-olive border-brand-border"
                  />
                  <span className="font-medium">Tayangkan (Published)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-end space-x-3">
                <Button type="button" variant="outline" size="md" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                  {isSubmitting ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Terbitkan Testimoni'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
