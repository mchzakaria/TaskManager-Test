<template>
    <div>
      <Navigation />
      <div class="p-6 max-w-2xl mx-auto">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p class="text-gray-600 mt-1">Manage your tasks and stay organized</p>
        </div>
  
      <!-- Add Task Form -->
      <form v-if="!isEditing" @submit.prevent="add" class="space-y-4 mb-6">
        <div class="flex gap-2">
          <input v-model="title" placeholder="Title" class="input flex-1" required />
          <input v-model="description" placeholder="Description" class="input flex-1" />
        </div>
        
        <div class="flex gap-2">
          <select v-model="priority" class="input flex-1">
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <input v-model="due_date" type="date" class="input flex-1" />
          
          <select v-model="status" class="input flex-1">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <button class="btn bg-green-600 hover:bg-green-700 w-full">Add Task</button>
      </form>

      <!-- Edit Task Form -->
      <form v-if="isEditing" @submit.prevent="saveEdit" class="space-y-4 mb-6">
        <div class="flex gap-2">
          <input v-model="editTitle" placeholder="Title" class="input flex-1" required />
          <input v-model="editDescription" placeholder="Description" class="input flex-1" />
        </div>
        
        <div class="flex gap-2">
          <select v-model="editPriority" class="input flex-1">
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <input v-model="editDueDate" type="date" class="input flex-1" />
          
          <select v-model="editStatus" class="input flex-1">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div class="flex gap-2">
          <button type="submit" class="btn bg-blue-600 hover:bg-blue-700 flex-1">Save Changes</button>
          <button type="button" @click="cancelEdit" class="btn bg-gray-500 hover:bg-gray-600 flex-1">Cancel</button>
        </div>
      </form>
  
      <!-- Tasks List -->
      <ul>
        <TaskItem
          v-for="task in tasks.tasks"
          :key="task.id"
          :task="task"
          @toggle="toggle"
          @delete="remove"
          @edit="startEdit"
        />
      </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useTaskStore } from '../stores/tasks'
import { useNotificationStore } from '../stores/notifications'
import TaskItem from '../components/TaskItem.vue'
import Navigation from '../components/Navigation.vue'
  
  const auth = useAuthStore()
const tasks = useTaskStore()
const notifications = useNotificationStore()
  
  const title = ref('')
  const description = ref('')
  const priority = ref('')
  const due_date = ref('')
  const status = ref('pending')
  
  // Edit mode state
  const isEditing = ref(false)
  const editingTaskId = ref<number | null>(null)
  const editTitle = ref('')
  const editDescription = ref('')
  const editPriority = ref('')
  const editDueDate = ref('')
  const editStatus = ref('pending')
  
  onMounted(() => {
    tasks.fetchTasks()
    notifications.fetchUnreadNotifications()
  })
  
  const add = async () => {
    if (!title.value) return
    
    const taskData = {
      title: title.value,
      description: description.value,
      priority: priority.value || undefined,
      due_date: due_date.value || undefined,
      status: status.value
    }
    
    await tasks.addTask(taskData)
    
    // Reset form
    title.value = ''
    description.value = ''
    priority.value = ''
    due_date.value = ''
    status.value = 'pending'
  }

  const startEdit = (task: any) => {
    isEditing.value = true
    editingTaskId.value = task.id
    editTitle.value = task.title
    editDescription.value = task.description || ''
    editPriority.value = task.priority || ''
    editDueDate.value = task.due_date || ''
    editStatus.value = task.status || 'pending'
  }

  const saveEdit = async () => {
    if (!editingTaskId.value || !editTitle.value) return
    
    // Find the current task to preserve the completed status
    const currentTask = tasks.tasks.find(t => t.id === editingTaskId.value)
    if (!currentTask) return
    
    const updatedTask = {
      ...currentTask,
      title: editTitle.value,
      description: editDescription.value,
      priority: editPriority.value || undefined,
      due_date: editDueDate.value || undefined,
      status: editStatus.value
    }
    
    await tasks.updateTask(updatedTask)
    cancelEdit()
  }

  const cancelEdit = () => {
    isEditing.value = false
    editingTaskId.value = null
    editTitle.value = ''
    editDescription.value = ''
    editPriority.value = ''
    editDueDate.value = ''
    editStatus.value = 'pending'
  }
  
  const toggle = async (task: any) => {
    task.completed = !task.completed
    await tasks.updateTask(task)
  }
  
  const remove = async (id: number) => {
    await tasks.deleteTask(id)
  }
  
  // Remove logout function since it's now in Navigation component
  </script>
  