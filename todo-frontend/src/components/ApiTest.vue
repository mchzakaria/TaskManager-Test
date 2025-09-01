<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const testResult = ref('')
const isLoading = ref(false)

const testApiConnection = async () => {
  isLoading.value = true
  testResult.value = ''
  
  try {
    console.log('Testing API connection...')
    console.log('Base URL:', axios.defaults.baseURL)
    console.log('Environment VITE_API_URL:', import.meta.env.VITE_API_URL)
    
    // Test 1: Check if server is reachable
    testResult.value = '🔍 Testing server connectivity...\n'
    
    try {
      const response = await axios.get('/auth/login', { timeout: 5000 })
      testResult.value += `✅ Server is reachable (Status: ${response.status})\n`
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        testResult.value += `❌ Server connection refused. Is the backend running on ${axios.defaults.baseURL}?\n`
        throw error
      } else if (error.response?.status === 405) {
        testResult.value += `✅ Server is reachable (Method not allowed is expected for GET /auth/login)\n`
      } else {
        testResult.value += `⚠️ Server response: ${error.response?.status} - ${error.response?.statusText}\n`
      }
    }
    
    // Test 2: Try to get tasks (will fail without auth, but should show proper error)
    testResult.value += '\n🔍 Testing tasks endpoint...\n'
    try {
      const response = await axios.get('/tasks')
      testResult.value += `✅ Tasks endpoint working! Found ${response.data.data?.length || 0} tasks.\n`
    } catch (error: any) {
      if (error.response?.status === 401) {
        testResult.value += `✅ Tasks endpoint working (401 Unauthorized - authentication required)\n`
      } else if (error.response?.status === 404) {
        testResult.value += `❌ Tasks endpoint not found (404)\n`
      } else {
        testResult.value += `⚠️ Tasks endpoint error: ${error.response?.status} - ${error.response?.data?.message || error.message}\n`
      }
    }
    
    // Test 3: Check environment variables
    testResult.value += '\n🔍 Environment variables:\n'
    testResult.value += `VITE_API_URL: ${import.meta.env.VITE_API_URL}\n`
    testResult.value += `Axios Base URL: ${axios.defaults.baseURL}\n`
    testResult.value += `Token exists: ${!!localStorage.getItem('token')}\n`
    
    toast.success('API test completed!')
  } catch (error: any) {
    console.error('API Test Error:', error)
    testResult.value += `\n❌ Critical Error: ${error.message}\n`
    if (error.code) {
      testResult.value += `Error Code: ${error.code}\n`
    }
    toast.error('API test failed!')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  testApiConnection()
})
</script>

<template>
  <div class="p-4 border rounded-lg bg-white">
    <h3 class="text-lg font-bold mb-4">API Connection Test</h3>
    
    <div class="mb-4">
      <p class="text-sm text-gray-600 mb-2">Base URL: {{ axios.defaults.baseURL }}</p>
      <button 
        @click="testApiConnection" 
        :disabled="isLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {{ isLoading ? 'Testing...' : 'Test Connection' }}
      </button>
    </div>
    
    <div v-if="testResult" class="p-3 border rounded bg-gray-50">
      <pre class="text-sm whitespace-pre-wrap">{{ testResult }}</pre>
    </div>
  </div>
</template>
