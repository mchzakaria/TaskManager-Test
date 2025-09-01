<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-semibold text-gray-900">Task Manager</h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <router-link 
            to="/" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            Tasks
          </router-link>
          
          <router-link 
            to="/notifications" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors relative"
            :class="isActive('/notifications') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            Notifications
            <span 
              v-if="notifications.unreadCount > 0" 
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ notifications.unreadCount }}
            </span>
          </router-link>
          
          <router-link 
            to="/profile" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="isActive('/profile') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            Profile
          </router-link>
          
          <button 
            @click="logout" 
            class="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const notifications = useNotificationStore()

const isActive = (path: string) => {
  return route.path === path
}

const logout = () => {
  auth.logout()
}
</script>
