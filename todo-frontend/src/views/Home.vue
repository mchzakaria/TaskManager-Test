<script setup lang="ts">
import { onMounted } from 'vue'
import TaskList from '~/components/Task/TaskList.vue'
import TaskForm from '~/components/Task/TaskForm.vue'
import { useAuthStore } from '~/stores/auth'
import { useTasksStore } from '~/stores/tasks'

const authStore = useAuthStore()
const tasksStore = useTasksStore()

onMounted(async () => {
  if (authStore.token) await tasksStore.fetchTasks()
})
</script>

<template>
  <div v-if="authStore.token" class="p-4">
    <TaskForm />
    <TaskList />
  </div>
  <div v-else class="p-4 text-center">
    <p>Please <router-link to="/login" class="text-blue-500">login</router-link> to view your tasks.</p>
  </div>
</template>