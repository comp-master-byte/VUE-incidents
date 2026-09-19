<script setup lang="ts">
type IncidentsHeaderProps = {
  initIncidentsList: () => void;
};

const { initIncidentsList } = defineProps<IncidentsHeaderProps>();
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
    <button class="app-button" @click="initIncidentsList">Обновить</button>
  </div>
</template>
<style scoped>
.incidents-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-top: 50px;
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
</style>
