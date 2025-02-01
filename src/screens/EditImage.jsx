import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileInput } from 'react-daisyui';
import {  useEditImage, useGetImageDetails} from '../ApiHook';
import Navbar from '../components/Navbar';
import { API_URL } from '../../config';

const EditImageScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: imageData, isLoading } = useGetImageDetails(id);
  const { mutate, isSuccess } = useEditImage();

  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null,
    description: '',
  });

  useEffect(() => {
    if (imageData) {
      setFormData({
        image: null,
    
        description: imageData.description,
      });
    }
  }, [imageData]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin/gallery');
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updateData = new FormData();
    if (formData.image) updateData.append('image', formData.image);
    updateData.append('description', formData.description);
    mutate({ id, data: updateData });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-md mt-10">
        <h2 className="text-xl font-bold mb-4">Edit Image</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Image Preview:</label>
            <div className="border p-2 flex justify-center">
              {formData.imagePreview ? (
                <img src={`${formData.imagePreview}`} alt="Preview" className="w-full h-40 object-cover" />
              ) : (
                <img src={`${API_URL}${imageData?.image}`} alt="Preview" className="w-full h-40 object-cover" />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-600 font-medium mb-2">Upload New Image:</label>
            <FileInput type="file" name="image" accept="image/*" onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows="3"
            />
          </div>
          <button type="submit" className="btn bg-blue-700 text-white w-full">Update Image</button>
        </form>
      </div>
    </>
  );
};

export default EditImageScreen;
