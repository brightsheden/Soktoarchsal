import React from 'react';
import {
  BookOpen,
  Image as ImageIcon,
  FileText,
  PlusCircle,
  FileUp,
  ImagePlus,
  ArrowRight,
  ExternalLink,
  Download,
  Calendar,
  Eye,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogs, useGalleryImages, useDocuments } from '../ApiHook';
import { UserStore } from '../state/store';
import AdminLayout from '../components/AdminLayout';
import { API_URL } from '../../config';

export default function AdminHome() {
  const { data: blogs = [], isLoading: loadingBlogs } = useBlogs();
  const { data: images = [], isLoading: loadingImages } = useGalleryImages();
  const { data: documentsData, isLoading: loadingDocs } = useDocuments({ pageSize: 5 });

  const userinfo = UserStore.useState((state) => state.user);

  const totalBlogs = blogs?.length || 0;
  const totalImages = images?.length || 0;
  const totalDocuments =
    documentsData?.count ?? (Array.isArray(documentsData) ? documentsData.length : 0);

  const recentDocs = documentsData?.results || (Array.isArray(documentsData) ? documentsData.slice(0, 5) : []);
  const recentBlogs = Array.isArray(blogs) ? blogs.slice(0, 4) : [];

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Sokoto State ACReSAL Management & Content Administration Portal"
      breadcrumbs={[{ label: 'Dashboard' }]}
      actions={
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/documents/create"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all duration-200"
          >
            <FileUp size={16} />
            <span>Upload Document</span>
          </Link>
          <Link
            to="/createblog"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all duration-200"
          >
            <PlusCircle size={16} />
            <span>New Blog Post</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary via-slate-800 to-slate-900 border border-slate-700/60 p-6 sm:p-8 text-white shadow-xl">
          <div className="absolute right-0 top-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Portal Status: Operational
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {userinfo?.username || 'Administrator'}!
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Manage documents, project publications, press statements, news articles, and event photos across the Sokoto ACReSAL project platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/admin/documents"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-secondary hover:bg-slate-100 shadow-md transition-all"
              >
                <span>Manage Documents</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/admin/blogs"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-secondary hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                <span>Manage Blogs</span>
              </Link>
              <Link
                to="/admin/gallery"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-secondary hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                <span>Manage Gallery</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Documents Card */}
          <Link
            to="/admin/documents"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Documents
                </span>
                <div className="w-11 h-11 rounded-xl bg-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <FileText size={22} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {loadingDocs ? '...' : totalDocuments}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Policies, reports & assessments
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-secondary dark:text-slate-300">
              <span>View all documents</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Blogs Card */}
          <Link
            to="/admin/blogs"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Articles & News
                </span>
                <div className="w-11 h-11 rounded-xl bg-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <BookOpen size={22} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {loadingBlogs ? '...' : totalBlogs}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Published posts & stories
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-secondary dark:text-slate-300">
              <span>View all blogs</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Gallery Card */}
          <Link
            to="/admin/gallery"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Gallery Photos
                </span>
                <div className="w-11 h-11 rounded-xl bg-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <ImageIcon size={22} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {loadingImages ? '...' : totalImages}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Event & field activity media
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-secondary dark:text-slate-300">
              <span>View photo gallery</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Team Members Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Team Members
                </span>
                <div className="w-11 h-11 rounded-xl bg-secondary text-white flex items-center justify-center shadow-sm">
                  <Users size={22} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  Active
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Sokoto SPMU Team
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Admin moderation</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Quick Administrative Actions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Frequently accessed management tools and publishing actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/documents/create"
              className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 hover:border-slate-400 hover:bg-slate-100/70 transition-all group"
            >
              <div className="p-3 rounded-xl bg-secondary text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <FileUp size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Upload Document
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Attach PDFs, project policies, or research documents for download.
                </p>
              </div>
            </Link>

            <Link
              to="/createblog"
              className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 hover:border-slate-400 hover:bg-slate-100/70 transition-all group"
            >
              <div className="p-3 rounded-xl bg-secondary text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <PlusCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Write News & Blog
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Publish a new post with rich text and featured cover imagery.
                </p>
              </div>
            </Link>

            <Link
              to="/admin/gallery/upload"
              className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 hover:border-slate-400 hover:bg-slate-100/70 transition-all group"
            >
              <div className="p-3 rounded-xl bg-secondary text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <ImagePlus size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Add Gallery Photo
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Upload photos from ongoing ACReSAL fieldwork and workshops.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Overview (2-column: Recent Documents & Recent Blogs) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Documents */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Recent Official Documents
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Latest uploaded materials in the library
                </p>
              </div>
              <Link
                to="/admin/documents"
                className="text-xs font-semibold text-secondary hover:text-slate-600 dark:text-slate-300 dark:hover:text-white flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {loadingDocs ? (
              <p className="text-xs text-slate-400 py-6 text-center">Loading recent documents...</p>
            ) : recentDocs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No documents uploaded yet.</p>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentDocs.map((doc) => (
                  <div key={doc.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {doc.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                        <span className="font-mono uppercase font-semibold text-secondary dark:text-slate-300">
                          {doc.file_type || 'FILE'}
                        </span>
                        <span>•</span>
                        <span>{doc.category || 'General'}</span>
                        <span>•</span>
                        <span>{doc.download_count ?? 0} downloads</span>
                      </div>
                    </div>
                    <Link
                      to={`/admin/documents/${doc.id}/edit`}
                      className="px-3 py-1 text-xs font-semibold bg-secondary hover:bg-slate-700 text-white rounded-lg transition-colors shrink-0 shadow-sm"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Blogs */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Recent News & Articles
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Latest published blog posts
                </p>
              </div>
              <Link
                to="/admin/blogs"
                className="text-xs font-semibold text-secondary hover:text-slate-600 dark:text-slate-300 dark:hover:text-white flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {loadingBlogs ? (
              <p className="text-xs text-slate-400 py-6 text-center">Loading recent posts...</p>
            ) : recentBlogs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No blog posts available.</p>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentBlogs.map((blog) => (
                  <div key={blog.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {blog.featured_image && (
                        <img
                          src={`${API_URL}${blog.featured_image}`}
                          alt={blog.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {blog.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {blog.publish_date ? blog.publish_date.slice(0, 10) : 'Recent'} • By {blog?.author?.username || 'Admin'}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/admin/blog/${blog.slug}/`}
                      className="px-3 py-1 text-xs font-semibold bg-secondary hover:bg-slate-700 text-white rounded-lg transition-colors shrink-0 shadow-sm"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
