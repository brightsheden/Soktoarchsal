// src/BlogsPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const blogs = [
  {
    id: 1,
    title: "Understanding React Hooks",
    description: "A deep dive into the world of React Hooks and how to use them effectively.",
    imageUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: 2,
    title: "Mastering TailwindCSS",
    description: "A complete guide to using TailwindCSS in your projects.",
    imageUrl: "https://via.placeholder.com/400x250",
  },
  {
    id: 3,
    title: "DaisyUI for Beginners",
    description: "How to use DaisyUI with TailwindCSS to create beautiful UIs.",
    imageUrl: "https://via.placeholder.com/400x250",
  },
];

const BlogsPage = () => {
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


      {/* Blog Cards Container */}
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog.id} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-56 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary bg-blue-700 border-blue-700">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default BlogsPage;
