<script setup lang="ts">
import { onMounted } from 'vue';
import IncidentsDashboardDetails from './IncidentsDashboardDetails.vue';
import { AppEmptySearchStub } from '@/shared/components/common';
import { AppLoader, AppTag } from '@/shared/components/ui';
import { useIncidentsStore } from '../../store/';
import { PRIORITIES, PRIORITY_TAG_COLORS, STATUSES, STATUS_TAG_COLORS } from '@/shared/consts';

const incidentsStore = useIncidentsStore();

onMounted(() => {
  incidentsStore.initIncidentsList();
});
</script>
<template>
  <section
    :class="{ 'incidents-dashboard__full': !incidentsStore.incidentSelected }"
    class="incidents-dashboard"
  >
    <div class="white-wrapper incidents-dashboard__content">
      <header class="incidents-table__row incidents-dashboard__header">
        <p class="incidents-dashboard__header-title">Инцидент</p>
        <p class="incidents-dashboard__header-title">Сервис</p>
        <p class="incidents-dashboard__header-title">Приоритет</p>
        <p class="incidents-dashboard__header-title">Статус</p>
        <p class="incidents-dashboard__header-title">Обновлен</p>
      </header>

      <div class="border"></div>

      <AppLoader v-if="incidentsStore.isIncidentsLoading" />
      <AppEmptySearchStub
        v-if="
          incidentsStore.incidentsFilteredSortedList.length === 0 &&
          !incidentsStore.isIncidentsLoading
        "
      />

      <div
        class="incidents-table__list"
        v-if="
          incidentsStore.incidentsFilteredSortedList.length > 0 &&
          !incidentsStore.isIncidentsLoading
        "
      >
        <div
          v-for="incident in incidentsStore.incidentsFilteredSortedList"
          :key="incident.id"
          class="incidents-table__row incidents-list__item"
          :class="{
            'incidents-list__item-selected': incident.id === incidentsStore.incidentSelected?.id,
          }"
          @click="incidentsStore.handleSelectIncident(incident)"
        >
          <div>
            <strong>{{ incident.title }}</strong>
            <p>{{ incident.id }}</p>
          </div>
          <div>
            <p>{{ incident.service }}</p>
          </div>
          <div>
            <AppTag
              :label="PRIORITIES[incident.priority]"
              :background-color="PRIORITY_TAG_COLORS[incident.priority].backgroundColor"
              :text-color="PRIORITY_TAG_COLORS[incident.priority].textColor"
            />
          </div>
          <div>
            <AppTag
              :label="STATUSES[incident.status]"
              :background-color="STATUS_TAG_COLORS[incident.status].backgroundColor"
              :text-color="STATUS_TAG_COLORS[incident.status].textColor"
            />
          </div>
          <div>
            <p>{{ incident.updatedAt }}</p>
          </div>
        </div>
      </div>
    </div>

    <IncidentsDashboardDetails v-if="incidentsStore.incidentSelected" />
  </section>
</template>
<style scoped>
.incidents-dashboard {
  display: grid;
  grid-template-columns: 4fr 2fr;
  column-gap: 20px;
}

.incidents-dashboard__content {
  height: fit-content;
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
