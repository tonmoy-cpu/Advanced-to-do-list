import axios from 'axios';

// Create an axios instance with default configs
const api = axios.create({
  timeout: 10000, // timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // You could add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    console.error('API Error:', errorMessage);
    return Promise.reject(error);
  }
);
export default api;