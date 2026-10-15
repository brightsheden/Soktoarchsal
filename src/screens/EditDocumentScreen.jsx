import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDocumentDetails, useUpdateDocument, useDocumentCategories } from '../ApiHook';
import { API_URL } from '../../config';
import {
  ArrowLeft,
  FileUp,
  FileText,
  AlertCircle,
  Download,
  X,
  Loader2,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function EditDocumentScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: document, isLoading: isFetchingDoc, error: errorLoading } =
    useDocumentDetails(id);
  const { data: existingCategories = [] } = useDocumentCategories();
  const { mutate: updateDocument, isLoading: isUpdating } = useUpdateDocument();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (document) {
      setTitle(document.title || '');
      setDescription(document.description || '');
      setCategory(document.category || 'General');
    }
  }, [document]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Please enter a document title.');
      return;
    }

    const finalCategory = customCategory.trim() || category.trim() || 'General';

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('category', finalCategory);
    if (file) {
      formData.append('file', file);
    }

    updateDocument(
      { id, data: formData },
      {
        onSuccess: () => {
          navigate('/admin/documents');
        },
        onError: (err) => {
          setErrorMessage(
            err.message ||
              err.response?.data?.detail ||
              'Failed to update document. Please try again.'
          );
        },
      }
    );
  };

  if (isFetchingDoc) {
    return (
      <AdminLayout
        title="Edit Document"
        breadcrumbs={[
          { label: 'Documents', path: '/admin/documents' },
          { label: 'Edit' },
        ]}
      >
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <Loader2 className="animate-spin text-secondary mb-3" size={36} />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Loading document information...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (errorLoading) {
    return (
      <AdminLayout
        title="Edit Document"
        breadcrumbs={[
          { label: 'Documents', path: '/admin/documents' },
          { label: 'Error' },
        ]}
      >
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900">
          <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Failed to Load Document
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            The requested document could not be loaded.
          </p>
          <Link
            to="/admin/documents"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-secondary text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to Documents</span>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const downloadUrl = `${API_URL}/api/documents/${id}/download/`;

  return (
    <AdminLayout
      title="Edit Document"
      subtitle={`Editing: ${document?.title || 'Document'}`}
      breadcrumbs={[
        { label: 'Documents', path: '/admin/documents' },
        { label: 'Edit' },
      ]}
      actions={
        <Link
          to="/admin/documents"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Documents</span>
        </Link>
      }
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-start gap-3 text-sm">
              <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Document Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  <option value="Policy Documents">Policy Documents</option>
                  <option value="Project Reports">Project Reports</option>
                  <option value="Guidelines & Manuals">Guidelines & Manuals</option>
                  <option value="Procurement & Tenders">Procurement & Tenders</option>
                  <option value="Environmental Assessments">Environmental Assessments</option>
                  <option value="Community Engagement">Community Engagement</option>
                  <option value="General">General</option>
                  {existingCategories
                    .filter(
                      (cat) =>
                        ![
                          'Policy Documents',
                          'Project Reports',
                          'Guidelines & Manuals',
                          'Procurement & Tenders',
                          'Environmental Assessments',
                          'Community Engagement',
                          'General',
                        ].includes(cat)
                    )
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Or Custom Category
                </label>
                <input
                  type="text"
                  placeholder="Custom category"
                  value={customCategory}
                  onChange={(e) => {
                    setCustomCategory(e.target.value);
                    if (e.target.value) setCategory('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Document Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Current Attached File Box */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                Current File on Record
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-secondary dark:text-slate-300">
                    <FileText size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      {document?.file ? document.file.split('/').pop() : 'Document file'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Type: <span className="font-mono uppercase font-bold text-secondary dark:text-slate-300">{document?.file_type}</span> • Size: {document?.file_size} • Downloads: {document?.download_count}
                    </p>
                  </div>
                </div>

                <a
                  href={downloadUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-secondary hover:bg-slate-700 text-white transition-colors self-start sm:self-auto shadow-sm"
                >
                  <Download size={14} />
                  <span>Download File</span>
                </a>
              </div>
            </div>

            {/* Replace File Option */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                Replace File Attachment (Optional)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Leave unselected to keep the current file unchanged.
              </p>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-secondary transition-colors bg-slate-50/40 dark:bg-slate-800/20">
                <input
                  type="file"
                  id="replace-file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="replace-file"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <FileUp size={24} className="text-slate-400 mb-2" />
                  <span className="text-sm font-semibold text-secondary dark:text-slate-300 hover:underline">
                    Click to select replacement file
                  </span>
                </label>

                {file && (
                  <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl inline-flex items-center gap-3 text-left">
                    <FileText size={18} className="text-secondary dark:text-slate-300 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        New file: {file.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="ml-2 text-slate-400 hover:text-red-500 p-1"
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <Link
                to="/admin/documents"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all disabled:opacity-50"
              >
                {isUpdating && <Loader2 className="animate-spin" size={16} />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
