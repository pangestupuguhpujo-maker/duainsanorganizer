'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { savePortfolioAction, deletePortfolioAction } from '@/server/actions/admin.actions';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Plus, Edit2, Trash2, X, ExternalLink, Sparkles } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  coupleName: string;
  eventDate: string | null;
  venueName: string;
  city: string;
  category: string;
  coverImage: string;
  storyDescription: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export function PortfolioManager({ items }: { items: PortfolioItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreateModal = () => {
    setEditingItem(null);
    setIsOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
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
      await savePortfolioAction(formData);
      closeModal();
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan portofolio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus portofolio pasangan "${name}"?`)) {
      try {
        await deletePortfolioAction(id);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus portofolio');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
            Pengelolaan Portofolio
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Tambah, ubah narasi, foto cover, atau kelola publikasi dokumentasi pernikahan.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="primary" size="md" className="shrink-0 flex items-center space-x-2">
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Tambah Portofolio Baru</span>
        </Button>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-3.5">Judul & Pasangan</th>
                <th className="px-6 py-3.5">Venue & Kota</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Tanggal</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-brand-charcoal flex items-center space-x-2">
                      <span>{item.coupleName}</span>
                      {item.isFeatured && (
                        <span className="inline-flex items-center text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-brand-muted mt-0.5 line-clamp-1">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-brand-muted text-xs">
                    {item.venueName}, {item.city}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-brand-forest">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-muted">
                    {item.eventDate || '-'}
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
                      <Link
                        href={`/portfolio/${item.slug}`}
                        target="_blank"
                        className="p-1.5 text-brand-muted hover:text-brand-forest rounded-lg hover:bg-brand-ivory transition-colors"
                        title="Lihat Halaman Publik"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit Portofolio"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.coupleName)}
                        className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                        title="Hapus Portofolio"
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

      {/* Modal Dialog for Create & Edit */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-[#FAFBF9]">
              <div>
                <h3 className="font-serif text-xl text-brand-forest font-normal">
                  {editingItem ? 'Edit Dokumentasi Portofolio' : 'Tambah Portofolio Pernikahan Baru'}
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Lengkapi data detail acara pengantin untuk ditampilkan di katalog website.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-forest hover:bg-brand-ivory transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
              {editingItem && <input type="hidden" name="id" value={editingItem.id} />}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Nama Pasangan Pengantin *"
                    name="coupleName"
                    id="coupleName"
                    defaultValue={editingItem?.coupleName || ''}
                    placeholder="Contoh: Nanda & Zahori"
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Tanggal Pernikahan *"
                    name="eventDate"
                    id="eventDate"
                    defaultValue={editingItem?.eventDate || ''}
                    placeholder="Contoh: 3–4 Mei 2024"
                    required
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Judul Acara Portofolio *"
                  name="title"
                  id="title"
                  defaultValue={editingItem?.title || ''}
                  placeholder="Contoh: Luxury Grand Ballroom Wedding Nanda & Zahori"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Nama Gedung / Venue *"
                    name="venueName"
                    id="venueName"
                    defaultValue={editingItem?.venueName || ''}
                    placeholder="Contoh: Grand Ballroom Hotel Ratu Mayang Garden"
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Kota *"
                    name="city"
                    id="city"
                    defaultValue={editingItem?.city || 'Pekanbaru'}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Kategori Konsep *"
                    name="category"
                    id="category"
                    defaultValue={editingItem?.category || 'Grand Ballroom & Adat Tradisi'}
                    placeholder="Contoh: Grand Ballroom & Adat Tradisi / Intimate"
                    required
                  />
                </div>
                <div>
                  <Input
                    label="URL Foto Cover *"
                    name="coverImage"
                    id="coverImage"
                    defaultValue={editingItem?.coverImage || ''}
                    placeholder="/images/portfolio/nanda-zahori-cover.jpg"
                    helperText="Path lokal (/images/...) atau link gambar online"
                    required
                  />
                </div>
              </div>

              <div>
                <Textarea
                  label="Cerita Narasi Acara *"
                  name="storyDescription"
                  id="storyDescription"
                  rows={4}
                  defaultValue={editingItem?.storyDescription || ''}
                  placeholder="Ceritakan kemegahan acara, prosesi adat, suasana ballroom, dan dedikasi tim Dua Insan Organizer..."
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
                  <span className="font-medium">Jadikan Highlight Utama (Featured di Beranda)</span>
                </label>

                <label className="flex items-center space-x-2 text-sm text-brand-forest cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={editingItem ? editingItem.isPublished : true}
                    className="w-4 h-4 rounded text-brand-forest focus:ring-brand-olive border-brand-border"
                  />
                  <span className="font-medium">Tayangkan di Website Publik (Published)</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-brand-border flex items-center justify-end space-x-3">
                <Button type="button" variant="outline" size="md" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                  {isSubmitting ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Terbitkan Portofolio'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
