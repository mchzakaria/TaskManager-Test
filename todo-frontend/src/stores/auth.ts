import { defineStore } from 'pinia'
import axios from 'axios'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as User | null
  }),
  actions: {
    async register(credentials: { name: string; email: string; password: string; password_confirmation: string }) {
      try {
        const response = await axios.post('/auth/register', credentials)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error: any) {
        console.error('Registration failed', error)
        throw error.response?.data?.message || 'Registration failed'
      }
    },
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await axios({
          method: 'post',
          url: '/auth/login',
          data: credentials,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          validateStatus: (status) => {
            return status >= 200 && status < 400
          }
        })

        if (!response.data.token) {
          throw new Error('No token received from server')
        }

        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)

        // Update axios default headers for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return response.data
      } catch (error: any) {
        console.error('Login failed:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        })
        throw error.response?.data?.message || 'Login failed'
      }
    },
    async logout() {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/logout`)
        this.token = ''
        this.user = null
        localStorage.removeItem('token')
        delete axios.defaults.headers.Authorization
      } catch (error) {
        console.error('Logout failed', error)
        throw error || 'Logout failed'
      }
    },
    async refreshToken() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/refresh`)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        axios.defaults.headers.Authorization = `Bearer ${this.token}`
      } catch (error) {
        console.error('Token refresh failed', error)
        throw error || 'Token refresh failed'
      }
    },
    async fetchProfile() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`)
        this.user = response.data
      } catch (error) {
        console.error('Fetch profile failed', error)
        throw error || 'Fetch profile failed'
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})