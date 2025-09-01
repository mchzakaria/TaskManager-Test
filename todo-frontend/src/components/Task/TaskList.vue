<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import TaskItem from './TaskItem.vue'
import { Button } from '~/components/ui'
import { useToast } from 'vue-toastification'

const tasksStore = useTasksStore()
const toast = useToast()

onMounted(async () => {
  try {
    await tasksStore.fetchTasks()
  } catch (err) {
    toast.error('Failed to load tasks')
  }
})

const refreshTasks = async () => {
  try {
    await tasksStore.fetchTasks()
    toast.success('Tasks refreshed')
  } catch (err) {
    toast.error('Failed to refresh tasks')
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold text-gray-900">Your Tasks</h3>
      <Button @click="refreshTasks" variant="outline" size="sm" :disabled="tasksStore.loading">
        {{ tasksStore.loading ? 'Loading...' : 'Refresh' }}
      </Button>
    </div>
    
    <div v-if="tasksStore.loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p class="text-gray-500 mt-2">Loading tasks...</p>
    </div>
    
    <div v-else-if="tasksStore.error" class="text-center py-8">
      <p class="text-red-500 mb-4">{{ tasksStore.error }}</p>
      <Button @click="refreshTasks" variant="outline">Try Again</Button>
    </div>
    
    <div v-else-if="tasksStore.tasks.length" class="space-y-4">
      <TaskItem v-for="task in tasksStore.tasks" :key="task.id" :task="task" />
    </div>
    
    <div v-else class="text-center py-8">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p class="text-gray-500 text-lg">No tasks available.</p>
      <p class="text-gray-400 text-sm">Create your first task to get started!</p>
    </div>
  </div>
</template>