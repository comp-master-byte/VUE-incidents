<script setup lang="ts">
import { AppCheckbox, AppInput, AppSelect } from '@/shared/components/ui';
import { useIncidentsDashboardStore } from '../store';

const incidentsDashboardStore = useIncidentsDashboardStore();
</script>
<template>
  <section class="incidents-filter__wrapper">
    <AppSelect
      size="m"
      label="Статус"
      v-model="incidentsDashboardStore.incidentStatusSelected"
      :options="incidentsDashboardStore.incidentsStatusesOptionsList"
    />
    <AppInput
      label="Поиск"
      id="incidents-search"
      placeholder="Поиск по заголовку или сервису"
      v-model="incidentsDashboardStore.incidentsQuery"
    />
    <AppSelect
      size="m"
      label="Сортировка"
      v-model="incidentsDashboardStore.incidentSortingSelected"
      :options="incidentsDashboardStore.incidentsSortingOptionsList"
    />
    <div class="incidents-filter__self">
      <AppCheckbox
        id="incidents-self"
        label="Мои"
        v-model="incidentsDashboardStore.incidentsSelfSelected"
      />
    </div>
  </section>
</template>
<style scoped>
.incidents-filter__wrapper {
  display: flex;
  align-items: flex-end;
  column-gap: 8px;
  margin-bottom: 12px;
}

.incidents-filter__self {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 44px;
  padding: 0 14px;
}

@media (max-width: 900px) {
  .incidents-filter__wrapper {
    flex-direction: column;
    align-items: stretch;
    row-gap: 10px;
  }

  .incidents-filter__wrapper :deep(.app-select),
  .incidents-filter__wrapper :deep(.size-s),
  .incidents-filter__wrapper :deep(.size-m),
  .incidents-filter__wrapper :deep(.size-l) {
    width: 100%;
  }

  .incidents-filter__self {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
