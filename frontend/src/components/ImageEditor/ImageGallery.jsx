import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getImages, deleteImage } from '../../services/imageService';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data } = await getImages();
        setImages(data.images || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (imageId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this image?');
      if (!confirmDelete) return;

      const res = await deleteImage(imageId);
      setImages(images.filter(image => image._id !== imageId));
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to delete image');
    }
  };

  return (
    <div className="mt-4 p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">
        Image Gallery
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">No images found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="relative group border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-gray-700"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.originalName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 md:opacity-0 md:group-hover:opacity-80 opacity-80 transition-all duration-300 flex items-center justify-center space-x-4">
                  <Link
                    to={`/dashboard/edit/${image._id}`}
                    className="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="p-2 bg-white rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {image.originalName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(image.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;