<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()
const form = ref({ email: 'test@example.com', password: 'password' })
const isLoading = ref(false)
const result = ref('')

const testLogin = async () => {
  isLoading.value = true
  result.value = ''
  
  try {
    console.log('Testing login with:', form.value)
    await authStore.login(form.value)
    result.value = '✅ Login successful! Token received.'
    toast.success('Login test successful!')
  } catch (error: any) {
    console.error('Login test error:', error)
    result.value = `❌ Login failed: ${error}`
    toast.error('Login test failed!')
  } finally {
    isLoading.value = false
  }
}

const testLogout = async () => {
  try {
    await authStore.logout()
    result.value = '✅ Logout successful!'
    toast.success('Logout test successful!')
  } catch (error: any) {
    result.value = `❌ Logout failed: ${error}`
    toast.error('Logout test failed!')
  }
}
</script>

<template>
  <div class="p-4 border rounded-lg bg-white">
    <h3 class="text-lg font-bold mb-4">Authentication Test</h3>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          class="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          v-model="form.password" 
          type="password" 
          class="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      
      <div class="flex gap-2">
        <button 
          @click="testLogin" 
          :disabled="isLoading"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {{ isLoading ? 'Testing...' : 'Test Login' }}
        </button>
        
        <button 
          @click="testLogout" 
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Test Logout
        </button>
      </div>
      
      <div v-if="result" class="p-3 border rounded bg-gray-50">
        <pre class="text-sm whitespace-pre-wrap">{{ result }}</pre>
      </div>
      
      <div class="text-sm text-gray-600">
        <p>Token: {{ authStore.token ? '✅ Present' : '❌ Missing' }}</p>
        <p>User: {{ authStore.user ? '✅ Loaded' : '❌ Not loaded' }}</p>
      </div>
    </div>
  </div>
</template>
