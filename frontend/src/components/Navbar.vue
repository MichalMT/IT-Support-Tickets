<template>
    <nav class="navbar">
      <div class="container">
        <RouterLink to="/" class="logo">
          <h2>IT Support Tickets</h2>
        </RouterLink>
        <div class="navbar-links" v-if="!isMobileMenuOpen">
          <button @click="toggleTheme" class="btn-secondary">{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</button>
          <RouterLink to="/manage-users" class="btn-secondary" v-if="user && user.isAdmin">Manage Users</RouterLink>
          <RouterLink to="/tickets/new" class="btn-primary">Create Ticket</RouterLink>
          <button @click="logout" class="btn-warn">Logout</button>
        </div>

        <!-- Hamburger Menu (visible on smaller screens) -->
        <div class="hamburger-menu" @click="toggleMenu">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </div>

        <!-- Mobile Menu Modal -->
        <div v-if="isMobileMenuOpen" class="mobile-menu-modal">
          <button @click="toggleTheme" class="btn-secondary">{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</button>
          <RouterLink to="/manage-users" class="btn-secondary" v-if="user && user.isAdmin">Manage Users</RouterLink>
          <RouterLink to="/tickets/new" class="btn-primary">Create Ticket</RouterLink>
          <button @click="logout" class="btn-warn">Logout</button>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useAuth } from '../composables/useAuth';
  import { useTheme } from '../composables/useTheme';
  import { ref } from 'vue';
  
  const { logout, user } = useAuth();

  const { theme, toggleTheme } = useTheme();

  // Hamburger menu
  const isMobileMenuOpen = ref(false);

  const toggleMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };

  const closeMenu = () => {
    isMobileMenuOpen.value = false;
  };

  </script>
  
  <style scoped>
  .navbar {
    background-color: var(--bg2);
    padding: 1rem 0;
    color: var(--text);
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-primary, .btn-secondary, .btn-warn {
    margin-left: 15px;
  }

  .logo {
    text-decoration: none;
    color: var(--text);
  }

  .logo h2 {
    font-weight: bold;
    font-size: 24px;
  }

  /* hamburger menu */
  .hamburger-menu {
    display: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    height: 50px;
  }

  .hamburger-menu svg {
    fill: var(--text);
  }

  .mobile-menu-modal {
    position: absolute;
    top: 92px;
    right: 10px;
    background-color: var(--bg2);
    border-radius: 20px;
    padding: 3rem;
    display: flex;
    flex-direction: column;
  }

  .mobile-menu-modal > * {
    margin-left: 0;
    margin-bottom: 1.5rem;
  }

  .mobile-menu-modal > *:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 1100px) {
    .container {
      padding: 0 1rem;
    }
  }

  @media (max-width: 900px) {
  .navbar-links {
    display: none;
  }

  .hamburger-menu {
    display: block;
  }
}

@media (max-width: 550px) {
  .mobile-menu-modal{
    width: 100%;
    margin: 0;
    right: 0;
  }
  .mobile-menu-modal > * {
    text-align: center;
    /* width: 150px; */
  }
}
  </style>