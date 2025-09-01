<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import { Button, Input } from '~/components/ui'
import { useToast } from 'vue-toastification'

const tasksStore = useTasksStore()
const toast = useToast()
const form = ref({ title: '', description: '' })
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
    form.value = { title: '', description: '' }
  } catch (err) {
    error.value = typeof err === 'string' ? err : 'Failed to create task'
    toast.error(error.value)
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="mb-4 p-4 border rounded">
    <h3 class="text-lg font-bold mb-2">Add Task</h3>
    <Input v-model="form.title" placeholder="Title" class="mb-2" />
    <Input v-model="form.description" placeholder="Description" class="mb-2" />
    <Button type="submit">Add</Button>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </form>
</template>