import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const apiUrl = import.meta.env.VITE_API_URL

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async register(userData) {
      try {
        const response = await axios.post(`${apiUrl}/register`, userData)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        await this.fetchUser()
        router.push('/')
      } catch (error) {
        throw error.response.data
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post(`${apiUrl}/login`, credentials)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        await this.fetchUser()
        router.push('/')
      } catch (error) {
        throw error.response.data
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get(`${apiUrl}/me`)
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    },
    async logout() {
      try {
        await axios.post(`${apiUrl}/logout`)
      } catch {}
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      router.push('/login')
    },
  },
})