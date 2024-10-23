<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme';
const { theme, toggleTheme } = useTheme();
</script>

<template>

    <RouterView />

</template>

<style scoped>

</style>
