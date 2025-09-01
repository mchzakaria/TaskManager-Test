import { defineStore } from 'pinia'
import axios from 'axios'
import type { Task } from '~/types'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await axios.get('/tasks')
        this.tasks = response.data.data
      } catch (error: any) {
        console.error('Fetch tasks failed', error)
        throw error.response?.data?.message || 'Fetch tasks failed'
      }
    },
    async addTask(task: Partial<Task>) {
      try {
        const response = await axios.post('/tasks', task)
        this.tasks.push(response.data.data)
        return response.data.data
      } catch (error: any) {
        console.error('Add task failed', error)
        throw error.response?.data?.message || 'Add task failed'
      }
    },
    async updateTask(id: number, task: Partial<Task>) {
      try {
        const response = await axios.put(`/tasks/${id}`, task)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...response.data.data }
        }
        return response.data.data
      } catch (error: any) {
        console.error('Update task failed', error)
        throw error.response?.data?.message || 'Update task failed'
      }
    },
    async deleteTask(id: number) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (error) {
        console.error('Delete task failed', error)
        throw error || 'Delete task failed'
      }
    }
  }
})