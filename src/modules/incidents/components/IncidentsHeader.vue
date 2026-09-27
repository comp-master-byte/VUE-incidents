<script setup lang="ts">
import { AppButton } from '@/shared/components/ui';
import { useIncidentsStore } from '../store';
import { useIncidentsCreateModalStore } from '../store/useIncidentsCreateModalStore';

const incidentsStore = useIncidentsStore();
const incidentsCreateModalStore = useIncidentsCreateModalStore();
</script>
<template>
  <div class="incidents-header">
    <div class="incidents-header__preview">
      <h3 class="app-h3">Дашборд инцидентов</h3>
      <p class="app-subtitle">
        Очередь инцидентов с поиском, фильтрами, сортировкой, панелью деталей, optimistic update и
      </p>
      <p class="app-subtitle">защитой от устаревших ответов API.</p>
    </div>
    <div class="incidents-header__action-buttons">
      <AppButton variant="secondary" @click="incidentsCreateModalStore.handleOpenCreateModal">
        Завести инцидент
      </AppButton>
      <AppButton variant="secondary" @click="incidentsStore.updateIncidentsList">
        Обновить
      </AppButton>
    </div>
  </div>
</template>
<style scoped>
.incidents-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}
.app-h3 {
  margin-bottom: 12px;
}

.incidents-header__action-buttons {
  display: flex;
  align-content: center;
  gap: 15px;
}

@media (max-width: 768px) {
  .incidents-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    margin-bottom: 16px;
  }

  .app-h3 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  .app-subtitle {
    font-size: 13px;
    line-height: 1.45;
  }

  .incidents-header__action-buttons {
    flex-direction: column;
  }

  .incidents-header__action-buttons :deep(.app-button) {
    width: 100%;
  }
}
</style>
