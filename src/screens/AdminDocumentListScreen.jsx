import React, { useState } from 'react';
import { useDocuments, useDeleteDocument, useDocumentCategories } from '../ApiHook';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import {
  FileUp,
  Trash2,
  Edit,
  Download,
  FileText,
  Search,
  Filter,
  Calendar,
  X,
  Loader2,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const getFileBadge = (fileType) => {
  const type = (fileType || '').toLowerCase();
  if (type.includes('pdf')) {
    return (
      <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-900">
        PDF
      </span>
    );
  } else if (type.includes('doc') || type.includes('word')) {
    return (
      <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
        DOC
      </span>
    );
  } else if (type.includes('xls') || type.includes('sheet') || type.includes('csv')) {
    return (
      <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
        XLS
      </span>
    );
  }
  return (
    <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      {fileType || 'FILE'}
    </span>
  );
};

export default function AdminDocumentListScreen() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const { data: categories = [] } = useDocumentCategories();
  const { data, isLoading, isFetching } = useDocuments({
    page,
    search,
    category: selectedCategory === 'All' ? '' : selectedCategory,
    pageSize: 10,
  });

  const { mutate: deleteDoc, isLoading: isDeleting } = useDeleteDocument();

  const documents = data?.results || (Array.isArray(data) ? data : []);
  const totalCount = data?.count ?? documents.length;
  const totalPages = data?.total_pages ?? 1;

  const handleDelete = (id) => {
    deleteDoc(
      { id },
      {
        onSuccess: () => {
          setDeleteConfirmId(null);
        },
      }
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <AdminLayout
      title="Document Library Management"
      subtitle="Upload, categorize, inspect, and manage official project publications and reports"
      breadcrumbs={[{ label: 'Documents' }]}
      actions={
        <Link
          to="/admin/documents/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all"
        >
          <FileUp size={18} />
          <span>Upload Document</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by title, description or file type..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-slate-900 dark:text-white"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setPage(1);
                }}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </form>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-slate-900 dark:text-white"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              {totalCount} {totalCount === 1 ? 'document' : 'documents'}
            </span>
          </div>
        </div>

        {/* Content Table / Empty State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <Loader2 className="animate-spin text-secondary mb-3" size={36} />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Loading documents...
            </p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-secondary dark:text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={30} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No documents found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              {search || selectedCategory !== 'All'
                ? 'Try adjusting your search query or category filter.'
                : 'Get started by uploading official reports, policies, guidelines, or environmental assessments.'}
            </p>
            <Link
              to="/admin/documents/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all"
            >
              <FileUp size={16} />
              <span>Upload First Document</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Document Title</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Format & Size</th>
                    <th className="py-4 px-4">Downloads</th>
                    <th className="py-4 px-4">Date Uploaded</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {documents.map((doc) => {
                    const downloadUrl = `${API_URL}/api/documents/${doc.id}/download/`;

                    return (
                      <tr
                        key={doc.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Title & Description */}
                        <td className="py-4 px-6 max-w-xs sm:max-w-md">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                              <FileText size={18} />
                            </div>
                            <div className="min-w-0">
                              <a
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors line-clamp-1"
                              >
                                {doc.title}
                              </a>
                              {doc.description && (
                                <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 mt-0.5">
                                  {doc.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                            {doc.category || 'General'}
                          </span>
                        </td>

                        {/* Format & Size */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getFileBadge(doc.file_type)}
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {doc.file_size || 'N/A'}
                            </span>
                          </div>
                        </td>

                        {/* Downloads */}
                        <td className="py-4 px-4 whitespace-nowrap text-slate-700 dark:text-slate-300">
                          <span className="font-bold">{doc.download_count ?? 0}</span>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-slate-400" />
                            <span>{doc.uploaded_at ? doc.uploaded_at.slice(0, 10) : 'Recent'}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={downloadUrl}
                              download
                              className="p-2 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              title="Download document"
                            >
                              <Download size={16} />
                            </a>

                            <Link
                              to={`/admin/documents/${doc.id}/edit`}
                              className="p-2 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              title="Edit document"
                            >
                              <Edit size={16} />
                            </Link>

                            <button
                              onClick={() => setDeleteConfirmId(doc.id)}
                              className="p-2 text-slate-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                              title="Delete document"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Page <span className="font-semibold text-slate-900 dark:text-white">{page}</span> of{' '}
                  <span className="font-semibold text-slate-900 dark:text-white">{totalPages}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={page <= 1 || isFetching}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .map((p, idx, arr) => (
                      <React.Fragment key={p}>
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span className="text-slate-400 text-xs px-1">...</span>
                        )}
                        <button
                          onClick={() => setPage(p)}
                          className={`w-8 h-8 rounded-lg text-xs font-semibold ${
                            page === p
                              ? 'bg-secondary text-white shadow-sm'
                              : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    ))}
                  <button
                    disabled={page >= totalPages || isFetching}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Confirm Document Deletion
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              Are you sure you want to permanently delete this document? This action cannot be undone and visitors will no longer be able to download it.
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
