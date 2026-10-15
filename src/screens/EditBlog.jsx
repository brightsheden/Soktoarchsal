import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { API_URL } from '../../config';
import { UserStore } from '../state/store';
import { useEditBlog, useGetBlogByDetails } from '../ApiHook';
import Editor from '../components/Editor';
import AdminLayout from '../components/AdminLayout';
import {
  ArrowLeft,
  Image as ImageIcon,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  ExternalLink,
} from 'lucide-react';

export default function UserEditBlogScreen() {
  const { slug } = useParams();
  const userInfo = UserStore.useState((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    image: null,
    imagePreview: null,
    content: '',
    is_approved: false,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    data: blog,
    isLoading: isFetchingBlog,
    error: errorLoadingBlog,
  } = useGetBlogByDetails(slug);

  const {
    mutate: updateBlog,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
  } = useEditBlog();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog?.title || '',
        image: null,
        imagePreview: null,
        content: blog?.content || '',
        is_approved: blog?.published || false,
      });
    }
  }, [blog]);

  useEffect(() => {
    if (isSuccessUpdate) {
      setSuccessMessage('Blog post updated successfully!');
      setTimeout(() => {
        navigate('/admin/blogs');
      }, 1200);
    }
  }, [isSuccessUpdate, navigate]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setErrorMessage('Title and content are required.');
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title.trim());
      formDataObj.append('content', formData.content.trim());
      formDataObj.append('author', userInfo.id);
      formDataObj.append('published', formData.is_approved);

      if (formData.image instanceof File) {
        formDataObj.append('image', formData.image);
      }

      updateBlog(
        {
          id: blog.id,
          data: formDataObj,
        },
        {
          onError: (err) => {
            setErrorMessage(
              err.response?.data?.detail ||
                err.response?.data?.error ||
                'Failed to update blog post.'
            );
          },
        }
      );
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update blog post.');
    }
  };

  if (isFetchingBlog) {
    return (
      <AdminLayout
        title="Edit Blog Post"
        breadcrumbs={[
          { label: 'Blogs', path: '/admin/blogs' },
          { label: 'Edit' },
        ]}
      >
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <Loader2 className="animate-spin text-secondary mb-3" size={36} />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Loading blog post information...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (errorLoadingBlog) {
    return (
      <AdminLayout
        title="Edit Blog Post"
        breadcrumbs={[
          { label: 'Blogs', path: '/admin/blogs' },
          { label: 'Error' },
        ]}
      >
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900">
          <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Failed to Load Blog Post
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {errorLoadingBlog.message || 'The requested blog post could not be found.'}
          </p>
          <Link
            to="/admin/blogs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-secondary text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Edit Blog Post"
      subtitle={`Editing: ${blog?.title || 'Blog Post'}`}
      breadcrumbs={[
        { label: 'Blogs', path: '/admin/blogs' },
        { label: 'Edit Post' },
      ]}
      actions={
        <div className="flex items-center gap-2">
          {blog?.slug && (
            <Link
              to={`/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ExternalLink size={15} />
              <span>View Live</span>
            </Link>
          )}
          <Link
            to="/admin/blogs"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </Link>
        </div>
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

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-start gap-3 text-sm">
              <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
              <span>{successMessage}</span>
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Published Status Checkbox */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <label
                  htmlFor="is_approved"
                  className="text-sm font-bold text-slate-900 dark:text-white block cursor-pointer"
                >
                  Publish Article
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  When enabled, this post will be publicly visible to website visitors.
                </p>
              </div>
              <input
                type="checkbox"
                id="is_approved"
                checked={formData.is_approved}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_approved: e.target.checked,
                  }))
                }
                className="w-5 h-5 rounded text-secondary focus:ring-secondary border-slate-300 dark:border-slate-600 cursor-pointer"
              />
            </div>

            {/* Current & New Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Featured Cover Image
              </label>

              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-72 bg-slate-900">
                  {formData.imagePreview ? (
                    <img
                      src={formData.imagePreview}
                      alt="New cover preview"
                      className="w-full h-64 object-cover"
                    />
                  ) : blog?.featured_image ? (
                    <img
                      src={`${API_URL}${blog.featured_image}`}
                      alt="Current cover"
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center text-slate-400">
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
                    id="edit-blog-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-blog-image"
                    className="cursor-pointer text-xs font-semibold text-secondary dark:text-slate-300 hover:underline"
                  >
                    Click here to select a replacement cover photo
                  </label>
                </div>
              </div>
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

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <Link
                to="/admin/blogs"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoadingUpdate}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all disabled:opacity-50"
              >
                {isLoadingUpdate && <Loader2 className="animate-spin" size={16} />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
