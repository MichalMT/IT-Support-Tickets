import { ref } from 'vue';
import axios from '../axios';

export function useUsers() {
  const users = ref([]);
  const error = ref(null);
  const loading = ref(false);

  const getUsers = async () => {
    loading.value = true;
    try {
      const response = await axios.get('/api/users');
      users.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);

      // After deleting, remove the user from the local users array
      users.value = users.value.filter(user => user._id !== userId);
    } catch (err) {
      console.error("Error deleting user:", err);
      error.value = err.message;
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await axios.post('/api/users', userData);

      // Push the newly created user into the users array
      users.value.push(response.data);

    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return {
    users,
    error,
    loading,
    getUsers,
    deleteUser,
    addUser
  };
}