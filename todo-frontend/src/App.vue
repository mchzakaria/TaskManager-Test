<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
</script>

<template>
  <header class="bg-blue-500 text-white p-4">
    <nav class="container mx-auto flex justify-between">
      <router-link to="/">Home</router-link>
      <div v-if="useAuthStore().user">
        <router-link to="/profile" class="mr-4">Profile</router-link>
        <button @click="useAuthStore().logout">Logout</button>
      </div>
      <div v-else>
        <router-link to="/login" class="mr-4">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </nav>
  </header>
  <main class="container mx-auto p-4">
    <RouterView />
  </main>
</template>