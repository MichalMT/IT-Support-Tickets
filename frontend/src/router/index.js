import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import DashboardLoader from '../components/DashboardLoader.vue';
import Login from '../views/LoginView.vue';
import NewTicket from '../views/NewTicket.vue';
import TicketDetails from '../views/TicketDetails.vue';
import ManageUsers from '../views/ManageUsers.vue';

const routes = [
  {
    path: '/',
    component: DashboardLoader, // The DashboardLoader component will dynamically load the correct dashboard
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/tickets/new',
    name: 'NewTicket',
    component: NewTicket,
    meta: { requiresAuth: true },
  },
  {
    path: '/ticket/:id',
    name: 'TicketDetails',
    component: TicketDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/manage-users',
    name: 'ManageUsers',
    component: ManageUsers,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all for undefined routes
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top
    return { top: 0 };
  },
});

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, user, initAuth } = useAuth();

  if (!isAuthenticated.value) {
    await initAuth(); // Initialize auth state if not already initialized
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      // If not authenticated, redirect to login
      return next('/login');
    }
  }

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAuthenticated.value || !user.value.isAdmin) {
      return next('/login');
    }
  }

  // Allow the navigation to proceed
  next();
});

export default router;