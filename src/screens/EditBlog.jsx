import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { FileInput } from 'react-daisyui';
import { Alert } from '@material-tailwind/react';


import { API_URL } from '../../config';
import { UserStore } from '../state/store';
import { useEditBlog, useGetBlogByDetails } from '../ApiHook';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';

const UserEditBlogScreen = () => {
    const { slug } = useParams();
    const userInfo = UserStore.useState((state) => state.user);




    const [formData, setFormData] = useState({
        title: "",
        image: null,
        imagePreview: null,
        content: "",
      
    });

    const navigate = useNavigate();


    const {data:blog, isLoading,isSuccess, error} = useGetBlogByDetails(slug)
    const {mutate:updateBlog, isLoading:isLoadingUpdate, isError:isErrorUpdate, error:errorUpdate,isSuccess:isSuccessUpdate} = useEditBlog()

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog?.title,
                image: blog?.featured_image,
                imagePreview: blog?.featured_image,
                content: blog?.content,
                is_approved: blog?.published
            });
        }
    }, [blog]);

    useEffect(() => {
        
        if (!userInfo) {
            navigate('/login');
        }

        if(isSuccessUpdate){
            navigate('/admin')
        }
        

    }, [ isSuccessUpdate]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedBlog = {
            id: blog.id,
            title: formData.title,
            image: formData.image,
            content: formData.content,
            author: userInfo.id,
            
        };

        const formDataObj = new FormData();
        formDataObj.append('title', formData.title);
        formDataObj.append('image', formData.image);
        formDataObj.append('content', formData.content);
        formDataObj.append('author', userInfo.id);
        formDataObj.append('published', formData.is_approved);
        updateBlog({ id: blog.id, data: formDataObj })
        console.log(formDataObj)
    };

    const handleChange = (e, content) => {
        if (content !== undefined) {
            setFormData({
                ...formData,
                content: content,
            });
        } else if (e.target.name === 'image') {
            const file = e?.target.files[0];
            setFormData({
                ...formData,
                [e?.target.name]: file,
                imagePreview: URL.createObjectURL(file),
            });
        } else if (e.target.type === 'checkbox') {
            setFormData({
                ...formData,
                is_approved: e.target.checked,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <>
           <div className=''>
   <Navbar/>
     </div>
            <div className="container mx-auto p-4 max-w-[956px] mt-[8vh]">
              
                <div className="p-8 rounded-md w-full md:w-full">
                    <h2 className="hidden md:block text-2xl font-semibold mb-4">Edit Blog</h2>
                    {isSuccessUpdate ? (<Alert>Blog Updated Successfully</Alert>) : null}

                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={(e) => handleChange(e)}
                                className="input hover:border-none focus:border-none hover:outline-none focus:outline-none text-2xl w-full"
                            />
                        </div>

                        <div className="overflow-hidden bg-blue-500 h-full w-full flex-shrink-0">
                            {formData.imagePreview ? (
                                <img src={`${API_URL}${formData.imagePreview}`} alt="Blog preview" className="w-full h-40 object-cover" />
                            ) : (
                                <img src="https://via.placeholder.com/150" alt="task" className="w-full h-40 object-cover" />
                            )}
                        </div>
                        <div className="mb-4">
                            <FileInput
                                type="file"
                                id="taskimage"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="file-input-bordered my-5"
                            />
                        </div>
                        <div className="mb-4">
                            
                            <Editor description={formData.content} change={(content) => handleChange(null, content)} />
                        </div>

                      
                        <div className='mt-20'>
                            <button
                                type="submit"
                                className="btn w-full btn-primary p-2"
                            >
                                Update Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserEditBlogScreen; 