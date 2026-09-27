<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'submit' | 'button' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
  }>(),
  {
    type: 'button',
    variant: 'primary',
  },
);
</script>

<template>
  <button class="app-button" :class="`app-button--${variant}`" :type="type">
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: 14px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  outline: none;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;
}

.app-button--primary {
  background-color: var(--color-accent);
  color: var(--color-white);
}

.app-button--primary:hover {
  background-color: #4f51e5;
}

.app-button--primary:active {
  background-color: #4346d4;
}

.app-button--secondary {
  background-color: #e8edf3;
  color: #1d2939;
}

.app-button--secondary:hover {
  background-color: #dce3ec;
}

.app-button--secondary:active {
  background-color: #d0d9e4;
}

.app-button--danger {
  background-color: #fee2e2;
  color: var(--color-error);
}

.app-button--danger:hover {
  background-color: #fecaca;
}

.app-button--danger:active {
  background-color: #fca5a5;
}

.app-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
