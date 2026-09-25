<script setup lang="ts">
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
</script>
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="app-modal__wrapper" @click.self="handleCloseAppModal">
      <div class="app-modal__content">
        <slot></slot>
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
  width: 640px;
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 12px;
}
</style>
