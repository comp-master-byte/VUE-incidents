<script setup lang="ts">
import { ref } from 'vue';
import IncidentsDashboard from './components/incidents-dashboard/IncidentsDashboard.vue';
import IncidentsFilters from './components/IncidentsFilters.vue';
import IncidentsHeader from './components/IncidentsHeader.vue';
import { STATUSES } from '@/shared/consts.ts';
import { getOptionsListFromRecord } from '@/shared/components/ui';
import type { AppSelectOption } from '@/shared/components/ui';
import { incidentsService } from './network/IncidentsService.ts';
import type { IncidentsDict } from '@/shared/domain';

const INCIDENTS_STATUSES = {
  all: 'Все статусы',
  ...STATUSES,
};

const INCIDENTS_SORTING = {
  date: 'По обновлению',
  priority: 'По приоритету',
};

const incidentsQuery = ref('');
const isIncidentsLoading = ref(false);
const incidents = ref<IncidentsDict>({});

const incidentsStatusesOptionsList = getOptionsListFromRecord(INCIDENTS_STATUSES);
const incidentStatusSelected = ref<AppSelectOption>(incidentsStatusesOptionsList[0]!);

const incidentsSortingOptionsList = getOptionsListFromRecord(INCIDENTS_SORTING);
const incidentSortingSelected = ref<AppSelectOption>(incidentsSortingOptionsList[0]!);

function handleIncidentsStatusSelect(incidentsStatus: AppSelectOption) {
  incidentStatusSelected.value = incidentsStatus;
}

function handleIncidentsSortingSelect(incidentsSorting: AppSelectOption) {
  incidentSortingSelected.value = incidentsSorting;
}

async function initIncidentsList() {
  // Тут пользователь может бесконечно клацать по кнопке, нужно сюда подключить AbortController
  isIncidentsLoading.value = true;
  try {
    const response = await incidentsService.fetchAllIncidents();
    incidents.value = response;
  } catch {
  } finally {
    isIncidentsLoading.value = false;
  }
}
</script>
<template>
  <IncidentsHeader :initIncidentsList="initIncidentsList" />
  <IncidentsFilters
    v-model:query="incidentsQuery"
    :incidentStatusSelected="incidentStatusSelected"
    :incidentsStatusesOptionsList="incidentsStatusesOptionsList"
    :incidentSortingSelected="incidentSortingSelected"
    :incidentsSortingOptionsList="incidentsSortingOptionsList"
    :onIncidentsStatusSelect="handleIncidentsStatusSelect"
    :onIncidentsSortingSelect="handleIncidentsSortingSelect"
  />
  <IncidentsDashboard
    :incidents="incidents"
    v-model:query="incidentsQuery"
    :initIncidentsList="initIncidentsList"
    :isIncidentsLoading="isIncidentsLoading"
    :incidentStatusSelected="incidentStatusSelected"
    :incidentSortingSelected="incidentSortingSelected"
  />
</template>
<style></style>
