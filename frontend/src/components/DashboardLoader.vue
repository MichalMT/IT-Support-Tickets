<template>
    <component :is="dashboardComponent" />
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useAuth } from '../composables/useAuth';
  import UserDashboard from '../views/UserDashboard.vue';
  import AdminDashboard from '../views/AdminDashboard.vue';
  
  const { user, isAuthenticated, logout } = useAuth();
  
  // Compute which component to load based on the user's role
  const dashboardComponent = computed(() => {
    if (!isAuthenticated.value) {
      return null;
    }
    return user.value.isAdmin ? AdminDashboard : UserDashboard;
  });
  </script>