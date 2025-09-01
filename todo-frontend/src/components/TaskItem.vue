<template>
    <li class="flex justify-between bg-gray-100 p-4 mb-2 rounded shadow-sm items-center">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <p :class="task.completed ? 'line-through text-gray-400' : 'font-semibold text-gray-800'">
            {{ task.title }}
          </p>
          <span v-if="task.priority" 
                :class="{
                  'px-2 py-1 text-xs rounded': true,
                  'bg-red-100 text-red-800': task.priority === 'high',
                  'bg-yellow-100 text-yellow-800': task.priority === 'medium',
                  'bg-green-100 text-green-800': task.priority === 'low'
                }">
            {{ task.priority }}
          </span>
          <span v-if="task.status" 
                :class="{
                  'px-2 py-1 text-xs rounded': true,
                  'bg-blue-100 text-blue-800': task.status === 'pending',
                  'bg-green-100 text-green-800': task.status === 'completed'
                }">
            {{ task.status }}
          </span>
        </div>
        <p class="text-sm text-gray-600 mb-1">{{ task.description }}</p>
        <p v-if="task.due_date" class="text-xs text-gray-500">
          Due: {{ new Date(task.due_date).toLocaleDateString() }}
        </p>
      </div>
      <div class="flex gap-2">
        <button @click="$emit('edit', task)" class="btn text-sm bg-blue-500 hover:bg-blue-600">
          Edit
        </button>
        <button @click="$emit('toggle', task)" class="btn text-sm">
          {{ task.completed ? 'Undo' : 'Complete' }}
        </button>
        <button @click="$emit('delete', task.id)" class="btn text-sm bg-red-500 hover:bg-red-600">
          Delete
        </button>
      </div>
    </li>
  </template>
  
  <script setup lang="ts">
  interface Task {
    id: number
    title: string
    description: string
    priority?: string
    due_date?: string
    status: string
    completed: boolean
  }
  
  defineProps<{ task: Task }>()
  defineEmits<{
    (e: 'edit', task: Task): void
    (e: 'toggle', task: Task): void
    (e: 'delete', id: number): void
  }>()
  </script>