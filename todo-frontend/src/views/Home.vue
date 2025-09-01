<script setup lang="ts">
import { onMounted } from 'vue'
import TaskList from '~/components/Task/TaskList.vue'
import TaskForm from '~/components/Task/TaskForm.vue'
import ApiTest from '~/components/ApiTest.vue'
import AuthTest from '~/components/AuthTest.vue'
import { useAuthStore } from '~/stores/auth'
import { useTasksStore } from '~/stores/tasks'

const authStore = useAuthStore()
const tasksStore = useTasksStore()

onMounted(async () => {
  if (authStore.token) {
    try {
      await tasksStore.fetchTasks()
    } catch (error) {
      console.error('Failed to fetch tasks on mount:', error)
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
        <p class="text-gray-600">Welcome back! Manage your tasks efficiently.</p>
      </div>
      
      <!-- Debug Components -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ApiTest />
        <AuthTest />
      </div>
      
      <div v-if="authStore.token" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Task Form Sidebar -->
        <div class="lg:col-span-1">
          <TaskForm />
        </div>
        
        <!-- Task List Main Content -->
        <div class="lg:col-span-2">
          <TaskList />
        </div>
      </div>
      
      <div v-else class="text-center py-8">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
        <p class="text-gray-600 mb-6">Please log in to access your tasks.</p>
        <router-link 
          to="/login" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>