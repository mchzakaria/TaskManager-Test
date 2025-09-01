<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded shadow">
    <h1 class="text-xl font-bold mb-4">Login</h1>
    <form @submit.prevent="submit">
    <input v-model="email" type="email" placeholder="Email" class="input mb-2" />
    <input v-model="password" type="password" placeholder="Password" class="input mb-2" />
    <button class="btn w-full">Login</button>
    </form>
    <p class="mt-2 text-sm">
    No account? <router-link to="/register" class="text-blue-600">Register</router-link>
    </p>
    </div>
    </div>
    </template>
    
    
    <script setup lang="ts">
    import { ref } from 'vue'
    import { useAuthStore } from '../store/auth'
    
    
    const auth = useAuthStore()
    const email = ref('')
    const password = ref('')
    
    
    const submit = async () => {
    try {
    await auth.login(email.value, password.value)
    } catch (e) {
    alert('Login failed')
    }
    }
    </script>