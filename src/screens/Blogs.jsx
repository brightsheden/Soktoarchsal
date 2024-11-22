import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBlogs } from '../ApiHook';
import { Link } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import DOMPurify from 'dompurify'
import { API_URL } from '../../config';
const createMarkup = (html) => {
  return { __html: DOMPurify.sanitize(html) };
};

const BlogsPage = () => {
  const {data:blogs, isLoading, isSuccess, isError, error} = useBlogs();


  return (
    <div>
      <Navbar/>
      {/* Hero Section */}
      <section 
        className="hero min-h-screen bg-cover bg-center relative" 
        style={{ backgroundImage: 'url("/images/img2.jpeg")' }}
      >
        {/* Overlay for the faded effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="hero-content text-center relative z-10 text-white">
          <div>
            <h1 className="text-5xl font-bold">Welcome to the Blog</h1>
            <p className="py-6">Discover the latest news and trends about Sokoto Acresal projects</p>
          </div>
        </div>
      </section>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {/* Blog Cards Container */}
      {isSuccess && (
        <div className="container mx-auto py-10 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.map(blog => (
              <div key={blog.id} className="card w-full bg-base-100 shadow-xl">
                <figure>
                  <img src={`${API_URL}${blog.featured_image}`} alt={blog.title} className="w-full h-56 object-cover" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{blog.title}</h2>
                  <p dangerouslySetInnerHTML={createMarkup(blog?.content?.slice(0,20))}></p>
                  <div className="card-actions justify-end">
                    <Link to={`/blog/${blog.slug}`}>
                      <button className="btn btn-primary bg-blue-700 border-blue-700">Read More</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default BlogsPage;