<template>
    <footer :class="{ fixedFooter: isLoginView }">
      <!-- Footer content goes here -->
      <p>Copyright © 2024 IT Support Tickets</p>
    </footer>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
  
      // Check if the current view is the login view
      const isLoginView = computed(() => route.name === 'Login');
  
      return { isLoginView };
    },
  };
  </script>
  
  <style scoped>
    /* Default footer styling */
    p {
        text-align: center;
        padding: 20px;
        color: var(--text2);
    }
  
    /* Fixed footer styling for login view */
    .fixedFooter {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
  </style>