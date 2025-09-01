import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Toast {
  id: number
  title: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])
  let nextId = 1

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      id: nextId++,
      type: 'success',
      duration: 5000,
      ...toast
    }
    
    toasts.value.push(newToast)
    
    // Auto-remove toast after duration
    setTimeout(() => {
      removeToast(newToast.id)
    }, newToast.duration)
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (title: string, message: string) => {
    addToast({ title, message, type: 'success' })
  }

  const error = (title: string, message: string) => {
    addToast({ title, message, type: 'error' })
  }

  const warning = (title: string, message: string) => {
    addToast({ title, message, type: 'warning' })
  }

  const info = (title: string, message: string) => {
    addToast({ title, message, type: 'info' })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
})
