<template>
    <Navbar />
    <div class="container">
      <h1>Admin Dashboard</h1>

      <div class="dashboard">
        <div class="dashboard-cell">
          <h2>{{ newTickets.length }}</h2>
          <p>New <br class="sm">Tickets</p>
        </div>
        <div class="dashboard-cell">
          <h2>{{ inProgressTickets.length }}</h2>
          <p>Tickets In<br class="sm"> Progress</p>
        </div>
        <div class="dashboard-cell">
          <h2>{{ closedTickets.length }}</h2>
          <p>Closed<br class="sm"> Tickets</p>
        </div>
      </div>

      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <h1>New Tickets</h1>

      <div class="ticket-container">
        <TicketCard v-for="ticket in newTickets" :ticket="ticket"></TicketCard>
      </div>

      <h1>Tickets In Progress</h1>

      <div class="ticket-container">
        <TicketCard v-for="ticket in inProgressTickets" :ticket="ticket"></TicketCard>
      </div>

      <h1>Closed Tickets</h1>

      <div class="ticket-container">
        <TicketCard v-for="ticket in closedTickets" :ticket="ticket"></TicketCard>
      </div>

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
const newTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'new' || ticket.status === 'New'));
const inProgressTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'In Progress'));
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

  .sm {
    display: none;
  }

  @media (max-width: 1160px) {
    .sm {
        display: initial;
    }
  }

  @media (max-width: 700px) {
    .dashboard-cell {
      width: 100%;
    }
    .dashboard-cell:nth-child(2) {
      margin: 30px 0;
    }
    .sm {
      display: none;
    }
  }

</style>