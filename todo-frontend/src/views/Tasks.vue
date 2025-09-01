<template>


    <form @submit.prevent="add" class="mb-4">
    <input v-model="title" placeholder="Title" class="input mr-2" />
    <input v-model="description" placeholder="Description" class="input mr-2" />
    <button class="btn">Add</button>
    </form>
    
    
    <ul>
    <li v-for="task in tasks.tasks" :key="task.id" class="flex justify-between bg-gray-100 p-2 mb-2 rounded">
    <div>
    <p class="font-semibold">{{ task.title }}</p>
    <p class="text-sm text-gray-600">{{ task.description }}</p>
    </div>
    <div class="space-x-2">
    <button @click="toggle(task)" class="btn text-sm">
    {{ task.completed ? 'Undo' : 'Complete' }}
    </button>
    <button @click="remove(task.id)" class="btn text-sm bg-red-500">Delete</button>
    </div>
    </li>
    </ul>
    </div>
    </template>
    
    
    <script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useAuthStore } from '../store/auth'
    import { useTaskStore } from '../store/tasks'
    
    
    const auth = useAuthStore()
    const tasks = useTaskStore()
    
    
    const title = ref('')
    const description = ref('')
    
    
    onMounted(() => {
    tasks.fetchTasks()
    })
    
    
    const add = async () => {
    if (!title.value) return
    await tasks.addTask(title.value, description.value)
    title.value = ''
    description.value = ''
    }
    
    
    const toggle = async (task: any) => {
    task.completed = !task.completed
    await tasks.updateTask(task)
    }
    
    
    const remove = async (id: number) => {
    await tasks.deleteTask(id)
    }
    
    
    const logout = () => {
    auth.logout()
    }
    </script>