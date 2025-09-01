<template>
  <div>
    <Navigation />
    <div class="p-6 max-w-4xl mx-auto">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">My Profile</h1>
        <p class="text-gray-600 mt-1">Manage your account information and settings</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-2 text-gray-600">Loading profile...</p>
      </div>

      <!-- Profile Content -->
      <div v-else class="bg-white rounded-lg shadow-sm border">
        <!-- Profile Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <img 
                v-if="profileImage" 
                :src="profileImage" 
                alt="Profile" 
                class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <div v-else class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
              <button 
                @click="$refs.imageInput.click()"
                class="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
              </button>
              <input 
                ref="imageInput"
                type="file" 
                @change="handleImageUpload" 
                accept="image/*" 
                class="hidden"
              />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ user?.name || 'User' }}</h2>
              <p class="text-gray-600">{{ user?.email }}</p>
              <p class="text-sm text-gray-500">Member since {{ formatDate(user?.created_at) }}</p>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <form @submit.prevent="updateProfile" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                v-model="form.name" 
                type="text" 
                class="input w-full" 
                required
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                v-model="form.email" 
                type="email" 
                class="input w-full" 
                required
                disabled
              />
              <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                v-model="form.phone_number" 
                type="tel" 
                class="input w-full"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <!-- Address -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea 
                v-model="form.address" 
                rows="3" 
                class="input w-full"
                placeholder="Enter your full address"
              ></textarea>
            </div>
          </div>

          <!-- Password Change Section -->
          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input 
                  v-model="passwordForm.current_password" 
                  type="password" 
                  class="input w-full"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input 
                  v-model="passwordForm.new_password" 
                  type="password" 
                  class="input w-full"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input 
                  v-model="passwordForm.new_password_confirmation" 
                  type="password" 
                  class="input w-full"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              @click="resetForm"
              class="btn bg-gray-500 hover:bg-gray-600"
              :disabled="updating"
            >
              Reset
            </button>
            <button 
              type="submit" 
              class="btn bg-blue-600 hover:bg-blue-700"
              :disabled="updating"
            >
              <span v-if="updating" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
              <span v-else>Update Profile</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Statistics Section -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Tasks</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalTasks }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.completedTasks }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingTasks }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useTaskStore } from '../stores/tasks'
import Navigation from '../components/Navigation.vue'

const auth = useAuthStore()
const tasks = useTaskStore()

const loading = ref(false)
const updating = ref(false)
const newImage = ref<File | null>(null)

const user = computed(() => auth.user)

const form = ref({
  name: '',
  email: '',
  phone_number: '',
  address: ''
})

const passwordForm = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

const stats = ref({
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0
})

const profileImage = computed(() => {
  if (newImage.value) {
    return URL.createObjectURL(newImage.value)
  }
  if (user.value?.image) {
    return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/${user.value.image}`
  }
  return null
})

onMounted(async () => {
  await loadProfile()
  await loadStats()
})

const loadProfile = async () => {
  loading.value = true
  try {
    await auth.loadUser()
    if (user.value) {
      form.value = {
        name: user.value.name || '',
        email: user.value.email || '',
        phone_number: user.value.phone_number || '',
        address: user.value.address || ''
      }
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    await tasks.fetchTasks()
    const allTasks = tasks.tasks
    stats.value = {
      totalTasks: allTasks.length,
      completedTasks: allTasks.filter(task => task.completed).length,
      pendingTasks: allTasks.filter(task => !task.completed).length
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    newImage.value = target.files[0]
  }
}

const updateProfile = async () => {
  updating.value = true
  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('phone_number', form.value.phone_number)
    formData.append('address', form.value.address)
    
    if (newImage.value) {
      formData.append('image', newImage.value)
    }

    // Update profile
    await auth.updateProfile(formData)

    // Update password if provided
    if (passwordForm.value.new_password) {
      if (passwordForm.value.new_password !== passwordForm.value.new_password_confirmation) {
        alert('New password confirmation does not match')
        return
      }
      await auth.changePassword({
        current_password: passwordForm.value.current_password,
        new_password: passwordForm.value.new_password,
        new_password_confirmation: passwordForm.value.new_password_confirmation
      })
    }

    alert('Profile updated successfully!')
    resetPasswordForm()
  } catch (error: any) {
    console.error('Update failed:', error)
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      const errorMessages = Object.values(errors).flat().join('\n')
      alert(`Update failed:\n${errorMessages}`)
    } else {
      alert('Update failed. Please try again.')
    }
  } finally {
    updating.value = false
  }
}

const resetForm = () => {
  if (user.value) {
    form.value = {
      name: user.value.name || '',
      email: user.value.email || '',
      phone_number: user.value.phone_number || '',
      address: user.value.address || ''
    }
  }
  resetPasswordForm()
  newImage.value = null
}

const resetPasswordForm = () => {
  passwordForm.value = {
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
