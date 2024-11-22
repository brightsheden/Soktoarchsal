import React from 'react';
import { useBlogs, useDeleteAccount } from '../ApiHook';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaClock, FaEdit, FaPlusCircle, FaTrash, FaUser } from 'react-icons/fa';

function AdminBlogListScreen() {
  const { data: blogs } = useBlogs();
  const { mutate, isLoading } = useDeleteAccount();

  const handleDelete = (id) => {
    mutate({ id });
  };

  return (
    <div>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
        </div>
      </header>

      <div className="container mx-auto p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <Link to={'/admin'} className="btn my-2">
              Go back
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold font-popins">
              Admin Blog Management
            </h1>
            <p className="text-sm sm:text-base">Manage your blog posts</p>
            <Link to="/createblog" className="btn bg-blue-700 text-white mt-2 flex items-center">
              <FaPlusCircle className="mr-2" /> Add New Blog
            </Link>
          </div>
        </div>

        <div>
          <div className="container mx-auto py-6 sm:py-10 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {blogs?.map((blog) => (
                <div key={blog.id} className="card bg-base-100 shadow-md">
                  <figure>
                    <img
                      src={`${API_URL}${blog.featured_image}`}
                      alt={blog.title}
                      className="w-full h-40 sm:h-56 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-sm sm:text-base lg:text-lg">{blog.title}</h2>
                    <div className="flex gap-2 flex-wrap text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaUser /> {blog?.author.username}
                      </span>
                      |
                      <span className="flex items-center gap-1">
                        <FaClock /> {blog?.publish_date?.slice(0, 10)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm">{blog.description}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        disabled={isLoading}
                        className="btn bg-red-700 text-white w-1/2 hover:bg-red-500"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                      <Link to={`/admin/blog/${blog.slug}/`} className="btn bg-gray-100 border w-1/2">
                        <FaEdit className="mr-1" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogListScreen;
