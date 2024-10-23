import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useTickets } from './useTickets';

const user = ref(null);
const token = ref(null);
const isAuthenticated = ref(false);

export function useAuth() {
  const router = useRouter();
  const { clearTickets } = useTickets();

  const login = async (credentials) => {
    try {
      const response = await axios.post('api/users/login', credentials);
      const { _id, name, email, isAdmin, token: userToken } = response.data;

      user.value = { _id, name, email, isAdmin };
      token.value = userToken;
      isAuthenticated.value = true;

      // Save token to localStorage
      localStorage.setItem('ist_token', userToken);

      // Set the token as the default authorization header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

      // Redirect to the dashboard after successful login
      router.push('/');
    } catch (error) {
      console.error('Failed to log in:', error);
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;

    // Remove token from storage
    localStorage.removeItem('ist_token');

    // Remove the Authorization header from axios
    delete axios.defaults.headers.common['Authorization'];

    clearTickets();

    // Redirect to login page after logout
    router.push('/login');
  };

  const initAuth = async () => {
    const storedToken = localStorage.getItem('ist_token');

    if (storedToken && !user.value) {
      try {
        token.value = storedToken;

        // Set the token as the default authorization header for axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        // Fetch user data from the backend
        const response = await axios.get('/api/users/me');
        const { _id, name, email, isAdmin } = response.data;

        user.value = { _id, name, email, isAdmin };
        isAuthenticated.value = true;
      } catch (error) {
        console.error('Failed to fetch user data:', error);

        // If the token is invalid or expired, log out
        logout();
      }
    }
  };

  // Call initAuth on composable creation to initialize the auth state
  initAuth();

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    initAuth
  };
}