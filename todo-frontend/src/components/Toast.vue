<template>
  <div 
    v-if="show" 
    class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300"
    :class="show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
  >
    <div class="flex items-center gap-3">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="flex-1">
        <p class="font-medium">{{ title }}</p>
        <p class="text-sm opacity-90">{{ message }}</p>
      </div>
      <button @click="close" class="flex-shrink-0 opacity-70 hover:opacity-100">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  title: string
  message: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000
})

const show = ref(false)

const close = () => {
  show.value = false
}

onMounted(() => {
  show.value = true
  setTimeout(close, props.duration)
})
</script>
