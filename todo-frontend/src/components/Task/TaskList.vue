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
</script>

<template>
  <div>
    <h3 class="text-lg font-bold mb-2">Tasks</h3>
    <div v-if="tasksStore.tasks.length" class="space-y-2">
      <TaskItem v-for="task in tasksStore.tasks" :key="task.id" :task="task" />
    </div>
    <p v-else class="text-gray-500">No tasks available.</p>
  </div>
</template>