// src/BlogDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useGetBlogByDetails } from '../ApiHook';
import DOMPurify from 'dompurify';
import { Spinner } from '@material-tailwind/react';
import Footer from '../components/Footer';
import { API_URL } from '../../config';


const createMarkup = (html) => {
  return { __html: DOMPurify.sanitize(html) };
};

const BlogDetailsPage = () => {
  const { slug } = useParams(); 
  const {data:blog, isLoading, isSuccess, isError, error} = useGetBlogByDetails(slug)  


 
  return (
    <div>
        <Navbar/>

<div className="max-w-4xl mx-auto py-10 px-4">
  {isLoading ? (
    <div className='text-center'>
 <Spinner/>
    </div>
   
  ):(
    <div>
      {/* Blog Header */}
<section className="mb-6">
  <img src={`${API_URL}${blog?.featured_image}`} alt={blog?.title} className="w-full h-64 object-cover rounded-lg mb-4" />
  <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
  <p className="text-lg text-gray-600 mb-4">{blog?.description}</p>
  <p className="text-sm text-gray-500">By {blog?.author?.username} on {blog?.publish_date?.slice(0,10)}</p>
</section>

{/* Blog Content */}
<section>
  <div className="prose max-w-none">
    <p dangerouslySetInnerHTML={createMarkup(blog?.content)}></p>
  </div>
</section>

    </div>
  )}

</div>

<Footer/>
    </div>
 
  );
};

export default BlogDetailsPage;
