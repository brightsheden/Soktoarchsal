import React, { useState } from 'react';
import { useBlogs, useDeleteAccount } from '../ApiHook';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  Calendar,
  User,
  BookOpen,
  X,
  Loader2,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function AdminBlogListScreen() {
  const { data: blogs = [], isLoading } = useBlogs();
  const { mutate: deleteBlog, isLoading: isDeleting } = useDeleteAccount();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleDelete = (id) => {
    deleteBlog(
      { id },
      {
        onSuccess: () => {
          setDeleteConfirmId(null);
        },
      }
    );
  };

  const categories = Array.from(
    new Set((blogs || []).map((b) => b.category).filter(Boolean))
  );

  const filteredBlogs = (blogs || []).filter((blog) => {
    const matchesSearch =
      !search ||
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.description?.toLowerCase().includes(search.toLowerCase()) ||
      blog.author?.username?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout
      title="Blog & News Management"
      subtitle="Create, edit, publish, and manage blog posts and project articles"
      breadcrumbs={[{ label: 'Blogs' }]}
      actions={
        <Link
          to="/createblog"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all"
        >
          <PlusCircle size={18} />
          <span>Add New Blog</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search posts by title, author, or snippet..."
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

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-slate-900 dark:text-white"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap hidden md:inline">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'post' : 'posts'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <Loader2 className="animate-spin text-secondary mb-3" size={36} />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Loading blog posts...
            </p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-secondary dark:text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No blog posts found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              {search || selectedCategory !== 'All'
                ? 'Try adjusting your search criteria or resetting the category filter.'
                : 'Get started by drafting and publishing your first project news story.'}
            </p>
            <Link
              to="/createblog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all"
            >
              <PlusCircle size={16} />
              <span>Create First Post</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    {blog.featured_image ? (
                      <img
                        src={`${API_URL}${blog.featured_image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <BookOpen size={36} />
                      </div>
                    )}
                    {blog.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-secondary/90 text-white backdrop-blur-sm">
                        {blog.category}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <User size={13} /> {blog?.author?.username || 'Admin'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {blog?.publish_date ? blog.publish_date.slice(0, 10) : 'Recent'}
                      </span>
                    </div>

                    {blog.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                        {blog.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <Link
                    to={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                    title="View live post"
                  >
                    <ExternalLink size={16} />
                  </Link>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/blog/${blog.slug}/`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary hover:bg-slate-700 text-white shadow-sm transition-colors"
                    >
                      <Edit size={13} />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => setDeleteConfirmId(blog.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
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
              Confirm Post Deletion
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              Are you sure you want to permanently remove this blog post? This action cannot be undone and will unpublish it from the public portal.
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
