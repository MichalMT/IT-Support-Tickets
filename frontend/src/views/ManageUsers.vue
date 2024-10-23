<template>
    <Navbar />
    <div class="container" v-if="currentUser && currentUser.isAdmin">
        <h2>Users</h2>

        <p v-if="loading">Loading users...</p>
        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="users.length" class="cards-container">
            <UserCard
                v-for="user in users"
                :key="user._id"
                :user="user"
                :isCurrentUser="user._id === currentUser._id"
                @delete-user="deleteUser"
            />
        </div>

        <h2>Add New User</h2>
        <div class="new-user-form">
            <form @submit.prevent="handleAddUser">
            <!-- Name Field -->
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="newUser.name" id="name" placeholder="Enter name" required />
            </div>

            <!-- Email Field -->
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="newUser.email" id="email" placeholder="Enter email" required />
            </div>

            <!-- Password Field -->
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="newUser.password" id="password" placeholder="Enter password" required />
            </div>

            <!-- Role Field -->
            <div class="form-group">
                <label>Role</label>
                <div class="radio">
                <label>
                    <input type="radio" v-model="newUser.isAdmin" :value="false" /> User
                </label>
                <label>
                    <input type="radio" v-model="newUser.isAdmin" :value="true" /> Admin
                </label>
                </div>
            </div>

            <button class="btn-primary" type="submit">Create User</button>
            </form>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUsers } from '../composables/useUsers';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import UserCard from '../components/UserCard.vue';

const { users, loading, error, getUsers, deleteUser, addUser } = useUsers();
const { user: currentUser } = useAuth();

const newUser = ref({
  name: '',
  email: '',
  isAdmin: false,
  password: ''
});

onMounted(() => {
    getUsers();
});

const handleAddUser = async () => {
  // Add the new user using the useUsers composable
  await addUser(newUser.value);

  // Clear the form after submission
  newUser.value.name = '';
  newUser.value.email = '';
  newUser.value.isAdmin = false;
  newUser.value.password = '';
};

</script>

<style scoped>

.container {
    margin-top: 30px;
}

h2 { 
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
    margin-bottom: 30px;
}

.new-user-form {
    width: 50%;
    /* max-width: 550px; */
    margin: 30px 0;
    padding: 30px;
    background: var(--bg2);
    border-radius: 20px;
  }

  label {
    display: block;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }

  form > div {
    margin-bottom: 30px;
  }

  input[type="text"], input[type="email"], input[type="password"]{
    width: 100%;
    border-radius: 15px;
    border: var(--stroke) solid 1px;
    background: var(--bg);
    color: var(--text);
    padding: 20px;
    font-size: 16px;
  }

  .radio > label {
    font-weight: normal;
  }

  input[type="radio"] {
    margin-right: 8px;
  }

  @media (max-width: 1160px) {
    .cards-container {
        display: flex;
        justify-content: space-between;  /* Adjust space between the cards */
        align-items: flex-start;         /* Align items at the top */
        flex-wrap: wrap;  
    }
    .new-user-form {
        width: 550px;
    }
}
@media (max-width: 700px) {
    .new-user-form {
        width: 100%;
    }
}

</style>