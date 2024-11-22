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
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        image: null,
        imagePreview: null,
        content: "",
        is_approved: false,
        isSubmitting: false,
    });

    const [error, setError] = useState(null);

    const {
        data: blog,
        isLoading,
        isSuccess,
        error: errorLoadingBlog,
    } = useGetBlogByDetails(slug);

    const {
        mutate: updateBlog,
        isLoading: isLoadingUpdate,
        isError: isErrorUpdate,
        error: errorUpdate,
        isSuccess: isSuccessUpdate,
    } = useEditBlog();

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog?.title || "",
                image: blog?.featured_image || null,
                imagePreview: blog?.featured_image || null,
                content: blog?.content || "",
                is_approved: blog?.published || false,
            });
        }
    }, [blog]);

    useEffect(() => {
        if (!userInfo) navigate('/login');
        if (isSuccessUpdate) navigate('/admin');
    }, [userInfo, isSuccessUpdate, navigate]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        if (!formData.title.trim() || !formData.content.trim()) {
            setError('Title and content are required');
            return;
        }
    
        try {
            setFormData((prev) => ({ ...prev, isSubmitting: true }));
    
            const formDataObj = new FormData();
            formDataObj.append('title', formData.title.trim());
            formDataObj.append('content', formData.content.trim());
            formDataObj.append('author', userInfo.id);
            formDataObj.append('published', formData.is_approved);
    
            // Include the image in the payload
            if (formData.image instanceof File) {
                formDataObj.append('image', formData.image);
            } else if (formData.image) {
                formDataObj.append('image', formData.image);
            }
    
            await updateBlog({
                id: blog.id,
                data: formDataObj,
            });
        } catch (err) {
            setError(err.message || 'Failed to update blog');
        } finally {
            setFormData((prev) => ({ ...prev, isSubmitting: false }));
        }
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">Loading...</div>
        );
    }

    if (errorLoadingBlog) {
        return (
            <div className="text-red-500 text-center p-4">
                {errorLoadingBlog.message || 'Failed to load blog'}
            </div>
        );
    }

    return (
        <>
            <div className="sticky top-0 z-50 bg-white">
                <Navbar />
            </div>
            <div className="container mx-auto p-4 max-w-[956px] mt-[8vh]">
                <div className="p-8 rounded-md w-full">
                    <h2 className="hidden md:block text-2xl font-semibold mb-4">Edit Blog</h2>
                    {error && <Alert color="red" className="mb-4">{error}</Alert>}
                    {isSuccessUpdate && <Alert color="green" className="mb-4">Blog Updated Successfully</Alert>}
                    {isErrorUpdate && (
                        <Alert color="red" className="mb-4">
                            {errorUpdate?.message || 'Update failed'}
                        </Alert>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input hover:border-none focus:border-none hover:outline-none focus:outline-none text-2xl w-full"
                                placeholder="Blog Title"
                            />
                        </div>
                        <div className="overflow-hidden bg-blue-500 h-full w-full flex-shrink-0">
                        <img
    src={
        formData.imagePreview 
            ? (formData.imagePreview instanceof File 
                ? URL.createObjectURL(formData.imagePreview) 
                : `${API_URL}${formData.imagePreview}`)
            : (blog?.featured_image ? `${API_URL}${blog.featured_image}` : '')
    }
    alt="Blog preview"
    className="w-full h-40 object-cover"
/>
                        </div>
                        <div className="mb-4">
                            <FileInput
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="my-5 "
                            />
                        </div>
                        <div className="mb-4">
                            <Editor description={formData.content} change={(content) => handleChange(null, content)} />
                        </div>
                        <div className="mt-20">
                            <button
                                type="submit"
                                disabled={formData.isSubmitting || isLoadingUpdate}
                                className={`btn w-full btn-primary p-2 ${formData.isSubmitting || isLoadingUpdate ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {formData.isSubmitting || isLoadingUpdate ? 'Updating...' : 'Update Blog'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserEditBlogScreen;
