import api from "./api";

export const register = (formData) => {
  return api.post('/auth/register', formData);
};

export const login = (formData) => {
  return api.post('/auth/login', formData);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    // Decode token (you can use jwt-decode for this)
    return JSON.parse(atob(token.split('.')[1])); 
  }
  return null;
};

export const setCurrentUser = (token) => {
  localStorage.setItem('token', token); 
};

