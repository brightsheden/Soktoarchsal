import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserStore } from '../state/store';
import { useCreateBlog } from '../ApiHook';
import Editor from '../components/Editor';
import AdminLayout from '../components/AdminLayout';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export default function CreateBlogScreen() {
  const userInfo = UserStore.useState((state) => state.user);
  const { isSuccess, isLoading, mutate, data } = useCreateBlog();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    image: null,
    imagePreview: null,
    content: '',
  });

  const [category, setCategory] = useState('Project Updates');
  const [customCategory, setCustomCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (data && isSuccess) {
      navigate('/admin/blogs');
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

    if (!formData.title.trim()) {
      setErrorMessage('Please provide a post title.');
      return;
    }

    if (!formData.content.trim()) {
      setErrorMessage('Please enter the blog content.');
      return;
    }

    const finalCategory = customCategory.trim() || category || 'News';

    mutate(
      {
        title: formData.title.trim(),
        image: formData.image,
        content: formData.content,
        author: userInfo?.id,
        category: finalCategory,
      },
      {
        onError: (err) => {
          setErrorMessage(
            err.response?.data?.detail ||
              err.response?.data?.error ||
              'Failed to create blog post. Please check the fields and try again.'
          );
        },
      }
    );
  };

  return (
    <AdminLayout
      title="Create New Blog Post"
      subtitle="Draft articles, progress reports, or press updates for Sokoto ACReSAL"
      breadcrumbs={[
        { label: 'Blogs', path: '/admin/blogs' },
        { label: 'New Post' },
      ]}
      actions={
        <Link
          to="/admin/blogs"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Blogs</span>
        </Link>
      }
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-start gap-3 text-sm">
              <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g. ACReSAL Flags Off Solar-Powered Borehole Project in Wamakko"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (e.target.value) setCustomCategory('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="Project Updates">Project Updates</option>
                  <option value="News">News & Announcements</option>
                  <option value="Environmental Impact">Environmental Impact</option>
                  <option value="Community Engagement">Community Engagement</option>
                  <option value="Climate Resilience">Climate Resilience</option>
                  <option value="Press Releases">Press Releases</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Or Custom Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Special Feature"
                  value={customCategory}
                  onChange={(e) => {
                    setCustomCategory(e.target.value);
                    if (e.target.value) setCategory('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Featured Cover Image
              </label>

              {formData.imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-72 bg-slate-900">
                  <img
                    src={formData.imagePreview}
                    alt="Cover preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 text-white hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-8 text-center hover:border-secondary transition-colors bg-slate-50/40 dark:bg-slate-800/20">
                  <input
                    type="file"
                    id="blog-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="blog-image"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-secondary dark:text-slate-300 flex items-center justify-center mb-3">
                      <ImageIcon size={28} />
                    </div>
                    <span className="text-sm font-semibold text-secondary dark:text-slate-300 hover:underline">
                      Click to choose cover photo
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      PNG, JPG, WEBP up to 10MB
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Article Body Content <span className="text-red-500">*</span>
              </label>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
                <Editor
                  description={formData.content}
                  change={(content) =>
                    setFormData((prev) => ({ ...prev, content }))
                  }
                />
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <Link
                to="/admin/blogs"
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
                <span>Publish Post</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
