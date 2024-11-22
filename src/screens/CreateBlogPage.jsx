import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';





import { FileInput } from 'react-daisyui';
import { UserStore } from '../state/store';
import { useCreateBlog } from '../ApiHook';
import Navbar from '../components/Navbar';
import Editor from '../components/Editor';



const CreateBlogScreen = () => {
 const userInfo = UserStore.useState((state)=> state.user)
 
const {isSuccess, isLoading, isError, error, mutate, data}= useCreateBlog()

 

 const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: '',
    imagePreview: null,
    content: "",
  
 });

 const [category, setCategory] = useState('')

 const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

 const navigate = useNavigate();


 const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(category)
    mutate({
      title: formData.title,
      image: formData.image,
      content: formData.content,
      author:userInfo.id,
      category
    });
 };

 useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (data && isSuccess) {
      navigate('/admin/'); // Adjust the route as necessary
  
    }
 }, [data, isSuccess, navigate, userInfo]);

 const handleChange = (e, content) => {
    if (content !== undefined) {
      setFormData({
        ...formData,
        content: content,
      });
    } else if (e.target.name === 'image') {
      // Handle image file separately for preview
      const file = e?.target.files[0];
      setFormData({
        ...formData,
        [e?.target.name]: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handNavBack = ()=>{
    navigate(-1)
  }

 return (
  <>
        <div className='hidden md:block'>
    <Navbar/>
     </div>

    <div className="container mx-auto  p-2   max-w-[956px] mt-[10vh] md:mt-0">
    

    <div className="p-8 ">

      <button className='btn mb-6 bg-blue-700 text-white' onClick={handNavBack}>Back</button>
      
      <form className='' onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
            className="input-bordered border p-2 rounded-md border-black focus:outline-none  text-xl w-full"
            placeholder='Tilte'
          />
        </div>

        <div className="overflow-hidden bg-blue-500 h-full w-full flex-shrink-0 ">
          {formData.imagePreview ? (
            <img src={formData.imagePreview} alt="Profile Preview" className="w-full h-40 object-cover" />
          ) : (
            <img src="https://via.placeholder.com/150" alt="task" className="w-full h-40 object-cover" />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600 font-medium mb-2">Cover Image:</label>
          <FileInput
            type="file"
            id="taskimage"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className=""
          />
        </div>
        <div className='mb-4'>
          <select onChange={(e)=>setCategory(e.target.value)} className="select select-bordered w-full ">
            <option disabled selected>Choose Category</option>
            <option value={'Entertainment'}>Entertainment</option>
            <option value={'News'}>News</option>
          </select>
          
        </div>
        <div className="mb-10">
         
          <Editor description={formData.content} change={(content) => handleChange(null, content)} />
        </div>
        <div className='mt-20'> 
        <button
          type="submit"
          className="btn w-full bg-blue-700 text-white"
        >
          Create Blog
        </button>

        </div>
      
      </form>
    </div>
  </div>
  </>
   
 );
};

export default CreateBlogScreen;
