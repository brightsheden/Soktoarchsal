import React, { useState } from 'react';
import { useGalleryImages, useDeleteImage } from '../ApiHook';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import {
  ImagePlus,
  Search,
  Trash2,
  Edit,
  Calendar,
  Image as ImageIcon,
  X,
  Loader2,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function AdminGalleryScreen() {
  const { data: images = [], isLoading } = useGalleryImages();
  const { mutate: deleteImage, isLoading: isDeleting } = useDeleteImage();

  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleDelete = (id) => {
    deleteImage(
      { id },
      {
        onSuccess: () => {
          setDeleteConfirmId(null);
        },
      }
    );
  };

  const filteredImages = (images || []).filter((img) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      img.title?.toLowerCase().includes(term) ||
      img.description?.toLowerCase().includes(term)
    );
  });

  return (
    <AdminLayout
      title="Photo Gallery Management"
      subtitle="Upload, caption, and manage event photographs and project field media"
      breadcrumbs={[{ label: 'Photo Gallery' }]}
      actions={
        <Link
          to="/admin/gallery/upload"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all"
        >
          <ImagePlus size={18} />
          <span>Upload Photo</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Search & Stats Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search images by caption or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-slate-900 dark:text-white"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium self-end sm:self-center">
            Total photos: <span className="font-bold text-slate-900 dark:text-white">{filteredImages.length}</span>
          </span>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <Loader2 className="animate-spin text-secondary mb-3" size={36} />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Loading photo gallery...
            </p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-secondary dark:text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No gallery images found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              {search
                ? 'Try a different search keyword.'
                : 'Start documenting ACReSAL Sokoto achievements by uploading project photos.'}
            </p>
            <Link
              to="/admin/gallery/upload"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all"
            >
              <ImagePlus size={16} />
              <span>Upload First Photo</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="relative h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={`${API_URL}${image.image}`}
                      alt={image.title || image.description || 'Gallery image'}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {image.upload_at && (
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-900/80 text-white backdrop-blur-sm flex items-center gap-1">
                        <Calendar size={11} /> {image.upload_at.slice(0, 10)}
                      </span>
                    )}
                  </div>

                  {/* Caption / Description */}
                  <div className="p-4">
                    {image.title && (
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 line-clamp-1">
                        {image.title}
                      </h4>
                    )}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {image.description || 'No caption provided.'}
                    </p>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                  <Link
                    to={`/admin/gallery/${image.id}/edit`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary hover:bg-slate-700 text-white shadow-sm transition-colors"
                  >
                    <Edit size={13} />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => setDeleteConfirmId(image.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Confirm Photo Deletion
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              Are you sure you want to delete this photo from the gallery? It will no longer be visible on the public website.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(deleteConfirmId)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-red-600 hover:bg-red-700 text-white shadow-md"
              >
                {isDeleting && <Loader2 className="animate-spin" size={15} />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
