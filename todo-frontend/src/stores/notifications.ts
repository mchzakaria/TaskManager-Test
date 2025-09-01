import { defineStore } from 'pinia'
import api from '../api/axios'
import echo from '../lib/echo'
import { useToastStore } from './toast'

export interface Notification {
  id: number
  user_id: number
  type: string
  message: string
  data?: any
  read: boolean
  created_at: string
  updated_at: string
}

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
    loading: false,
    unreadCount: 0
  }),

  getters: {
    unreadNotifications: (state) => {
      return state.notifications.filter(n => !n.read)
    }
  },

  actions: {
    async fetchNotifications() {
      this.loading = true
      try {
        const { data } = await api.get('/notifications')
        this.notifications = data
        this.unreadCount = this.unreadNotifications.length
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      } finally {
        this.loading = false
      }
    },

    initializeRealTimeNotifications() {
      const toastStore = useToastStore()
      
      // Listen for real-time notifications
      echo.private(`notifications.${this.getUserId()}`)
        .listen('NotificationCreated', (e: any) => {
          this.addNotification(e.notification)
          
          // Show toast notification
          toastStore.success(
            'New Notification',
            e.notification.message
          )
        })
    },

    getUserId() {
      // Get user ID from token or store
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          return payload.sub || payload.user_id
        } catch (error) {
          console.error('Failed to decode token:', error)
          return null
        }
      }
      return null
    },

    async fetchUnreadNotifications() {
      try {
        const { data } = await api.get('/notifications/unread')
        this.unreadCount = data.length
      } catch (error) {
        console.error('Failed to fetch unread notifications:', error)
      }
    },

    async markAsRead(id: number) {
      try {
        await api.put(`/notifications/${id}/read`)
        const notification = this.notifications.find(n => n.id === id)
        if (notification) {
          notification.read = true
          this.unreadCount = this.unreadNotifications.length
        }
      } catch (error) {
        console.error('Failed to mark notification as read:', error)
      }
    },

    async markAllAsRead() {
      try {
        await api.put('/notifications/read-all')
        this.notifications.forEach(n => n.read = true)
        this.unreadCount = 0
      } catch (error) {
        console.error('Failed to mark all notifications as read:', error)
      }
    },

    addNotification(notification: Notification) {
      this.notifications.unshift(notification)
      if (!notification.read) {
        this.unreadCount++
      }
    }
  }
})
