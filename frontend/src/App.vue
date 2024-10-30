<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme';
const { theme, toggleTheme } = useTheme();
import Footer from "./components/Footer.vue"
</script>

<template>

    <RouterView />
    <Footer />

</template>

<style scoped>

</style>
