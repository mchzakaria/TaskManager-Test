import { defineStore } from 'pinia'
import api from '../api/axios'
import router from '../router'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('token') || ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('/auth/login', { email, password })
      this.token = data.token
      localStorage.setItem('token', this.token)
      this.user = data.user
      router.push('/')
    },
    async register(formData: FormData) {
      const response = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
    async loadUser() {
      if (this.token) {
        const { data } = await api.get('/auth/me')
        this.user = data
      }
    },
    async updateProfile(formData: FormData) {
      const response = await api.put('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.user = response.data.user
      return response.data
    },
    async changePassword(passwordData: {
      current_password: string
      new_password: string
      new_password_confirmation: string
    }) {
      const response = await api.put('/auth/password', passwordData)
      return response.data
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
})