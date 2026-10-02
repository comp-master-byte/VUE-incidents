<script setup lang="ts">
type AppCheckboxProps = {
  id: string;
  modelValue: boolean;
  label: string;
};

defineProps<AppCheckboxProps>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();
</script>
<template>
  <label class="app-checkbox" :for="id">
    <input
      :id="id"
      class="app-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="app-checkbox__box" aria-hidden="true">
      <svg
        class="app-checkbox__check"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 6.2L4.8 8.5L9.5 3.5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="app-checkbox__label">{{ label }}</span>
  </label>
</template>
<style scoped>
.app-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  cursor: pointer;
  user-select: none;
}

.app-checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.app-checkbox__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: var(--color-white);
  color: transparent;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease,
    box-shadow 0.15s ease,
    color 0.15s ease;
}

.app-checkbox__check {
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.app-checkbox:hover .app-checkbox__box {
  border-color: #cbd5e1;
}

.app-checkbox__input:focus-visible + .app-checkbox__box {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(93, 95, 239, 0.15);
}

.app-checkbox__input:checked + .app-checkbox__box {
  border-color: var(--color-accent);
  background-color: var(--color-accent);
  color: var(--color-white);
}

.app-checkbox__input:checked + .app-checkbox__box .app-checkbox__check {
  opacity: 1;
  transform: scale(1);
}

.app-checkbox__label {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}
</style>
