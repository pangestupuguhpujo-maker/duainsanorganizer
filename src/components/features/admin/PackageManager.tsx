'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { savePackageAction, togglePackageActiveAction } from '@/server/actions/admin.actions';
import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Edit2, X, ExternalLink, Sparkles } from 'lucide-react';

interface PackageItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  priceNote: string | null;
  coverImage: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

export function PackageManager({ items }: { items: PackageItem[] }) {
  const [editingItem, setEditingItem] = useState<PackageItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openEditModal = (item: PackageItem) => {
    setEditingItem(item);
  };

  const closeModal = () => {
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await savePackageAction(formData);
      closeModal();
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan perubahan paket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-brand-forest font-normal">
            Pengelolaan Paket Wedding
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Ubah rincian nama paket, harga awal, kapasitas tamu, deskripsi, dan status tayang.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFBF9] text-xs uppercase tracking-wider text-brand-muted font-medium border-b border-brand-border">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Nama Paket</th>
                <th className="px-6 py-3.5">Harga Awal</th>
                <th className="px-6 py-3.5">Catatan Kapasitas</th>
                <th className="px-6 py-3.5">Status Unggulan</th>
                <th className="px-6 py-3.5">Status Tayang</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {items.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-brand-muted">
                    #{pkg.displayOrder}
                  </td>
                  <td className="px-6 py-4 font-medium text-brand-charcoal">
                    <div className="flex items-center space-x-2">
                      <Link href={`/paket/${pkg.slug}`} target="_blank" className="hover:underline">
                        {pkg.name}
                      </Link>
                      {pkg.isFeatured && (
                        <span className="inline-flex items-center text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-brand-forest font-semibold">
                    {formatRupiah(pkg.startingPrice)}
                  </td>
                  <td className="px-6 py-4 text-brand-muted text-xs">
                    {pkg.priceNote || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {pkg.isFeatured ? (
                      <Badge variant="warning">Featured</Badge>
                    ) : (
                      <Badge variant="outline">Standar</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {pkg.isActive ? (
                      <Badge variant="success">Aktif (Tayang)</Badge>
                    ) : (
                      <Badge variant="outline">Non-aktif (Draft)</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(pkg)}
                        className="px-3 py-1.5 text-xs font-medium bg-brand-forest/5 text-brand-forest hover:bg-brand-forest hover:text-white rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Edit2 className="w-3.5 h-3.5 mr-1" />
                        <span>Edit Detail</span>
                      </button>

                      <form action={togglePackageActiveAction.bind(null, pkg.id, pkg.isActive)}>
                        <Button
                          type="submit"
                          variant={pkg.isActive ? 'outline' : 'secondary'}
                          size="sm"
                          className="text-xs"
                        >
                          {pkg.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-[#FAFBF9]">
              <div>
                <h3 className="font-serif text-xl text-brand-forest font-normal">
                  Edit Paket: {editingItem.name}
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Sesuaikan nama, harga estimasi, deskripsi, dan kapasitas undangan.
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
              <input type="hidden" name="id" value={editingItem.id} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Nama Paket *"
                    name="name"
                    id="name"
                    defaultValue={editingItem.name}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Harga Awal (IDR) *"
                    name="startingPrice"
                    id="startingPrice"
                    type="number"
                    defaultValue={editingItem.startingPrice}
                    required
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Catatan Kapasitas & Highlight *"
                  name="priceNote"
                  id="priceNote"
                  defaultValue={editingItem.priceNote || ''}
                  placeholder="Contoh: Kapasitas 500 Undangan • Pelaminan 12m"
                  required
                />
              </div>

              <div>
                <Input
                  label="URL Foto Cover Paket"
                  name="coverImage"
                  id="coverImage"
                  defaultValue={editingItem.coverImage}
                  placeholder="/images/paket/paket-signature-hd.jpg"
                />
              </div>

              <div>
                <Textarea
                  label="Deskripsi Singkat (Ringkasan) *"
                  name="shortDescription"
                  id="shortDescription"
                  rows={2}
                  defaultValue={editingItem.shortDescription}
                  required
                />
              </div>

              <div>
                <Textarea
                  label="Deskripsi Lengkap Paket *"
                  name="description"
                  id="description"
                  rows={4}
                  defaultValue={editingItem.description}
                  required
                />
              </div>

              <div className="flex flex-wrap gap-6 pt-3 border-t border-brand-border">
                <label className="flex items-center space-x-2 text-sm text-brand-forest cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={editingItem.isFeatured}
                    className="w-4 h-4 rounded text-brand-forest focus:ring-brand-olive border-brand-border"
                  />
                  <span className="font-medium">Paket Unggulan (Featured Badge)</span>
                </label>

                <label className="flex items-center space-x-2 text-sm text-brand-forest cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingItem.isActive}
                    className="w-4 h-4 rounded text-brand-forest focus:ring-brand-olive border-brand-border"
                  />
                  <span className="font-medium">Paket Aktif & Ditampilkan (Active)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-end space-x-3">
                <Button type="button" variant="outline" size="md" onClick={closeModal}>
                  Batal
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan Paket'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
