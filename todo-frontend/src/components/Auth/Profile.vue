<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { Button } from '~/components/ui'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const toast = useToast()
const router = useRouter()
const user = ref(null)
const error = ref('')

const fetchUser = async () => {
  try {
    await store.fetchProfile()
    user.value = store.user
  } catch (err) {
    error.value = typeof err === 'string' ? err : 'Failed to load profile'
    toast.error(error.value)
  }
}

const logout = async () => {
  try {
    await store.logout()
    toast.success('Logged out')
    router.push('/login')
  } catch (err) {
    toast.error('Logout failed')
  }
}

onMounted(fetchUser)
</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">Profile</h2>
    <div v-if="user" class="mb-4">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <p v-else-if="error" class="text-red-500">{{ error }}</p>
    <Button @click="logout" class="mt-4">Logout</Button>
  </div>
</template>