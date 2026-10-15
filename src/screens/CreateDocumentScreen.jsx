import React, { useState } from 'react';
import { useCreateDocument, useDocumentCategories } from '../ApiHook';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileUp,
  FileText,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

export default function CreateDocumentScreen() {
  const navigate = useNavigate();
  const { data: existingCategories = [] } = useDocumentCategories();
  const { mutate: createDocument, isLoading } = useCreateDocument();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      if (!title) {
        const nameWithoutExt = selected.name.replace(/\.[^/.]+$/, '');
        setTitle(nameWithoutExt);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Please enter a document title.');
      return;
    }

    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    const finalCategory = customCategory.trim() || category.trim() || 'General';

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('category', finalCategory);
    formData.append('file', file);

    createDocument(formData, {
      onSuccess: () => {
        navigate('/admin/documents');
      },
      onError: (err) => {
        setErrorMessage(
          err.response?.data?.detail ||
            err.response?.data?.error ||
            'Failed to upload document. Please try again.'
        );
      },
    });
  };

  return (
    <AdminLayout
      title="Upload New Document"
      subtitle="Add reports, policies, guidelines, or environmental assessments for public download"
      breadcrumbs={[
        { label: 'Documents', path: '/admin/documents' },
        { label: 'Upload' },
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
                placeholder="e.g. ACReSAL Sokoto Environmental & Social Management Framework (ESMF)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Select Existing Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (e.target.value) setCustomCategory('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="">-- Choose Category --</option>
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
                  Or Enter New Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Audit Reports"
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
                Document Summary / Description
              </label>
              <textarea
                rows={4}
                placeholder="Provide a concise summary of the document, objectives, target audience, or relevant project milestones..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* File Upload Zone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                File Attachment <span className="text-red-500">*</span>
              </label>

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-8 text-center hover:border-secondary transition-colors bg-slate-50/40 dark:bg-slate-800/20">
                <input
                  type="file"
                  id="document-file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="document-file"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-secondary dark:text-slate-300 flex items-center justify-center mb-3">
                    <FileUp size={28} />
                  </div>
                  <span className="text-sm font-semibold text-secondary dark:text-slate-300 hover:underline">
                    Click to browse files
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Supports PDF, DOC, DOCX, XLS, XLSX, PPT, ZIP up to 100MB
                  </span>
                </label>

                {file && (
                  <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl inline-flex items-center gap-3 text-left">
                    <FileText size={20} className="text-secondary dark:text-slate-300 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {file.name}
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
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-secondary hover:bg-slate-700 text-white shadow-md transition-all disabled:opacity-50"
              >
                {isLoading && <Loader2 className="animate-spin" size={16} />}
                <span>Upload Document</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
