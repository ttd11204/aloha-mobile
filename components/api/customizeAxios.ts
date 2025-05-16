import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://aloha-vietnam.azurewebsites.net/api/',
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response, // Giữ nguyên response nếu không có lỗi
  (error) => {
    let errorMessage = 'An unknown error occurred.';

    if (error.response) {
      errorMessage = error.response.data?.message || 'Server error occurred';
    } else if (error.request) {
      errorMessage = 'Network error: No response received from server.';
    } else {
      errorMessage = error.message;
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default instance;
