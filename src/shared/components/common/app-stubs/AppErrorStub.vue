<script setup lang="ts">
type AppErrorStubProps = {
  title?: string;
  description?: string;
};

withDefaults(defineProps<AppErrorStubProps>(), {
  title: 'Не удалось загрузить данные',
  description: 'Произошла ошибка при запросе. Попробуйте обновить страницу или повторить попытку.',
});
</script>

<template>
  <div class="app-error-stub" role="alert">
    <div class="app-error-stub__icon" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
        <path
          d="M12 7V13"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <circle cx="12" cy="16.5" r="1" fill="currentColor" />
      </svg>
    </div>

    <h3 class="app-error-stub__title">{{ title }}</h3>
    <p class="app-error-stub__description">{{ description }}</p>

    <div v-if="$slots.default" class="app-error-stub__actions">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-error-stub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 220px;
  padding: 32px 24px;
  text-align: center;
}

.app-error-stub__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 4px;
  border-radius: 16px;
  background-color: #fee2e2;
  color: #b91c1c;
}

.app-error-stub__title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.app-error-stub__description {
  margin: 0;
  max-width: 320px;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.45;
}

.app-error-stub__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}
</style>
