// src/BlogDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const blogData = [
  {
    id: 1,
    title: "Understanding React Hooks",
    description: "A deep dive into the world of React Hooks and how to use them effectively.",
    content: "React Hooks are functions that let you hook into React state and lifecycle features from function components. You can use hooks like `useState`, `useEffect`, and custom hooks to manage state and side effects in your components.",
    imageUrl: "https://via.placeholder.com/800x400",
    author: "John Doe",
    publishedDate: "2024-11-15",
  },
  {
    id: 2,
    title: "Mastering TailwindCSS",
    description: "A complete guide to using TailwindCSS in your projects.",
    content: "TailwindCSS is a utility-first CSS framework that enables you to build designs directly in your markup. You can customize it, extend it, and use it with any JavaScript framework.",
    imageUrl: "https://via.placeholder.com/800x400",
    author: "Jane Smith",
    publishedDate: "2024-11-14",
  },
  {
    id: 3,
    title: "DaisyUI for Beginners",
    description: "How to use DaisyUI with TailwindCSS to create beautiful UIs.",
    content: "DaisyUI is a plugin for TailwindCSS that provides ready-to-use UI components like buttons, cards, modals, and more. It helps you build stunning UI elements quickly with minimal custom CSS.",
    imageUrl: "https://via.placeholder.com/800x400",
    author: "Alice Brown",
    publishedDate: "2024-11-13",
  },
];

const BlogDetailsPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const blog = blogData.find(blog => blog.id === parseInt(id));

  if (!blog) {
    return <div className="text-center py-10">Blog not found!</div>;
  }

  return (
    <div>
        <Navbar/>

<div className="max-w-4xl mx-auto py-10 px-4">
{/* Blog Header */}
<section className="mb-6">
  <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
  <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
  <p className="text-lg text-gray-600 mb-4">{blog.description}</p>
  <p className="text-sm text-gray-500">By {blog.author} on {blog.publishedDate}</p>
</section>

{/* Blog Content */}
<section>
  <div className="prose max-w-none">
    <p>{blog.content}</p>
  </div>
</section>
</div>
    </div>
 
  );
};

export default BlogDetailsPage;
