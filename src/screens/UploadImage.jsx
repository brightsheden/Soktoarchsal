import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileInput, Textarea } from 'react-daisyui';
import { UserStore } from '../state/store';
import Navbar from '../components/Navbar';
import { useAddImage } from '../ApiHook';

const UploadImageScreen = () => {
  const userInfo = UserStore.useState((state) => state.user);
  const { isSuccess, isLoading, mutate, data } = useAddImage();
  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null,
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (data && isSuccess) {
      navigate('/admin/gallery'); // Adjust the route as necessary
    }
  }, [data, isSuccess, navigate, userInfo]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e?.target.files[0];
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate({
      image: formData.image,
      description: formData.description,
    });
  };

  return (
    <>
      <div className='hidden md:block'>
        <Navbar />
      </div>
      <div className='container mx-auto p-2 max-w-[600px] mt-[10vh] md:mt-0'>
        <div className='p-8'>
          <form onSubmit={handleFormSubmit}>
            <div className='overflow-hidden bg-gray-300 h-40 w-full flex-shrink-0'>
              {formData.imagePreview ? (
                <img src={formData.imagePreview} alt='preview' className='w-full h-40 object-cover' />
              ) : (
                <img src='https://img.freepik.com/free-vector/image-upload-concept-illustration_114360-996.jpg?t=st=1738372797~exp=1738376397~hmac=7dc0cb511485c541306c299aebdb3f6ac53490889bfc25ee0765359cfb1147f6&w=740' alt='placeholder' className='w-full h-40 object-cover' />
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-600 font-medium mb-2'>Upload Image:</label>
              <FileInput type='file' name='image' accept='image/*' onChange={handleChange} />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-600 font-medium mb-2'>Description:</label>
              <Textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
                placeholder='Enter a description...'
              />
            </div>
            <div>
              <button type='submit' className='btn w-full bg-blue-700 text-white' disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadImageScreen;
