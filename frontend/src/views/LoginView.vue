<template>
  <div class="viewContainer">
  <div class="loginContainer">
    <h1>IT Support Tickets</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <div class="err" v-if="errorMessage"><p>{{ errorMessage }}</p></div>
      <button type="submit">Log In</button>
    </form>
  </div>
</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuth } from '../composables/useAuth';
  
  const email = ref('');
  const password = ref('');
  const { login } = useAuth();
  const errorMessage = ref('');
  const route = useRoute();

  // On component mount, set email and password from query params if available
  onMounted(() => {
    if (route.query.email) {
      email.value = route.query.email;
    }
    if (route.query.password) {
      password.value = route.query.password;
    }

    if (route.query.sessionExpired) {
        errorMessage.value = 'Invalid token. Please log in again.';
      }
  });

  const handleLogin = async () => {
    errorMessage.value = '';
    try {
      await login({ email: email.value, password: password.value });
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = "Error. Invalid credentials. Please try again.";
    }
  };

  </script>

<style scoped>

   .viewContainer {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
   }
  .loginContainer {
    background: var(--bg2);
    max-width: 600px;
    padding: 35px 30px 30px;
    border-radius: 30px;
  }
  h1 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 35px;
    font-weight: bold;
  }
  input {
    background: var(--bg);
    border: var(--stroke) solid 1px;
    border-radius: 15px;
    display: flex;
    padding: 20px 30px;
    width: 100%;
    min-width: 540px;
    height: 60px;
    font-size: 16px;
    margin-bottom: 15px;
    color: var(--text);
  }
  button {
    background: var(--primary);
    color: white;
    border: none;
    font-weight: bold;
    font-size: 18px;
    width: 100%;
    margin: 5px 0 0 0;
    padding: 19px;
    border-radius: 15px;
    cursor: pointer;
  }
  .err {
    background: var(--error);
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    margin-bottom: 15px;
  }

  @media (max-width: 660px) {
    .loginContainer {
        width: 100%;
        margin: 0 30px;
    }
    input {
      width: 100%;
      min-width: 100%;
    }
}

</style>