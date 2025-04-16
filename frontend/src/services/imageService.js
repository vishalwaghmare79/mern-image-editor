import api from "./api";

export const uploadImage = (formData) => {
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getImage = (imageId) => {
  return api.get(`/image/${imageId}`);
};
export const getImages = () => {
  return api.get('/images');
};

export const updateImageBoundaries = (imageId, boundaries) => {
  return api.put(`/image/${imageId}`, boundaries);
};

export const deleteImage = (imageId) => {
  return api.delete(`/image/${imageId}`);
}