<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'

const tasksStore = useTasksStore()
const showAddDialog = ref(false)

onMounted(() => {
  tasksStore.fetchTasks()
  tasksStore.subscribeToRealTimeUpdates()
})

onUnmounted(() => {
  tasksStore.unsubscribeFromRealTimeUpdates()
})
</script>

<template>
  <div>
    <div class="flex justify-between mb-4">
      <h2 class="text-2xl font-bold">Tasks</h2>
      <Button @click="showAddDialog = true">Add Task</Button>
    </div>
    <div v-if="tasksStore.loading">Loading...</div>
    <div v-if="tasksStore.error">{{ tasksStore.error }}</div>
    <div class="grid gap-4">
      <TaskItem v-for="task in tasksStore.tasks" :key="task.id" :task="task" />
    </div>
    <Dialog v-model:open="showAddDialog">
      <TaskForm @close="showAddDialog = false" />
    </Dialog>
  </div>
</template>