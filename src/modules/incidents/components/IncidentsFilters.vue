<script setup lang="ts">
import { ref } from 'vue';
import { AppSelect, getOptionsListFromRecord } from '@/shared/components/ui';
import type { AppSelectOption } from '@/shared/components/ui';
import { STATUSES } from '@/shared/consts';

const INCIDENTS_STATUSES = {
  all: 'Все статусы',
  ...STATUSES,
};

const INCIDENTS_SORTING = {
  date: 'По обновлению',
  priority: 'По приоритету',
};

const query = defineModel('query', { default: '' });

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
</script>
<template>
  <section class="incidents-filter__wrapper">
    <AppSelect
      label="Статус"
      :options="incidentsStatusesOptionsList"
      :selected-option="incidentStatusSelected"
      @select-option="handleIncidentsStatusSelect"
    />

    <div class="app-input-field">
      <label class="app-input-label" for="incidents-search">Поиск</label>
      <input
        v-model="query"
        id="incidents-search"
        type="text"
        class="app-input"
        placeholder="Поиск по заголовку или сервису"
      />
    </div>

    <AppSelect
      label="Сортировка"
      :options="incidentsSortingOptionsList"
      :selected-option="incidentSortingSelected"
      @select-option="handleIncidentsSortingSelect"
    />
  </section>
</template>
<style scoped>
.incidents-filter__wrapper {
  display: flex;
  column-gap: 8px;
  margin-bottom: 12px;
}
.app-input-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.app-input-label {
  width: fit-content;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}
.app-input {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background-color: var(--color-white);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.app-input::placeholder {
  color: #94a3b8;
}
.app-input:hover {
  border-color: #cbd5e1;
}
.app-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(93, 95, 239, 0.15);
}
</style>
