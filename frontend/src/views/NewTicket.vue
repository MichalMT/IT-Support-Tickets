<template>
      <Navbar />
  
      <div class="new-ticket">
        <h1>Create a New Ticket</h1>
      
      <form @submit.prevent="submitTicket">
        <!-- Ticket Name -->
        <div>
          <label for="name">Ticket Name:</label>
          <input v-model="ticket.name" id="name" type="text" required />
        </div>
  
        <!-- Ticket Priority (radio selector) -->
        <div class="radio">
          <label>Priority:</label>
          <label>
            <input type="radio" v-model="ticket.priority" value="Low" required />
            Low
          </label>
          <label>
            <input type="radio" v-model="ticket.priority" value="Normal" required />
            Normal
          </label>
          <label>
            <input type="radio" v-model="ticket.priority" value="High" required />
            High
          </label>
        </div>
  
        <!-- Ticket Category (dropdown select) -->
        <div>
          <label for="category">Category:</label>
          <select v-model="ticket.category" id="category" required>
            <option value="" disabled selected>Select category</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
            <option value="security">Security</option>
            <option value="other">Other</option>
          </select>
        </div>
  
        <!-- Ticket Description -->
        <div>
          <label for="description">Description:</label>
          <textarea v-model="ticket.description" id="description" required></textarea>
        </div>
  
        <button type="submit" class="btn-primary">Submit Ticket</button>
      </form>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTickets } from '../composables/useTickets';
  import { useRouter } from 'vue-router';
  import Navbar from '../components/Navbar.vue';
  
  const ticket = ref({
    name: '',
    priority: 'Normal', // Default to "normal"
    status: 'New', // Automatically set to "New"
    category: '',
    description: ''
  });
  
  const { createTicket, tickets } = useTickets();
  const errorMessage = ref('');
  const router = useRouter();
  
  // Function to handle ticket submission
  const submitTicket = async () => {
    try {
      const newTicket = await createTicket(ticket.value);
      router.push(`/ticket/${newTicket._id}`);
    } catch (error) {
      errorMessage.value = 'There was a problem creating the ticket. Please try again.';
    }
  };
  </script>
  
  <style scoped>

  .new-ticket {
    max-width: 600px;
    margin: 30px auto;
    padding: 30px;
    background: var(--bg2);
    border-radius: 20px;
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .error {
    background: var(--error);
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    margin: 25px 0 0;
  }

  form > div {
    margin-bottom: 30px;
  }

  label {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input[type="text"], textarea, select {
    width: 100%;
    border-radius: 15px;
    border: var(--stroke) solid 1px;
    background: var(--bg);
    color: var(--text);
    padding: 20px;
    font-size: 16px;
  }
  
  .radio > label:not(:first-child){
    font-weight: normal;
  }

  input[type="radio"] {
    margin-right: 8px;
  }

  textarea {
    height: 160px;
  }

@media (max-width: 630px) {
    .new-ticket {
        margin: 30px 15px;
    }
}
  </style>