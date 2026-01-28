import React from 'react';
import { useBlogs } from '../ApiHook';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { API_URL } from '../../config';
import { motion } from 'framer-motion';

const createMarkup = (html) => {
  return { __html: DOMPurify.sanitize(html) };
};

function OurBlogs() {
  const { data: blogs, isLoading } = useBlogs();

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              News & Updates
            </span>
            <h2 className="heading-lg">
              Explore Our <span className="text-gradient">Latest Stories</span>
            </h2>
          </div>
          <Link to="/news" className="btn-secondary-premium group">
            View All News
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!blogs || blogs.length === 0 ? (
              <div className="col-span-full text-center p-12 glass-card rounded-3xl">
                <p className="text-xl font-medium text-slate-500">No news updates at the moment.</p>
              </div>
            ) : (
              blogs.slice(0, 3).map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link to={`/blog/${blog.slug}`} className="block h-full">
                    <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={`${API_URL}${blog.featured_image}`}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                          Featured
                        </div>
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

                        <div className="flex items-center gap-2 text-primary font-bold group/btn">
                          Read Full Article
                          <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default OurBlogs;
