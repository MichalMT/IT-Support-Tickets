import { ref } from 'vue';
import axios from '../axios';

const tickets = ref([]);

export function useTickets() {
  const loading = ref(false);
  const error = ref(null);

  // Fetch all tickets
  const fetchTickets = async () => {
    if (tickets.value.length > 0) {
      // Tickets are already in memory, so no need to fetch them again
      return;
    }
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get('/api/tickets');
      tickets.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch tickets';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Create a new ticket
  const createTicket = async (ticketData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('/api/tickets', ticketData);
      await tickets.value.push(response.data); // Add the new ticket to the list
      return response.data;
    } catch (err) {
      error.value = 'Failed to create ticket';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Delete a ticket
  const deleteTicket = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`/api/tickets/${id}`);
      tickets.value = tickets.value.filter(ticket => ticket._id !== id);
    } catch (err) {
      error.value = 'Failed to delete ticket';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Clear tickets after logout
  const clearTickets = () => {
    tickets.value = [];
  };

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    deleteTicket,
    clearTickets
  };
}