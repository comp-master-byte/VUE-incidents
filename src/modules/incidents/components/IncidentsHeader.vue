<script setup lang="ts">
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
      <button class="app-button" @click="incidentsCreateModalStore.handleOpenCreateModal">
        Завести инцидент
      </button>
      <button class="app-button" @click="incidentsStore.updateIncidentsList">Обновить</button>
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

.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 24px;
  border: none;
  border-radius: 14px;
  background-color: #e8edf3;
  color: #1d2939;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    opacity 0.15s ease;
}

.incidents-header__action-buttons {
  display: flex;
  align-content: center;
  column-gap: 15px;
}

.app-button:hover {
  background-color: #dce3ec;
}

.app-button:active {
  background-color: #d0d9e4;
}

.app-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .incidents-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding-top: 24px;
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

  .app-button {
    width: 100%;
  }
}
</style>
