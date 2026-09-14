<script setup lang="ts">
import type { IncidentsDict, IncidentType } from '@/shared/domain';
import { ref, onMounted, computed } from 'vue';
import { incidentsService } from '../../network/IncidentsService';
import IncidentsDashboardDetails from './IncidentsDashboardDetails.vue';

const isIncidentsLoading = ref(false);
const incidents = ref<IncidentsDict>({});
const incidentSelected = ref<IncidentType | null>(null);

const incidentsList = computed<IncidentType[]>(() => {
  return Object.values(incidents.value);
});

function handleSelectIncident(incident: IncidentType) {
  incidentSelected.value = incident;
}

function handleResetSelectedIncident() {
  incidentSelected.value = null;
}

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
  <section :class="{ 'incidents-dashboard__full': !incidentSelected }" class="incidents-dashboard">
    <div class="white-wrapper">
      <header class="incidents-table__row incidents-dashboard__header">
        <p class="incidents-dashboard__header-title">Инцидент</p>
        <p class="incidents-dashboard__header-title">Сервис</p>
        <p class="incidents-dashboard__header-title">Приоритет</p>
        <p class="incidents-dashboard__header-title">Статус</p>
        <p class="incidents-dashboard__header-title">Обновлен</p>
      </header>

      <div class="border"></div>

      <p v-if="isIncidentsLoading">Загрузка...</p>

      <div class="incidents-table__list">
        <div
          v-for="incident in incidentsList"
          :key="incident.id"
          class="incidents-table__row incidents-list__item"
          v-bind:class="{ 'incidents-list__item-selected': incident.id === incidentSelected?.id }"
          @click="handleSelectIncident(incident)"
        >
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
    </div>

    <IncidentsDashboardDetails
      v-if="incidentSelected"
      :incident-selected="incidentSelected"
      :onCloseIncidentDetails="handleResetSelectedIncident"
    />
  </section>
</template>
<style>
.incidents-dashboard {
  display: grid;
  grid-template-columns: 4fr 2fr;
  column-gap: 20px;
}

.incidents-dashboard__full {
  grid-template-columns: 1fr;
}

.incidents-table__row {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr 0.5fr;
  align-items: flex-start;
  padding: 20px;
}

.incidents-dashboard__header {
  padding: 20px 20px 12px 20px;
}

.incidents-table__list {
  display: flex;
  flex-direction: column;
}

.incidents-list__item {
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.incidents-list__item:hover {
  background-color: var(--color-white-selected);
}

.incidents-list__item:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.incidents-list__item-selected {
  background-color: var(--color-white-selected);
}
</style>
