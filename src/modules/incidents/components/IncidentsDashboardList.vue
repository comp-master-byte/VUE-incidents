<script setup lang="ts">
import { PRIORITIES, PRIORITY_TAG_COLORS, STATUSES, STATUS_TAG_COLORS } from '@/shared/consts';
import { AppTag } from '@/shared/components/ui';
import { useIncidentsStore } from '../store';

const incidentsStore = useIncidentsStore();
</script>
<template>
  <div class="incidents-table__list">
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
</template>
<style scoped>
.incidents-table__list {
  display: flex;
  flex-direction: column;
}

.incidents-table__row {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr 0.5fr;
  align-items: flex-start;
  padding: 20px;
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
