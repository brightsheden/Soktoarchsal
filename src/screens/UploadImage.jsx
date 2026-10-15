import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserStore } from '../state/store';
import { useAddImage } from '../ApiHook';
import AdminLayout from '../components/AdminLayout';
import {
  ArrowLeft,
  ImagePlus,
  Image as ImageIcon,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export default function UploadImageScreen() {
  const userInfo = UserStore.useState((state) => state.user);
  const { isSuccess, isLoading, mutate, data } = useAddImage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    image: null,
    imagePreview: null,
    description: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (data && isSuccess) {
      navigate('/admin/gallery');
    }
  }, [data, isSuccess, navigate, userInfo]);

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

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.image) {
      setErrorMessage('Please select a photo to upload.');
      return;
    }

    mutate(
      {
        image: formData.image,
        title: formData.title,
        description: formData.description,
      },
      {
        onError: (err) => {
          setErrorMessage(
            err.response?.data?.detail ||
              err.response?.data?.error ||
              'Failed to upload image. Please check the file and try again.'
          );
        },
      }
    );
  };

  return (
    <AdminLayout
      title="Upload Gallery Photo"
      subtitle="Add photos with captions to showcase ACReSAL Sokoto activities"
      breadcrumbs={[
        { label: 'Photo Gallery', path: '/admin/gallery' },
        { label: 'Upload' },
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
            {/* Image Upload Zone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Photo File <span className="text-red-500">*</span>
              </label>

              {formData.imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-80 bg-slate-900">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-72 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 text-white hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove selected photo"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-secondary transition-colors bg-slate-50/40 dark:bg-slate-800/20">
                  <input
                    type="file"
                    id="gallery-file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="gallery-file"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-secondary dark:text-slate-300 flex items-center justify-center mb-3">
                      <ImagePlus size={32} />
                    </div>
                    <span className="text-sm font-semibold text-secondary dark:text-slate-300 hover:underline">
                      Click to choose photograph
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      JPG, PNG, WEBP up to 15MB
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Description / Caption */}
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
                placeholder="Describe the occasion, project site, participants, or significance of this photo..."
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
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all disabled:opacity-50"
              >
                {isLoading && <Loader2 className="animate-spin" size={16} />}
                <span>Upload to Gallery</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
