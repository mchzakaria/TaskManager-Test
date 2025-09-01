<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Form } from '@/components/ui/form' // Assuming shadcn form component

const authStore = useAuthStore()
const credentials = ref({ email: '', password: '' })
const error = ref(null)

const login = async () => {
  try {
    await authStore.login(credentials.value)
  } catch (err) {
    error.value = err.message || 'Login failed'
  }
}
</script>

<template>
  <Card class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <Form @submit.prevent="login">
      <div class="mb-4">
        <Label for="email">Email</Label>
        <Input v-model="credentials.email" id="email" type="email" required />
      </div>
      <div class="mb-4">
        <Label for="password">Password</Label>
        <Input v-model="credentials.password" id="password" type="password" required />
      </div>
      <Button type="submit">Login</Button>
      <p v-if="error" class="text-destructive mt-2">{{ error }}</p>
    </Form>
  </Card>
</template>