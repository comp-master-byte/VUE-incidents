import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IncidentPriority, IncidentStatus, IncidentType } from '@/shared/domain';
import { STATUSES, statusesList } from '@/shared/consts';
import { getOptionsListFromRecord, type AppSelectOption } from '@/shared/components/ui';
import { useIncidentsStore } from '@/features/incidents';
import { appDates, appStrings } from '@/shared/utils';

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

export const useIncidentsDashboardStore = defineStore('incidents-dashboard', () => {
  const incidentsStore = useIncidentsStore();
  const incidentsQuery = ref('');
  const selectedIncidentId = ref<string | null>(null);
  const incidentStatusSelected = ref<AppSelectOption>({ id: 'all', label: 'Все статусы' });
  const incidentSortingSelected = ref<AppSelectOption>({ id: 'date', label: 'По обновлению' });

  const incidentsStatusesOptionsList = getOptionsListFromRecord(INCIDENTS_STATUSES);
  const incidentsSortingOptionsList = getOptionsListFromRecord(INCIDENTS_SORTING);

  const incidentSelected = computed(() => {
    if (!selectedIncidentId.value) return null;
    return incidentsStore.incidents[selectedIncidentId.value] || null;
  });

  const currentIncidentSelectedOption = computed({
    get: () => statusesList.find((status) => incidentSelected.value?.status === status.id),
    set: (option: AppSelectOption) => {
      handleChangeIncidentStatus(option);
    },
  });

  const incidentsFilteredList = computed<IncidentType[]>(() => {
    const normalizedQuery = appStrings.toSearchKey(incidentsQuery.value);

    const filteredListQuery = incidentsStore.incidentsList.filter((incident) =>
      SEARCH_FIELDS.some((field) =>
        appStrings.toSearchKey(incident[field]).includes(normalizedQuery),
      ),
    );

    if (incidentStatusSelected.value.id === 'all') {
      return filteredListQuery;
    }

    return filteredListQuery.filter(
      (incident) => incident.status === incidentStatusSelected.value.id,
    );
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

    result.sort((a, b) => appDates.toTimestamp(b.updatedAt) - appDates.toTimestamp(a.updatedAt));
    return result;
  });

  const incidentsDashboardView = computed(() => {
    if (incidentsStore.isIncidentsLoading) return 'loading';
    if (incidentsStore.incidentsError) return 'error';
    if (incidentsFilteredSortedList.value.length === 0) return 'empty';
    return 'list';
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

  async function handleChangeIncidentStatus(incident: AppSelectOption) {
    const incidentSelectedId = incidentSelected.value?.id;

    if (!incidentSelectedId) {
      return;
    }

    await incidentsStore.updateIncidentStatus(incidentSelectedId, incident.id as IncidentStatus);
  }

  return {
    incidentsQuery,
    incidentSelected,
    incidentStatusSelected,
    incidentSortingSelected,
    incidentsStatusesOptionsList,
    incidentsSortingOptionsList,
    incidentsFilteredSortedList,
    incidentsDashboardView,
    currentIncidentSelectedOption,
    handleSelectIncident,
    handleResetSelectedIncident,
    handleIncidentsStatusSelect,
    handleIncidentsSortingSelect,
    handleChangeIncidentStatus,
  };
});
