<script setup lang="ts">
import type { IncidentsDict, IncidentType } from '@/shared/domain';
import { ref, onMounted, computed } from 'vue';
import { incidentsService } from '../../network/IncidentsService';

const incidents = ref<IncidentsDict>({});
const isIncidentsLoading = ref(false);

const incidentsList = computed<IncidentType[]>(() => {
  return Object.values(incidents.value);
});

onMounted(async () => {
  isIncidentsLoading.value = true;
  try {
    const response = await incidentsService.fetchAllIncidents();
    incidents.value = response;
  } finally {
    isIncidentsLoading.value = false;
  }
});
</script>
<template>
  <section class="incidents-dashboard">
    <header class="incidents-table__row incidents-dashboard__header">
      <p class="incidents-dashboard__header-title">Инцидент</p>
      <p class="incidents-dashboard__header-title">Сервис</p>
      <p class="incidents-dashboard__header-title">Приоритет</p>
      <p class="incidents-dashboard__header-title">Статус</p>
      <p class="incidents-dashboard__header-title">Обновлен</p>
    </header>

    <p v-if="isIncidentsLoading">Загрузка...</p>

    <div class="incidents-table__list">
      <div v-for="incident in incidentsList" :key="incident.id" class="incidents-table__row">
        <div>
          <strong>{{ incident.title }}</strong>
          <p>{{ incident.id }}</p>
        </div>
        <div>
          <p>{{ incident.service }}</p>
        </div>
        <div>
          <p>{{ incident.priority }}</p>
        </div>
        <div>
          <p>{{ incident.status }}</p>
        </div>
        <div>
          <p>{{ incident.updatedAt }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.incidents-dashboard {
  background-color: #fff;
  border-radius: 18px;
  padding: 20px;
}

.incidents-table__list {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 12px;
}

.incidents-table__row {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr 0.5fr;
  align-items: flex-start;
}
</style>
