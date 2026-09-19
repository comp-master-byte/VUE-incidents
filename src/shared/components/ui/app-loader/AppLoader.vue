<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: 'Загрузка...',
  },
);
</script>

<template>
  <div class="app-loader" role="status" aria-live="polite">
    <div class="app-loader__spinner" aria-hidden="true"></div>
    <p v-if="label" class="app-loader__label">{{ label }}</p>
  </div>
</template>

<style scoped>
.app-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 220px;
  padding: 32px 24px;
}

.app-loader__spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-surface-muted);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: app-loader-spin 0.7s linear infinite;
}

.app-loader__label {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
}

@keyframes app-loader-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
