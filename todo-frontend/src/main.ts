import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import Toast, { type PluginOptions } from 'vue-toastification'
import axios from 'axios'
import 'vue-toastification/dist/index.css'
import './assets/tailwind.css'
import { useTasksStore } from './stores/tasks'

// Ensure environment variables are defined
const requiredEnvVars = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_PUSHER_APP_KEY: import.meta.env.VITE_PUSHER_APP_KEY,
  VITE_PUSHER_APP_CLUSTER: import.meta.env.VITE_PUSHER_APP_CLUSTER
}

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})

// Configure Axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = false // Changed for CORS
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// Add interceptor to log requests
axios.interceptors.request.use(request => {
  console.log('Starting Request:', {
    url: request.url,
    method: request.method,
    baseURL: request.baseURL,
    headers: request.headers
  })
  return request
})

// Add interceptor to log responses
axios.interceptors.response.use(
  response => {
    console.log('Response:', response)
    return response
  },
  error => {
    console.error('Axios Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    })
    return Promise.reject(error)
  }
)

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    })
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    })
    return response
  },
  (error) => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    return Promise.reject(error)
  }
)

// Add request/response interceptors for debugging
axios.interceptors.request.use(config => {
  console.log('Making request to:', config.baseURL + config.url, config)
  return config
})

axios.interceptors.response.use(
  response => {
    console.log('Received response:', response)
    return response
  },
  error => {
    console.error('Request failed:', error.config?.url, error.response || error)
    return Promise.reject(error)
  }
)

// Add token if exists
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

window.Pusher = Pusher
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
})

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Toast)

const tasksStore = useTasksStore()
window.Echo.channel('tasks')
  .listen('TaskCreated', (e: any) => {
    tasksStore.tasks.push(e.task)
  })
  .listen('TaskUpdated', (e: any) => {
    const index = tasksStore.tasks.findIndex(t => t.id === e.task.id)
    if (index !== -1) tasksStore.tasks[index] = e.task
  })
  .listen('TaskDeleted', (e: any) => {
    tasksStore.tasks = tasksStore.tasks.filter(t => t.id !== e.task.id)
  })

app.mount('#app')