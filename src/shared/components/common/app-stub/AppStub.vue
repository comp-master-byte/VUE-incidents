<script setup lang="ts">
type AppStubProps = {
  title?: string;
  description?: string;
};

withDefaults(defineProps<AppStubProps>(), {
  title: 'Ничего не найдено',
  description: 'Попробуйте изменить поисковый запрос или сбросить фильтры.',
});
</script>

<template>
  <div class="app-stub">
    <div class="app-stub__icon" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8" />
        <path
          d="M16.5 16.5L21 21"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <h3 class="app-stub__title">{{ title }}</h3>
    <p class="app-stub__description">{{ description }}</p>

    <div v-if="$slots.default" class="app-stub__actions">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.app-stub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 220px;
  padding: 32px 24px;
  text-align: center;
}

.app-stub__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 4px;
  border-radius: 16px;
  background-color: var(--color-surface-muted);
  color: var(--color-text-secondary);
}

.app-stub__title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.app-stub__description {
  margin: 0;
  max-width: 320px;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.45;
}

.app-stub__actions {
  margin-top: 8px;
}
</style>
