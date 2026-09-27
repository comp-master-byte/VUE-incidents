import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IncidentsDict, IncidentStatus, IncidentType } from '@/shared/domain';
import { incidentsService } from '../services/IncidentsService';

let lastIncidentsRequestId = 0; // Защита от race condition загрузки/обновления списка инцидентов
let incidentsFailureCounter = 0;

export const useIncidentsStore = defineStore('incidents', () => {
  const isIncidentsLoading = ref(false);
  const incidents = ref<IncidentsDict>({});
  const incidentsError = ref('');

  const incidentsList = computed<IncidentType[]>(() => {
    return Object.values(incidents.value);
  });

  async function initIncidentsList() {
    try {
      if (incidentsList.value.length > 0) {
        return;
      }

      isIncidentsLoading.value = true;
      incidents.value = {};
      incidentsError.value = '';

      const response = await incidentsService.fetchAllIncidents();
      incidents.value = response;
    } catch (e) {
      if (e instanceof Error) {
        incidentsError.value = e.message;
        return;
      }
    } finally {
      isIncidentsLoading.value = false;
    }
  }

  async function updateIncidentsList() {
    lastIncidentsRequestId += 1;
    const requestId = lastIncidentsRequestId;

    incidentsFailureCounter += 1;

    try {
      if (incidentsFailureCounter === 10) {
        throw new Error('[ERROR 429]: Исчерпан лимит на кол-во запросов!');
      }

      isIncidentsLoading.value = true;
      incidents.value = {};
      incidentsError.value = '';

      const response = await incidentsService.fetchAllIncidents();

      if (requestId !== lastIncidentsRequestId) {
        return;
      }

      incidents.value = response;
    } catch (e) {
      if (e instanceof Error) {
        incidentsError.value = e.message;
        incidentsFailureCounter = 0;
        return;
      }

      if (requestId !== lastIncidentsRequestId) {
        return;
      }
    } finally {
      if (requestId === lastIncidentsRequestId) {
        isIncidentsLoading.value = false;
      }
    }
  }

  async function updateIncidentStatus(incidentId: string, nextIncidentStatus: IncidentStatus) {
    const currentIncident = incidents.value[incidentId];

    if (!currentIncident) {
      return;
    }

    // Реализация стратегии optimistic update
    const prevIncidentStatus = currentIncident.status;

    currentIncident.status = nextIncidentStatus;

    try {
      await incidentsService.updateIncidentStatus(currentIncident);
    } catch {
      currentIncident.status = prevIncidentStatus;
    }
  }

  async function createIncident(incident: IncidentType) {
    try {
      await incidentsService.createIncidentAsync(incident);
      incidents.value[incident.id] = incident;
    } catch {}
  }

  async function deleteIncident(incidentId?: string) {
    try {
      if (!incidentId) {
        return;
      }

      await incidentsService.deleteIncidentAsync(incidentId);
      delete incidents.value[incidentId];
    } catch {}
  }

  return {
    incidents,
    incidentsList,
    isIncidentsLoading,
    incidentsError,
    createIncident,
    deleteIncident,
    initIncidentsList,
    updateIncidentsList,
    updateIncidentStatus,
  };
});
