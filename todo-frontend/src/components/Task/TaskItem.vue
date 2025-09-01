<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import { Button } from '~/components/ui'
import { useToast } from 'vue-toastification'

defineProps<{ task: { id: number; title: string; description?: string; completed: boolean } }>()
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
  <div class="p-2 border rounded flex items-center justify-between">
    <div v-if="!editing" class="flex-1">
      <h4 class="font-medium">{{ task.title }}</h4>
      <p class="text-sm text-gray-600">{{ task.description || 'No description' }}</p>
      <input type="checkbox" v-model="task.completed" class="mr-2" @change="save">
      <span>Completed</span>
    </div>
    <div v-else class="flex-1">
      <input v-model="editedTask.title" class="border p-1 mb-1 w-full" />
      <input v-model="editedTask.description" class="border p-1 mb-1 w-full" />
      <input v-model="editedTask.completed" type="checkbox" class="mr-2">
    </div>
    <div class="space-x-2">
      <Button v-if="!editing" @click="editing = true" size="sm">Edit</Button>
      <Button v-else @click="save" size="sm">Save</Button>
      <Button @click="remove" variant="destructive" size="sm">Delete</Button>
    </div>
  </div>
</template>