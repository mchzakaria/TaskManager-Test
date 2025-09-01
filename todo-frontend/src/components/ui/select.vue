<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    v-bind="$attrs"
  >
    <slot />
  </select>
</template>