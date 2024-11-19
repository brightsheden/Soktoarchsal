import React from 'react'
import { useBlogs } from '../ApiHook'
import {API_URL} from '../../config'
import { Link } from 'react-router-dom'

function AdminBlogListScreen() {

    
const {data:blogs }= useBlogs()

  
  return (
    <div>

        <div className='flex items-center justify-between'>
        <h1>Admin Blog List Screen</h1> 
        <button className='btn '>Add New Blog</button>
        </div>

        <div>
              {/* Blog Cards Container */}
      <div className="container mx-auto py-10 px-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map(blog => (
            <div key={blog.id} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img src={`${API_URL}${blog.featured_image}`} alt={blog.title} className="w-full h-56 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.description}</p>
                <div className="gap-2 items-center flex  flex-row  w-full  ">
             
                <button className="btn btn-primary bg-red-700 border-blue-700 w-[50%] hover:bg-red-300">Delete</button>
                  <Link to={`/admin/blog/${blog.slug}/`} className="btn btn-primary bg-blue-700 border-blue-700 w-[50%]">Edit</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
      

        

      
    </div>
  )
}

export default AdminBlogListScreen
