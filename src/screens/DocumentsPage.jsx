import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDocuments, useDocumentCategories } from '../ApiHook';
import { API_URL } from '../../config';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  Eye,
  CheckCircle2,
  HardDrive,
  Loader2,
  FileSpreadsheet,
  FileCode,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
  Layers,
  Sparkles,
} from 'lucide-react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from 'react-icons/fa';

const getFileBadge = (fileType) => {
  const type = (fileType || '').toUpperCase();
  if (type.includes('PDF')) {
    return {
      icon: <FaFilePdf className="text-red-500 text-xl" />,
      bg: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900',
      label: 'PDF',
    };
  } else if (type.includes('DOC')) {
    return {
      icon: <FaFileWord className="text-blue-600 text-xl" />,
      bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900',
      label: 'Word',
    };
  } else if (type.includes('XLS') || type.includes('CSV') || type.includes('SHEET')) {
    return {
      icon: <FaFileExcel className="text-emerald-600 text-xl" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
      label: 'Excel',
    };
  }
  return {
    icon: <FaFileAlt className="text-amber-500 text-xl" />,
    bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900',
    label: type || 'FILE',
  };
};

export default function DocumentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: categories = [] } = useDocumentCategories();
  const { data, isLoading, isFetching } = useDocuments({
    page,
    search,
    category: selectedCategory === 'All' ? '' : selectedCategory,
    pageSize: 9,
  });

  const documents = data?.results || (Array.isArray(data) ? data : []);
  const totalCount = data?.count ?? documents.length;
  const totalPages = data?.total_pages ?? 1;

  const allCategories = ['All', ...categories];

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-900 text-white">
        {/* Background Visual Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: 'url("/images/img2.jpeg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-900" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              Official Documents <span className="text-primary-light">& Downloads</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore and download our official project publications, environmental impact assessments, strategic reports, and policy frameworks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 md:px-8 py-12 md:py-16 flex-grow">
        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 p-5 md:p-6 mb-12 -mt-16 md:-mt-20 relative z-20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search publications by title or topic..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all placeholder:text-slate-400"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch('');
                    setPage(1);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-600 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Total Results Summary */}
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 self-start md:self-center">
              <Layers size={16} className="text-primary" />
              <span>
                Found <strong className="text-slate-900 dark:text-white font-bold">{totalCount}</strong> available {totalCount === 1 ? 'document' : 'documents'}
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          {allCategories.length > 1 && (
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/80 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0">
                Categories:
              </span>
              {allCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                        : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Documents Grid / States */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="animate-spin text-primary mb-4" size={48} />
            <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              Retrieving public documents...
            </p>
          </div>
        ) : documents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 max-w-xl mx-auto shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-primary flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Documents Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              {search || selectedCategory !== 'All'
                ? `No publications match "${search}" in "${selectedCategory}". Try choosing "All" or clearing the search bar.`
                : 'There are currently no public documents published in this repository.'}
            </p>
            {(search || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                  setPage(1);
                }}
                className="btn-primary-premium text-sm py-2 px-5 rounded-xl inline-flex items-center gap-2"
              >
                Reset Filters
              </button>
            )}
          </motion.div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {documents.map((doc, idx) => {
                const badge = getFileBadge(doc.file_type);
                const downloadUrl = `${API_URL}/api/documents/${doc.id}/download/`;
                const fileDirectUrl = doc.file_url || `${API_URL}${doc.file}`;

                return (
                  <motion.article
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 3) * 0.08, duration: 0.5 }}
                    className="group bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-7 border border-slate-200/80 dark:border-slate-700/80 hover:border-primary/40 dark:hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Icon + Category Badge */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600/60 shadow-inner group-hover:scale-105 transition-transform duration-300">
                          {badge.icon}
                        </div>

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:text-primary-light">
                          {doc.category || 'General'}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-3 line-clamp-2">
                        {doc.title}
                      </h2>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {doc.description ||
                          'Official document published by the Sokoto State ACReSAL Project Implementation Unit.'}
                      </p>
                    </div>

                    <div>
                      {/* Metadata bar */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 mb-5">
                        <div className="flex items-center gap-1.5">
                          <HardDrive size={13} className="text-primary-light" />
                          <span>
                            <strong className="text-slate-700 dark:text-slate-300 font-semibold uppercase">
                              {doc.file_type || 'FILE'}
                            </strong>{' '}
                            {doc.file_size && `• ${doc.file_size}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-primary-light" />
                          <span>{doc.uploaded_at ? doc.uploaded_at.slice(0, 10) : 'Recent'}</span>
                        </div>
                      </div>

                      {/* Download CTA button */}
                      <a
                        href={downloadUrl}
                        download
                        className="w-full py-3 px-5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group/btn"
                      >
                        <ArrowDownToLine
                          size={18}
                          className="transition-transform group-hover/btn:-translate-y-0.5"
                        />
                        <span>Download Document</span>
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Page <strong className="text-slate-800 dark:text-slate-200">{page}</strong> of{' '}
                  <strong className="text-slate-800 dark:text-slate-200">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page <= 1 || isFetching}
                    onClick={() => {
                      setPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .map((p, idx, arr) => (
                      <React.Fragment key={p}>
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span className="text-slate-400 text-sm px-1 font-bold">...</span>
                        )}
                        <button
                          onClick={() => {
                            setPage(p);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                            page === p
                              ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    ))}

                  <button
                    disabled={page >= totalPages || isFetching}
                    onClick={() => {
                      setPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
