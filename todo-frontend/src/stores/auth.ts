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
const { data } = await api.post('/login', { email, password })
this.token = data.access_token
localStorage.setItem('token', this.token)
this.user = data.user
router.push('/')
},
async register(name: string, email: string, password: string) {
await api.post('/register', { name, email, password })
router.push('/login')
},
logout() {
this.token = ''
this.user = null
localStorage.removeItem('token')
router.push('/login')
}
}
})