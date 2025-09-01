<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import TaskForm from './TaskForm.vue'

const props = defineProps({
  task: { type: Object, required: true },
})

const tasksStore = useTasksStore()
const showEditDialog = ref(false)

const deleteTask = async () => {
  if (confirm('Are you sure?')) {
    await tasksStore.deleteTask(props.task.id)
  }
}
</script>

<template>
  <Card class="p-4">
    <h3 class="text-lg font-semibold">{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <div class="mt-2 flex gap-2">
      <Button @click="showEditDialog = true">Edit</Button>
      <Button variant="destructive" @click="deleteTask">Delete</Button>
    </div>
    <Dialog v-model:open="showEditDialog">
      <TaskForm :task="task" @close="showEditDialog = false" />
    </Dialog>
  </Card>
</template>