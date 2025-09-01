<script setup>
import { useAuthStore } from '@/stores/auth'
import { Card } from '@/components/ui/card'

const authStore = useAuthStore()
</script>

<template>
  <Card class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Profile</h2>
    <p v-if="authStore.user"><strong>Name:</strong> {{ authStore.user.name }}</p>
    <p v-if="authStore.user"><strong>Email:</strong> {{ authStore.user.email }}</p>
  </Card>
</template>