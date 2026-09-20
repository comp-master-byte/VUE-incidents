import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IncidentPriority, IncidentsDict, IncidentType } from '@/shared/domain';
import { STATUSES } from '@/shared/consts';
import { getOptionsListFromRecord, type AppSelectOption } from '@/shared/components/ui';
import { incidentsService } from '../network/IncidentsService';
import { parseIncidentDate } from '../components/incidents-dashboard/helpers/parseIncidentDate';

const INCIDENTS_STATUSES = {
  all: 'Все статусы',
  ...STATUSES,
};

const INCIDENTS_SORTING = {
  date: 'По обновлению',
  priority: 'По приоритету',
};

const SEARCH_FIELDS: ['title', 'service'] = ['title', 'service'];

const PRIORITY_ORDER: Record<IncidentPriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export const useIncidentsStore = defineStore('incidents', () => {
  const incidentsQuery = ref('');
  const isIncidentsLoading = ref(false);
  const incidents = ref<IncidentsDict>({});
  const selectedIncidentId = ref<string | null>(null);
  const incidentStatusSelected = ref<AppSelectOption>({ id: 'all', label: 'Все статусы' });
  const incidentSortingSelected = ref<AppSelectOption>({ id: 'date', label: 'По обновлению' });

  const incidentsStatusesOptionsList = getOptionsListFromRecord(INCIDENTS_STATUSES);
  const incidentsSortingOptionsList = getOptionsListFromRecord(INCIDENTS_SORTING);

  const incidentSelected = computed(() => {
    if (!selectedIncidentId.value) return null;
    return incidents.value[selectedIncidentId.value] || null;
  });

  const incidentsList = computed<IncidentType[]>(() => {
    return Object.values(incidents.value);
  });

  const incidentsFilteredList = computed<IncidentType[]>(() => {
    const normalizedQuery = incidentsQuery.value.trim().toLowerCase();

    const filteredListQuery = incidentsList.value.filter((incident) =>
      SEARCH_FIELDS.some((field) => incident[field]?.toLowerCase().includes(normalizedQuery)),
    );

    if (incidentStatusSelected.value.id === 'all') {
      return filteredListQuery;
    }

    const incidentsFilteredQueryStatus = filteredListQuery.filter(
      (incident) => incident.status === incidentStatusSelected.value.id,
    );

    return incidentsFilteredQueryStatus;
  });

  const incidentsFilteredSortedList = computed<IncidentType[]>(() => {
    const result = [...incidentsFilteredList.value];

    if (incidentSortingSelected.value.id === 'priority') {
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

  function handleIncidentsStatusSelect(incidentsStatus: AppSelectOption) {
    incidentStatusSelected.value = incidentsStatus;
  }

  function handleIncidentsSortingSelect(incidentsSorting: AppSelectOption) {
    incidentSortingSelected.value = incidentsSorting;
  }

  function handleSelectIncident(incident: IncidentType) {
    selectedIncidentId.value = incident.id;
  }

  function handleResetSelectedIncident() {
    selectedIncidentId.value = null;
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

  return {
    incidents,
    incidentsQuery,
    incidentSelected,
    isIncidentsLoading,
    incidentStatusSelected,
    incidentSortingSelected,
    incidentsFilteredSortedList,
    incidentsSortingOptionsList,
    incidentsStatusesOptionsList,
    handleSelectIncident,
    handleResetSelectedIncident,
    handleIncidentsStatusSelect,
    handleIncidentsSortingSelect,
    initIncidentsList,
  };
});
