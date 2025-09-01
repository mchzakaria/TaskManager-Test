<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import { Button } from '~/components/ui'
import { useToast } from 'vue-toastification'
import type { Task } from '~/types'

const props = defineProps<{ task: Task }>()
const tasksStore = useTasksStore()
const toast = useToast()
const editing = ref(false)
const editedTask = ref({ ...props.task })

const save = async () => {
  try {
    await tasksStore.updateTask(props.task.id, editedTask.value)
    editing.value = false
    toast.success('Task updated')
  } catch (err) {
    toast.error('Failed to update task')
  }
}

const toggleStatus = async () => {
  try {
    const newStatus = props.task.status === 'completed' ? 'pending' : 'completed'
    await tasksStore.updateTask(props.task.id, { status: newStatus })
    toast.success('Task status updated')
  } catch (err) {
    toast.error('Failed to update task status')
  }
}

const remove = async () => {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await tasksStore.deleteTask(props.task.id)
      toast.success('Task deleted')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }
}
</script>

<template>
  <div class="p-4 border rounded-lg shadow-sm bg-white">
    <div v-if="!editing" class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <input 
            type="checkbox" 
            :checked="task.status === 'completed'"
            @change="toggleStatus"
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <h4 class="font-medium text-gray-900" :class="{ 'line-through text-gray-500': task.status === 'completed' }">
            {{ task.title }}
          </h4>
        </div>
        <p class="text-sm text-gray-600 mb-2">{{ task.description || 'No description' }}</p>
        <div class="flex items-center gap-4 text-xs text-gray-500">
          <span class="px-2 py-1 rounded-full" :class="{
            'bg-red-100 text-red-800': task.priority === 'high',
            'bg-yellow-100 text-yellow-800': task.priority === 'medium',
            'bg-green-100 text-green-800': task.priority === 'low'
          }">
            {{ task.priority }}
          </span>
          <span v-if="task.due_date" class="text-gray-500">
            Due: {{ new Date(task.due_date).toLocaleDateString() }}
          </span>
        </div>
      </div>
      <div class="flex gap-2 ml-4">
        <Button @click="editing = true" size="sm" variant="outline">Edit</Button>
        <Button @click="remove" variant="destructive" size="sm">Delete</Button>
      </div>
    </div>
    
    <div v-else class="space-y-3">
      <input 
        v-model="editedTask.title" 
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Task title"
      />
      <textarea 
        v-model="editedTask.description" 
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Task description"
        rows="3"
      />
      <div class="flex gap-2">
        <select 
          v-model="editedTask.priority"
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input 
          v-model="editedTask.due_date" 
          type="date"
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="flex gap-2">
        <Button @click="save" size="sm">Save</Button>
        <Button @click="editing = false" size="sm" variant="outline">Cancel</Button>
      </div>
    </div>
  </div>
</template>