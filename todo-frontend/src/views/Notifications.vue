<template>
  <div>
    <Navigation />
    <div class="p-6 max-w-4xl mx-auto">
      <div class="flex justify-between mb-6 items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
          <p class="text-gray-600 mt-1">Stay updated with your task activities</p>
        </div>
        <div class="flex gap-2">
          <button 
            @click="markAllAsRead" 
            class="btn bg-blue-500 hover:bg-blue-600"
            :disabled="notifications.loading"
          >
            Mark All as Read
          </button>
        </div>
      </div>

    <!-- Loading State -->
    <div v-if="notifications.loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading notifications...</p>
    </div>

    <!-- Notifications List -->
    <div v-else-if="notifications.notifications.length > 0" class="space-y-4">
      <div 
        v-for="notification in notifications.notifications" 
        :key="notification.id"
        :class="[
          'p-4 rounded-lg border transition-all duration-200',
          notification.read 
            ? 'bg-gray-50 border-gray-200' 
            : 'bg-blue-50 border-blue-200 shadow-sm'
        ]"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span 
                :class="[
                  'px-2 py-1 text-xs rounded-full font-medium',
                  getTypeColor(notification.type)
                ]"
              >
                {{ formatType(notification.type) }}
              </span>
              <span v-if="!notification.read" class="w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
            
            <p class="text-gray-800 mb-2">{{ notification.message }}</p>
            
            <div v-if="notification.data" class="text-sm text-gray-600 space-y-1">
              <div v-if="notification.data.task_title">
                <strong>Task:</strong> {{ notification.data.task_title }}
              </div>
              <div v-if="notification.data.task_priority">
                <strong>Priority:</strong> 
                <span :class="getPriorityColor(notification.data.task_priority)">
                  {{ notification.data.task_priority }}
                </span>
              </div>
            </div>
            
            <p class="text-xs text-gray-500 mt-2">
              {{ formatDate(notification.created_at) }}
            </p>
          </div>
          
          <div class="flex gap-2 ml-4">
            <button 
              v-if="!notification.read"
              @click="markAsRead(notification.id)"
              class="text-sm text-blue-600 hover:text-blue-800"
            >
              Mark as Read
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
      <p class="text-gray-600">You'll see notifications here when tasks are created or updated.</p>
          </div>
    </div>
  </div>
  </template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'
import Navigation from '../components/Navigation.vue'

const auth = useAuthStore()
const notifications = useNotificationStore()

onMounted(() => {
  notifications.fetchNotifications()
})

const markAsRead = async (id: number) => {
  await notifications.markAsRead(id)
}

const markAllAsRead = async () => {
  await notifications.markAllAsRead()
}

// Remove logout function since it's now in Navigation component

const formatType = (type: string) => {
  return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const getTypeColor = (type: string) => {
  const colors = {
    task_created: 'bg-green-100 text-green-800',
    task_updated: 'bg-blue-100 text-blue-800',
    task_deleted: 'bg-red-100 text-red-800',
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getPriorityColor = (priority: string) => {
  const colors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600',
  }
  return colors[priority as keyof typeof colors] || 'text-gray-600'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>
