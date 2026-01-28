import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBlogs } from '../ApiHook';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { API_URL } from '../../config';

const createMarkup = (html) => {
  return { __html: DOMPurify.sanitize(html) };
};

const BlogsPage = () => {
  const { data: blogs, isLoading, isSuccess } = useBlogs();

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/img2.jpeg")' }}
        >
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-light font-bold uppercase tracking-widest text-sm mb-4 block">
              News & Updates
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
              Our <span className="text-primary-light">Latest Stories</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stay informed about the latest developments, project milestones, and community transformations across Sokoto State.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto py-20 px-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary mb-4" size={48} />
            <p className="text-slate-500 font-medium tracking-wide">Fetching latest updates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${blog.slug}`} className="block h-full">
                  <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={`${API_URL}${blog.featured_image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <User size={14} className="text-primary-light" />
                          {blog?.author?.username || 'Admin'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-primary-light" />
                          {blog?.publish_date?.slice(0, 10)}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      {blog.content && (
                        <div
                          className="text-slate-600 line-clamp-3 mb-6 flex-grow"
                          dangerouslySetInnerHTML={createMarkup(blog.content.slice(0, 150) + '...')}
                        />
                      )}

                      <div className="flex items-center gap-2 text-primary font-bold group/btn mt-auto">
                        Read Full Story
                        <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogsPage;