<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded shadow">
    <h1 class="text-xl font-bold mb-4">Register</h1>
    <form @submit.prevent="submit" class="space-y-4">
    <input v-model="name" type="text" placeholder="Full Name" class="input" required />
    <input v-model="email" type="email" placeholder="Email" class="input" required />
    <input v-model="phone_number" type="tel" placeholder="Phone Number" class="input" />
    <textarea v-model="address" placeholder="Address" class="input" rows="3"></textarea>
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Profile Image</label>
      <input 
        type="file" 
        @change="handleImageUpload" 
        accept="image/*" 
        class="input"
      />
    </div>
    <input v-model="password" type="password" placeholder="Password" class="input" required />
    <input v-model="password_confirmation" type="password" placeholder="Confirm Password" class="input" required />
    <button class="btn w-full">Register</button>
    </form>
    <p class="mt-2 text-sm">
    Already have an account? <router-link to="/login" class="text-blue-600">Login</router-link>
    </p>
    </div>
    </div>
    </template>
    
    
    <script setup lang="ts">
    import { ref } from 'vue'
    import { useAuthStore } from '../stores/auth'
    
    
    const auth = useAuthStore()
    const name = ref('')
    const email = ref('')
    const phone_number = ref('')
    const address = ref('')
    const image = ref<File | null>(null)
    const password = ref('')
    const password_confirmation = ref('')
    
    const handleImageUpload = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        image.value = target.files[0]
      }
    }
    
    const submit = async () => {
      if (password.value !== password_confirmation.value) {
        alert('Passwords do not match')
        return
      }
      
      try {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('email', email.value)
        formData.append('phone_number', phone_number.value)
        formData.append('address', address.value)
        formData.append('password', password.value)
        formData.append('password_confirmation', password_confirmation.value)
        
        if (image.value) {
          formData.append('image', image.value)
        }
        
        await auth.register(formData)
        alert('Registration successful! Please login.')
      } catch (e: any) {
        console.error('Registration error:', e)
        if (e.response?.data?.errors) {
          const errors = e.response.data.errors
          const errorMessages = Object.values(errors).flat().join('\n')
          alert(`Registration failed:\n${errorMessages}`)
        } else {
          alert('Registration failed. Please check your input and try again.')
        }
      }
    }
    </script>