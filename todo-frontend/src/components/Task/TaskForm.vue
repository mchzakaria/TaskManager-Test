<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import { Button, Input } from '~/components/ui'
import { useToast } from 'vue-toastification'

const tasksStore = useTasksStore()
const toast = useToast()
const form = ref({ 
  title: '', 
  description: '', 
  priority: 'medium' as 'low' | 'medium' | 'high',
  due_date: ''
})
const error = ref('')

const submit = async () => {
  error.value = ''
  if (!form.value.title) {
    toast.error('Title is required')
    return
  }
  try {
    await tasksStore.addTask(form.value)
    toast.success('Task created')
    form.value = { title: '', description: '', priority: 'medium', due_date: '' }
  } catch (err) {
    error.value = typeof err === 'string' ? err : 'Failed to create task'
    toast.error(error.value)
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="mb-6 p-6 border rounded-lg shadow-sm bg-white">
    <h3 class="text-lg font-bold mb-4">Add New Task</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <Input 
          v-model="form.title" 
          placeholder="Enter task title" 
          class="w-full"
          required
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          v-model="form.description" 
          placeholder="Enter task description"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select 
            v-model="form.priority"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input 
            v-model="form.due_date" 
            type="date"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <Button type="submit" class="w-full">Create Task</Button>
      
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
    </div>
  </form>
</template>