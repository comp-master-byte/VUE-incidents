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
      <div class="incidents-list__main">
        <strong>{{ incident.title }}</strong>
        <p>{{ incident.id }}</p>
      </div>
      <div class="incidents-list__service" data-label="Сервис">
        <p>{{ incident.service }}</p>
      </div>
      <div class="incidents-list__priority" data-label="Приоритет">
        <AppTag
          :label="PRIORITIES[incident.priority]"
          :background-color="PRIORITY_TAG_COLORS[incident.priority].backgroundColor"
          :text-color="PRIORITY_TAG_COLORS[incident.priority].textColor"
        />
      </div>
      <div class="incidents-list__status" data-label="Статус">
        <AppTag
          :label="STATUSES[incident.status]"
          :background-color="STATUS_TAG_COLORS[incident.status].backgroundColor"
          :text-color="STATUS_TAG_COLORS[incident.status].textColor"
        />
      </div>
      <div class="incidents-list__updated" data-label="Обновлен">
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

@media (max-width: 900px) {
  .incidents-table__row {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid var(--color-primary);
  }

  .incidents-list__item:last-child {
    border-bottom: none;
  }

  .incidents-list__main {
    grid-column: 1 / -1;
  }

  .incidents-list__main strong {
    display: block;
    margin-bottom: 4px;
    font-size: 15px;
    line-height: 1.35;
  }

  .incidents-list__main p {
    color: var(--color-text-secondary);
    font-size: 13px;
  }

  .incidents-list__service,
  .incidents-list__priority,
  .incidents-list__status,
  .incidents-list__updated {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .incidents-list__service::before,
  .incidents-list__priority::before,
  .incidents-list__status::before,
  .incidents-list__updated::before {
    content: attr(data-label);
    color: var(--color-text-secondary);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .incidents-list__updated {
    grid-column: 1 / -1;
  }
}
</style>
