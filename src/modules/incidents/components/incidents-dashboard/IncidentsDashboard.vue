<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import IncidentsDashboardDetails from './IncidentsDashboardDetails.vue';
import type { IncidentsDict, IncidentType } from '@/shared/domain';
import { AppStub } from '@/shared/components/common';
import { AppLoader, type AppSelectOption } from '@/shared/components/ui';
import { PRIORITIES } from '@/shared/consts';
import { parseIncidentDate } from './helpers/parseIncidentDate.ts';

type IncidentsDashboardProps = {
  incidents: IncidentsDict;
  isIncidentsLoading: boolean;
  initIncidentsList: () => void;
  incidentStatusSelected: AppSelectOption;
  incidentSortingSelected: AppSelectOption;
};

const SEARCH_FIELDS: ['title', 'service'] = ['title', 'service'];

const PRIORITY_ORDER: Record<string, number> = {
  [PRIORITIES.critical]: 0,
  [PRIORITIES.high]: 1,
  [PRIORITIES.medium]: 2,
  [PRIORITIES.low]: 3,
};

const query = defineModel('query', { default: '' });
const {
  incidents,
  isIncidentsLoading,
  incidentStatusSelected,
  incidentSortingSelected,
  initIncidentsList,
} = defineProps<IncidentsDashboardProps>();

const incidentSelected = ref<IncidentType | null>(null);

const incidentsList = computed<IncidentType[]>(() => {
  return Object.values(incidents);
});

const incidentsFilteredList = computed<IncidentType[]>(() => {
  const normalizedQuery = query.value.trim().toLowerCase();
  const statusFilter = incidentStatusSelected.label.trim().toLowerCase();

  const filteredListQuery = incidentsList.value.filter((incident) =>
    SEARCH_FIELDS.some((field) => incident[field].toLowerCase().includes(normalizedQuery)),
  );

  if (incidentStatusSelected.id === 'all') {
    return filteredListQuery;
  }

  const incidentsFilteredQueryStatus = filteredListQuery.filter(
    (incident) => incident.status.trim().toLowerCase() === statusFilter,
  );

  return incidentsFilteredQueryStatus;
});

const incidentsFilteredSortedList = computed<IncidentType[]>(() => {
  const result = [...incidentsFilteredList.value];

  if (incidentSortingSelected.id === 'priority') {
    result.sort((a, b) => {
      const aPriority = PRIORITY_ORDER[a.priority] ?? Number.MAX_SAFE_INTEGER;
      const bPriority = PRIORITY_ORDER[b.priority] ?? Number.MAX_SAFE_INTEGER;
      return aPriority - bPriority;
    });

    return result;
  }

  result.sort((a, b) => parseIncidentDate(b.updatedAt) - parseIncidentDate(a.updatedAt));
  return result;
});

function handleSelectIncident(incident: IncidentType) {
  incidentSelected.value = incident;
}

function handleResetSelectedIncident() {
  incidentSelected.value = null;
}

onMounted(() => {
  initIncidentsList();
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

      <AppLoader v-if="isIncidentsLoading" />
      <AppStub v-if="incidentsFilteredSortedList.length === 0 && !isIncidentsLoading" />

      <div
        class="incidents-table__list"
        v-if="incidentsFilteredSortedList.length > 0 && !isIncidentsLoading"
      >
        <div
          v-for="incident in incidentsFilteredSortedList"
          :key="incident.id"
          class="incidents-table__row incidents-list__item"
          :class="{ 'incidents-list__item-selected': incident.id === incidentSelected?.id }"
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
<style scoped>
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
