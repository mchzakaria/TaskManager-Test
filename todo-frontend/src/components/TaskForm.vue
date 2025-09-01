<script setup>
import { ref, computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/form'
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

const props = defineProps({
  task: { type: Object, default: null },
})
const emit = defineEmits(['close'])

const tasksStore = useTasksStore()
const formData = ref({
  title: props.task?.title || '',
  description: props.task?.description || '',
})
const isEdit = computed(() => !!props.task)
const error = ref(null)

const submit = async () => {
  try {
    if (isEdit.value) {
      await tasksStore.updateTask(props.task.id, formData.value)
    } else {
      await tasksStore.addTask(formData.value)
    }
    emit('close')
  } catch (err) {
    error.value = err.message || 'Operation failed'
  }
}
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{{ isEdit ? 'Edit Task' : 'Add Task' }}</DialogTitle>
    </DialogHeader>
    <Form @submit.prevent="submit">
      <div class="mb-4">
        <Label for="title">Title</Label>
        <Input v-model="formData.title" id="title" required />
      </div>
      <div class="mb-4">
        <Label for="description">Description</Label>
        <Textarea v-model="formData.description" id="description" />
      </div>
      <DialogFooter>
        <Button type="submit">{{ isEdit ? 'Update' : 'Create' }}</Button>
        <Button variant="secondary" @click="emit('close')">Cancel</Button>
      </DialogFooter>
      <p v-if="error" class="text-destructive mt-2">{{ error }}</p>
    </Form>
  </DialogContent>
</template> 