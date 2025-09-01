import { defineStore } from 'pinia'
import api from '../api/axios'


export interface Task {
id: number
title: string
description: string
priority?: string
due_date?: string
status: string
completed: boolean
}


export const useTaskStore = defineStore('tasks', {
state: () => ({
tasks: [] as Task[],
loading: false
}),
actions: {
async fetchTasks() {
this.loading = true
const { data } = await api.get('/tasks')
this.tasks = data
this.loading = false
},
async addTask(taskData: {
title: string
description: string
priority?: string
due_date?: string
status: string
}) {
const { data } = await api.post('/tasks', taskData)
this.tasks.push(data)
},
async updateTask(task: Task) {
await api.put(`/tasks/${task.id}`, task)
const idx = this.tasks.findIndex((t) => t.id === task.id)
if (idx !== -1) this.tasks[idx] = task
},
async deleteTask(id: number) {
await api.delete(`/tasks/${id}`)
this.tasks = this.tasks.filter((t) => t.id !== id)
}
}
})