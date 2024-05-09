import axios, { AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL + '/api/',
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token');
    console.log('Request Interceptor:', token);

    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    console.error('Request Error Interceptor:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response Interceptor:', response);
    return response;
  },
  (error: AxiosError) => {
    if (error.status === 401) {
      window.location.href = `${window.location.host}/login`
    }
    console.error('Response Error Interceptor:', error);
    return Promise.reject(error);
  }
);

export default api;
