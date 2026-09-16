<script setup lang="ts">
import { ref } from 'vue';

export type AppSelectOption = {
  id: string;
  label: string;
};
type AppSelectProps = {
  label?: string;
  options: AppSelectOption[];
  selectedOption: AppSelectOption;
  onSelectOption: (option: AppSelectOption) => void;
};

const { selectedOption, label, options, onSelectOption } = defineProps<AppSelectProps>();

const isSelectOptionsVisible = ref(false);

function toggleSelectOptionsVisibility() {
  isSelectOptionsVisible.value = !isSelectOptionsVisible.value;
}

function handleSelectOption(option: AppSelectOption) {
  isSelectOptionsVisible.value = false;
  onSelectOption(option);
}
</script>
<template>
  <div class="app-select">
    <label v-if="label" class="app-label">{{ label }}</label>
    <div class="app-select__button" @click="toggleSelectOptionsVisibility">
      {{ selectedOption?.label }}
    </div>
    <div v-if="isSelectOptionsVisible" class="app-select__options">
      <p
        v-for="option in options"
        :key="option.id"
        class="app-select__option"
        @click="handleSelectOption(option)"
      >
        {{ option.label }}
      </p>
    </div>
  </div>
</template>
<style scoped>
.app-select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 300px;
}

.app-label {
  width: fit-content;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}

.app-select__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background-color: var(--color-white);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.app-select__button:hover {
  border-color: #cbd5e1;
}

.app-select__button--open,
.app-select:has(.app-select__options) .app-select__button {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(93, 95, 239, 0.15);
}

.app-select__options {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: var(--color-white);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.app-select__option {
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  line-height: 1.3;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.app-select__option:hover {
  background-color: var(--color-surface-muted);
}

.app-select__option--selected {
  background-color: var(--color-white-selected);
  font-weight: 600;
}
</style>
