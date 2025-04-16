import React, { useState } from 'react';
import { uploadImage } from '../../services/imageService';
import { FiUploadCloud } from 'react-icons/fi';
import ImageGallery from './ImageGallery';
import { useImages } from '../../context/ImageContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const { setImages } = useImages();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadImage(formData);
      setImages((prevImages) => [...prevImages, res.data.image]);
      setFile(null);
      toast.success(res.data.message);
      navigate(`/dashboard/edit/${res.data.image._id}`);
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <form onSubmit={handleSubmit} className="w-full">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-[25vh] border-2 border-dashed border-indigo-400 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <FiUploadCloud className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mb-4" />

          {file ? (
            <>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-100">{file.name}</span>
              <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">Ready to upload</p>
            </>
          ) : (
            <>
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">Click to upload image</span>
              <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">Maximum size: 10MB</p>
            </>
          )}

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            required
          />
        </label>

        <Button
          type="submit"
          className="mt-4 bg-indigo-600 hover:bg-indigo-700"
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Detecting boundaries, please wait...</span>
            </div>
          ) : (
            'Upload Image'
          )}
        </Button>
      </form>

      <ImageGallery />
    </div>
  );
};

export default ImageUploader;