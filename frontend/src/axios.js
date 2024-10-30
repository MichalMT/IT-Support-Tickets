import axios from 'axios';
import router from './router'; // Ensure you have access to the router

const instance = axios.create({});

// Add the interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login with a query parameter
      router.push({ name: 'Login', query: { sessionExpired: true } });
    }
    return Promise.reject(error);
  }
);

export default instance;