<script setup lang="ts">
defineProps<{
  type?: 'submit' | 'button' | 'reset';
}>();
</script>
<template>
  <button class="app-button" :type="type || 'button'">
    <slot></slot>
  </button>
</template>
<style scoped>
.app-button {
  padding: 12px 24px;
  border-radius: 14px;
  background-color: #e8edf3;
  color: #1d2939;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  border: none;
  outline: none;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;
}
</style>
