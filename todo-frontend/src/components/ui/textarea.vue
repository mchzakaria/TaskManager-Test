<script setup lang="ts">
defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <textarea
    :placeholder="placeholder"
    class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    v-bind="$attrs"
  ></textarea>
</template>