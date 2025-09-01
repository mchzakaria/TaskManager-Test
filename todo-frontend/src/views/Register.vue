<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Form } from '@/components/ui/form'

const authStore = useAuthStore()
const userData = ref({ name: '', email: '', password: '', password_confirmation: '' })
const error = ref(null)

const register = async () => {
  try {
    await authStore.register(userData.value)
  } catch (err) {
    error.value = err.message || 'Registration failed'
  }
}
</script>

<template>
  <Card class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <Form @submit.prevent="register">
      <div class="mb-4">
        <Label for="name">Name</Label>
        <Input v-model="userData.name" id="name" required />
      </div>
      <div class="mb-4">
        <Label for="email">Email</Label>
        <Input v-model="userData.email" id="email" type="email" required />
      </div>
      <div class="mb-4">
        <Label for="password">Password</Label>
        <Input v-model="userData.password" id="password" type="password" required />
      </div>
      <div class="mb-4">
        <Label for="password_confirmation">Confirm Password</Label>
        <Input v-model="userData.password_confirmation" id="password_confirmation" type="password" required />
      </div>
      <Button type="submit">Register</Button>
      <p v-if="error" class="text-destructive mt-2">{{ error }}</p>
    </Form>
  </Card>
</template>