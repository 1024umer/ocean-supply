import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
