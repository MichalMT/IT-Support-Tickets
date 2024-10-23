<template>
    <div class="user-card">
        <p v-if="isCurrentUser" class="current">Current user</p>
        <img src="../assets/user.svg" alt="">
      <p class="name">{{ user.name }}</p>
      <p class="email">{{ user.email }}</p>
      <p class="meta">Registered: {{ moment(user.createdAt).format("YYYY-MM-DD") }}</p><br/>
      <p class="meta role">Role: {{ user.isAdmin ? 'Admin' : 'User' }}</p>
      
        <br/>
      <button class="btn-warn" @click="handleDelete">Remove User</button>
    </div>
  </template>
  
  <script setup>
    import moment from "moment";

  const props = defineProps({
    user: Object,
    isCurrentUser: Boolean,
  });

  // Emit an event to the parent to delete the user
    const emit = defineEmits(['delete-user']);
    const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${props.user.name}?`)) {
        emit('delete-user', props.user._id); // Emit delete event with the user ID
    }
    };

  </script>
  
  <style scoped>
  .user-card {
  background: var(--bg2);
  padding: 30px;
  margin-bottom: 10px;
  border-radius: 20px;
  width: 32%;
  margin: 0 2% 30px 0;
  text-align: center;
  position: relative;
  display: inline-block;
}
.user-card:nth-child(3n){
    margin-right: 0;
}

.meta {
    display: inline-block;
    border: var(--text2) solid 1px;
    border-radius: 10px;
    padding: 8px 12px;
    margin: 12px auto 0px;
    font-size: 15px;
    line-height: 15px;
    color: var(--text2);
}

.role {
    margin-bottom: 25px;
}



img {
    width: 80px;
    height: 80px;
}

.name {
    font-size: 22px;
    font-weight: bold;
}

.current {
  color: white;
  background: var(--primary);
  padding: 8px 15px;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

@media (max-width: 1160px) {
    .user-card {
        width: 48%;
        margin: 0 0 30px 0;
    }
}
@media (max-width: 700px) {
    .user-card {
        width: 100%;
    }
}
</style>