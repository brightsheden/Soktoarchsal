import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEditImage, useGetImageDetails } from '../ApiHook';
import { API_URL } from '../../config';
import AdminLayout from '../components/AdminLayout';
import {
  ArrowLeft,
  Image as ImageIcon,
  X,
  Loader2,
  AlertCircle,
  ImagePlus,
} from 'lucide-react';

export default function EditImageScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: imageData, isLoading: isFetchingImage, error: fetchError } =
    useGetImageDetails(id);
  const { mutate: editImage, isLoading: isSaving, isSuccess } = useEditImage();

  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null,
    description: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (imageData) {
      setFormData({
        image: null,
        imagePreview: null,
        description: imageData.description || '',
      });
    }
  }, [imageData]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin/gallery');
    }
  }, [isSuccess, navigate]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const updateData = new FormData();
    if (formData.image) {
      updateData.append('image', formData.image);
    }
    updateData.append('description', formData.description);

    editImage(
      { id, data: updateData },
      {
        onError: (err) => {
          setErrorMessage(
            err.response?.data?.detail ||
              err.response?.data?.error ||
              'Failed to update image details.'
          );
        },
      }
    );
  };

  if (isFetchingImage) {
    return (
      <AdminLayout
        title="Edit Photo"
        breadcrumbs={[
          { label: 'Photo Gallery', path: '/admin/gallery' },
          { label: 'Edit' },
        ]}
      >
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <Loader2 className="animate-spin text-secondary mb-3" size={36} />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Loading photo information...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (fetchError) {
    return (
      <AdminLayout
        title="Edit Photo"
        breadcrumbs={[
          { label: 'Photo Gallery', path: '/admin/gallery' },
          { label: 'Error' },
        ]}
      >
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900">
          <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Failed to Load Photo
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            The requested gallery image could not be loaded.
          </p>
          <Link
            to="/admin/gallery"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-secondary text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to Gallery</span>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Edit Gallery Photo"
      subtitle="Update caption or replace the image asset"
      breadcrumbs={[
        { label: 'Photo Gallery', path: '/admin/gallery' },
        { label: 'Edit Photo' },
      ]}
      actions={
        <Link
          to="/admin/gallery"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Gallery</span>
        </Link>
      }
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-start gap-3 text-sm">
              <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Image Preview & Replacement */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Photo Asset
              </label>

              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-80 bg-slate-900">
                  {formData.imagePreview ? (
                    <img
                      src={formData.imagePreview}
                      alt="New preview"
                      className="w-full h-72 object-cover"
                    />
                  ) : imageData?.image ? (
                    <img
                      src={`${API_URL}${imageData.image}`}
                      alt="Current photo"
                      className="w-full h-72 object-cover"
                    />
                  ) : (
                    <div className="w-full h-52 flex items-center justify-center text-slate-400">
                      <ImageIcon size={36} />
                    </div>
                  )}

                  {formData.imagePreview && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          image: null,
                          imagePreview: null,
                        }))
                      }
                      className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 text-white hover:bg-red-600 transition-colors shadow-lg"
                      title="Revert to original image"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-secondary transition-colors bg-slate-50/40 dark:bg-slate-800/20">
                  <input
                    type="file"
                    id="edit-gallery-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-gallery-image"
                    className="cursor-pointer text-xs font-semibold text-secondary dark:text-slate-300 hover:underline flex items-center justify-center gap-1.5"
                  >
                    <ImagePlus size={15} />
                    <span>Click here to select a replacement photo (optional)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Photo Caption / Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Update photo caption or details..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <Link
                to="/admin/gallery"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all disabled:opacity-50"
              >
                {isSaving && <Loader2 className="animate-spin" size={16} />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
