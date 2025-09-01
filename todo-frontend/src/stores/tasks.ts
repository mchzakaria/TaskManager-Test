import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

const apiUrl = import.meta.env.VITE_API_URL

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await axios.get(`${apiUrl}/tasks`)
        this.tasks = response.data.data // Assuming API resource wraps in 'data'
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch tasks'
      } finally {
        this.loading = false
      }
    },
    async addTask(taskData) {
      try {
        const response = await axios.post(`${apiUrl}/tasks`, taskData)
        this.tasks.push(response.data.data)
      } catch (err) {
        throw err.response?.data || 'Failed to add task'
      }
    },
    async updateTask(id, taskData) {
      try {
        const response = await axios.put(`${apiUrl}/tasks/${id}`, taskData)
        const index = this.tasks.findIndex((t) => t.id === id)
        if (index !== -1) this.tasks[index] = response.data.data
      } catch (err) {
        throw err.response?.data || 'Failed to update task'
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`${apiUrl}/tasks/${id}`)
        this.tasks = this.tasks.filter((t) => t.id !== id)
      } catch (err) {
        throw err.response?.data || 'Failed to delete task'
      }
    },
    subscribeToRealTimeUpdates() {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) return

      // Assume public channel 'tasks'; adjust if private (e.g., `private-tasks.${authStore.user.id}`)
      window.Echo.channel('tasks')
        .listen('TaskCreated', (e) => {
          this.tasks.push(e.task)
        })
        .listen('TaskUpdated', (e) => {
          const index = this.tasks.findIndex((t) => t.id === e.task.id)
          if (index !== -1) this.tasks[index] = e.task
        })
        .listen('TaskDeleted', (e) => {
          this.tasks = this.tasks.filter((t) => t.id !== e.task.id)
        })
    },
    unsubscribeFromRealTimeUpdates() {
      window.Echo.leave('tasks')
    },
  },
})