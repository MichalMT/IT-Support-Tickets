<template>
    <Navbar />
    <div class="container">
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <h1>Open Tickets</h1>

      <div class="ticket-container" v-if="openTickets.length > 0">
        <TicketCard v-for="ticket in openTickets" :ticket="ticket"></TicketCard>
      </div>
      <p v-else>You have no open tickets.</p>

      <h1>Closed Tickets</h1>

      <div class="ticket-container" v-if="closedTickets.length > 0">
        <TicketCard v-for="ticket in closedTickets" :ticket="ticket"></TicketCard>
      </div>
      <p v-else>You have no closed tickets</p>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTickets } from '../composables/useTickets';
import Navbar from '../components/Navbar.vue';
import TicketCard from '../components/TicketCard.vue';

const { tickets, loading, error, fetchTickets, createTicket, deleteTicket } = useTickets();

onMounted(async () => {
  if (tickets.value.length === 0) {
    await fetchTickets(); // Only fetch if tickets are not already loaded
  }
});

// Computed properties to filter tickets by status
const openTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'In Progress' || ticket.status === 'New'));
const closedTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'Closed'));

</script>

<style scoped>

  h1 {
    font-weight: bold;
    font-size: 40px;
    padding: 40px 0 20px;
  }

  .dashboard-cell {
    background: var(--primary);
    color: white;
    padding: 30px;
    border-radius: 30px;
    width: 30%;
    display: inline-block;
    text-align: center;
  }

  .dashboard-cell:nth-child(2) {
    margin: 0 5%;
  }

  .dashboard h2 {
    font-size: 64px;
    font-weight: bold;
    /* margin-bottom: 10px; */
  }
  .dashboard p {
    font-size: 20px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .ticket-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;    
    flex-wrap: wrap;               
  }

</style>