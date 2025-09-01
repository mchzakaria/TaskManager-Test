<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { Button, Input } from '~/components/ui'
import { useToast } from 'vue-toastification'

const router = useRouter()
const store = useAuthStore()
const toast = useToast()
const form = ref({ name: '', email: '', password: '' })
const error = ref('')

const submit = async () => {
  error.value = ''
  if (!form.value.name || !form.value.email || !form.value.password) {
    toast.error('Please fill in all fields')
    return
  }
  try {
    await store.register(form.value)
    toast.success('Registration successful')
    router.push('/login')
  } catch (err) {
    error.value = typeof err === 'string' ? err : 'Registration failed'
    toast.error(error.value)
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <form @submit.prevent="submit" class="p-6 border rounded w-96">
      <h2 class="text-xl font-bold mb-4">Register</h2>
      <Input v-model="form.name" placeholder="Name" class="mb-2" />
      <Input v-model="form.email" type="email" placeholder="Email" class="mb-2" />
      <Input v-model="form.password" type="password" placeholder="Password" class="mb-4" />
      <Button type="submit">Register</Button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <p class="mt-2">
        Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
    </form>
  </div>
</template>