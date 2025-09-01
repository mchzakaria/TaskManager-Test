<template>
  <router-view />
  
  <!-- Toast Notifications -->
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <Toast 
      v-for="toast in toastStore.toasts" 
      :key="toast.id"
      :title="toast.title"
      :message="toast.message"
      :duration="toast.duration"
      @close="toastStore.removeToast(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useNotificationStore } from './stores/notifications'
import { useToastStore } from './stores/toast'
import Toast from './components/Toast.vue'

const auth = useAuthStore()
const notifications = useNotificationStore()
const toastStore = useToastStore()

onMounted(() => {
  // Initialize real-time notifications if user is authenticated
  if (auth.isAuthenticated) {
    notifications.initializeRealTimeNotifications()
  }
})
</script>