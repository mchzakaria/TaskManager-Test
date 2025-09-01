<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { Button, Input } from '~/components/ui'
import { useToast } from 'vue-toastification'

const router = useRouter()
const store = useAuthStore()
const toast = useToast()
const form = ref({ email: '', password: '' })
const error = ref('')
const isLoading = ref(false)

const submit = async () => {
  error.value = ''
  if (!form.value.email || !form.value.password) {
    toast.error('Please fill in all fields')
    return
  }
  
  isLoading.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    console.log('API URL:', apiUrl)
    console.log('Attempting login with:', {
      email: form.value.email,
      password: '********'
    })
    
    await store.login(form.value)
    toast.success('Login successful')
    router.push('/')
  } catch (err: any) {
    console.error('Login error:', err)
    error.value = err?.message || 'Login failed'
    toast.error(error.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <form @submit.prevent="submit" class="p-8 bg-white border rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <div class="space-y-4">
        <div>
          <Input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
            class="w-full"
          />
        </div>
        <div>
          <Input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
            minlength="6"
            class="w-full"
          />
        </div>
        <Button type="submit" class="w-full" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </Button>
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </div>
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:text-blue-800 font-medium">
          Register
        </router-link>
      </p>
    </form>
  </div>
</template>
