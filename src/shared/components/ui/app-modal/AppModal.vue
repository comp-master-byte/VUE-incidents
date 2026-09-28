<script setup lang="ts">
import { watch } from 'vue';

type AppModalProps = {
  modelValue: boolean;
};

const { modelValue } = defineProps<AppModalProps>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

function handleCloseAppModal() {
  emit('update:modelValue', false);
}

watch(
  () => modelValue,
  (isModelOpen) => {
    document.body.style.overflow = isModelOpen ? 'hidden' : '';
  },
);
</script>
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="app-modal__wrapper" @click.self="handleCloseAppModal">
      <div class="app-modal__content">
        <button
          type="button"
          class="app-modal__close"
          aria-label="Закрыть"
          @click="handleCloseAppModal"
        >
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.app-modal__wrapper {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.app-modal__content {
  position: relative;
  width: 640px;
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 12px;
}

.app-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.app-modal__close:hover {
  background-color: var(--color-surface-muted);
  color: var(--color-text-primary);
}

@media screen and (max-width: 768px) {
  .app-modal__content {
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding-top: 30px;
  }

  .app-modal__close {
    top: 10px;
  }
}
</style>
