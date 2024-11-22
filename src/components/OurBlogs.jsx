import React from 'react'
import { useBlogs } from '../ApiHook';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'
import { FaClock, FaUser } from 'react-icons/fa';
import { API_URL } from '../../config';


const createMarkup = (html) => {
  return { __html: DOMPurify.sanitize(html) };
};

function OurBlogs() {
    const {data:blogs, isLoading, isSuccess, isError, error} = useBlogs();
  return (
    <div className='container mx-auto overflow-x-hidden p-2 '>

        <div>
            <h2 className='font-bold  text-2xl md:text-4xl font-popins text-blue-700'>OUR Latest Blog</h2>
        </div>

        <div>
          {!blogs ? (<div className='text-3xl font-semibold text-center p-8'>
            No blogs available
          </div>):( <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
            {blogs?.length === 0 ? (
                <div className="text-center text-2xl font-bold text-gray-600 my-5">No Latest news at the moment</div>
            ): (
                blogs?.map(blog => (
                    <Link to={`/blog/${blog.slug}`} key={blog.id} className="card w-full bg-base-100 shadow-xl hover:motion-preset-blur-right ">
                      <figure>
                        <img src={`${API_URL}${blog.featured_image}`} alt={blog.title} className="w-full h-56 object-cover" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title hover:text-blue-700">{blog.title}</h2>
                        <div className='flex gap-2 '>
                        
                          <span className='text-sm text-gray-500'>
                          By
                          </span>

                          <span className='text-gray-500 text-sm font-bold flex items-center gap-2'>
                            <FaUser className='text-gray-500'  /> {blog?.author.username}
                          </span>
                          <span className='text-sm text-gray-500'>
                          On

                          </span>
                     
                          <span className='text-gray-500 text-sm font-bold flex items-center gap-2'>
                              <FaClock className='text-gray-500'/>
                              {blog?.publish_date?.slice(0,10)}</span>
                        </div>
                        {blog.content ? (
                          <p dangerouslySetInnerHTML={createMarkup(blog?.content?.slice(0,20))}></p>
                        ):null}
                        
                        <div className="card-actions justify-end">
                          <Link to={`/blog/${blog.slug}`}>
                            <p className=" font-bold  text-blue-700">Read More</p>
                          </Link>
                        </div>
                      </div>
                    </Link>
                  ))
            )}
           
          </div>
)}
       
        </div>
      
    </div>
  )
}

export default OurBlogs
