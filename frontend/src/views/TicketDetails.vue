<template>
      <Navbar />

      <div class="container">

        <div class="ticket-details">
        
          <div v-if="ticket">
            <h2>{{ ticket.name }}</h2>

            <p class="meta">Created {{ moment(ticket.createdAt).format("YYYY-MM-DD hh:mm a") }}</p>
            <p class="meta" v-if="user && user.isAdmin">{{ ticket.user.name }}</p>
            <p class="meta">{{ ticket.priority }} Priority</p>
            <p class="meta">Category: {{ ticket.category }}</p>
            <p class="meta">Status: {{ ticket.status }}</p>

            <h3 class="desc-heading">Description</h3>
            <p class="desc">{{ ticket.description }}</p>

            <h3>Comments / Progress</h3>
            <p v-if="ticket.comments.length == 0" class="text-secondary">There are no comments yet.</p>
            <div class="comment" v-for="comment in ticket.comments">
              <p class="comment-text">{{ comment.text }}</p>
              <div class="comment-meta">
              <p class="text-secondary">{{ comment.user.name }}</p>
              <p class="text-secondary">{{ moment(comment.createdAt).format("YY-MM-DD hh:mm a") }}</p>
              </div>
            </div>

            <h3>Add new comment</h3>
            <textarea v-model="newComment" name="" id=""></textarea>
            <button @click="addComment(newComment)" class="btn-primary btn-comment">Add Comment</button>

            <div v-if="user && user.isAdmin" class="actions">
              <h3>Actions</h3>
              <button @click="updateStatus('In Progress')" v-if="ticket.status == 'New'" class="btn-secondary">Mark as In Progress</button>
              <button @click="updateStatus('Closed')" v-if="ticket.status === 'New' || ticket.status === 'In Progress'" class="btn-primary">Mark as Closed</button>
              <button @click="handleDeleteTicket(ticketId)" class="btn-warn">Delete Ticket</button>
            </div>

          </div>
      
          <p v-else-if="loading">Loading ticket details...</p>
          <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>

        </div>

      </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useTickets } from '../composables/useTickets';
  import Navbar from '../components/Navbar.vue';
  import moment from "moment";
  import axios from 'axios';

  import { useAuth } from '../composables/useAuth';
  const { user } = useAuth();
  
  const route = useRoute();
  const { tickets, fetchTickets, deleteTicket } = useTickets();
  
  const ticket = ref(null);
  const loading = ref(true);
  const errorMessage = ref('');
  
  // Function to find ticket by id
  const findTicketById = (ticketId) => {
    return tickets.value.find((t) => t._id === ticketId);
  };
  
  // onMounted lifecycle hook
  onMounted(async () => {
    try {
      const ticketId = route.params.id; // Get the ticket ID from the route
      let foundTicket = findTicketById(ticketId); // Try to find the ticket in the tickets array
  
      if (!foundTicket) {
        // If the ticket isn't found, fetch all tickets
        await fetchTickets();
        foundTicket = findTicketById(ticketId); // Try to find the ticket again after fetching
      }
  
      if (!foundTicket) {
        throw new Error('Ticket not found');
      }
  
      ticket.value = foundTicket;
      loading.value = false;
    } catch (error) {
      errorMessage.value = error.message || 'Failed to load ticket details';
      loading.value = false;
    }
  });


  // Add comment
  const newComment = ref("");

  const addComment = async () => {
    if (!newComment.value.trim()) return;  // Prevent empty comments

    try {
      const response = await axios.post(`/api/tickets/${ticket.value._id}/comments`, {
        text: newComment.value,
      });

      // Update the ticket comments in the local state (without re-fetching)
      ticket.value.comments.push(response.data);

      // Clear the textarea after successful submission
      newComment.value = "";
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Update status
  const updateStatus = async (newStatus) => {
  try {
    const response = await axios.put(`/api/tickets/${ticket.value._id}/status`, {
      status: newStatus,
    });

    // Update the local ticket's status on the frontend
    ticket.value.status = newStatus;

    // Add a comment that the status has been changed
    await addProgressComment(`Ticket was marked as ${newStatus}`);

  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const addProgressComment = async (commentText) => {
  try {
    const response = await axios.post(`/api/tickets/${ticket.value._id}/comments`, {
      text: commentText,
    });

    ticket.value.comments.push(response.data);

  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

// Delete ticket
const ticketId = ref(route.params.id);
const router = useRouter();

// Function to handle ticket deletion
const handleDeleteTicket = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this ticket?');
  if (confirmed) {
    await deleteTicket(id);
    router.push('/');
  }
};
  </script>
  
  <style scoped>
    .ticket-details {
      width: 100%;
      margin: 30px 0;
      padding: 30px;
      background: var(--bg2);
      border-radius: 20px;
    }

    h2 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .meta {
        display: inline-block;
        border: var(--text2) solid 1px;
        border-radius: 10px;
        padding: 8px 12px;
        margin: 0 10px 10px 0;
        font-size: 15px;
        line-height: 15px;
        color: var(--text2);
    }

    h3 {
      font-size: 20px;
      font-weight: bold;
      margin: 30px 0 15px;
    }

    .desc-heading {
      margin: 20px 0 15px;
    }

    textarea {
      width: 50%;
      max-width: 550px;
      border-radius: 15px;
      border: var(--stroke) solid 1px;
      background: var(--bg);
      height: 80px;
      color: var(--text);
      padding: 20px;
    }

    .btn-comment {
      display: block;
      margin: 10px 0 0;
    }

    .comment-text {
      background: var(--bg);
      padding: 8px 15px;
      border-radius: 10px;
      display: inline-block;
    }

    .comment-meta {
      margin: 5px 0 25px;
    }

    .comment-meta p {
      display: inline;
      margin-right: 15px;
    }

    .actions button {
      margin-right: 20px;
    }

    /* Media Queries */

    @media (max-width: 1160px) {
      textarea {
          width: 100%;
      }
    }

    @media (max-width: 600px) {
      button {
        display: block;
        margin-bottom: 20px;
      }
    }

  </style>