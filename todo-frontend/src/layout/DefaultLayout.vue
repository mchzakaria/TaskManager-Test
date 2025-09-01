<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <header class="bg-background border-b p-4">
    <nav class="flex justify-between items-center max-w-7xl mx-auto">
      <h1 class="text-xl font-bold">Task Manager</h1>
      <div v-if="authStore.isAuthenticated">
        <router-link to="/" class="mx-2">Tasks</router-link>
        <router-link to="/profile" class="mx-2">Profile</router-link>
        <Button @click="logout">Logout</Button>
      </div>
      <div v-else>
        <router-link to="/login" class="mx-2">Login</router-link>
        <router-link to="/register" class="mx-2">Register</router-link>
      </div>
    </nav>
  </header>
  <main class="p-4 max-w-7xl mx-auto">
    <slot />
  </main>
</template>