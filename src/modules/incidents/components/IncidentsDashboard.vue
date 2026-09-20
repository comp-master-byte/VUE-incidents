<script setup lang="ts">
import { onMounted } from 'vue';
import IncidentsDashboardDetails from './IncidentsDashboardDetails.vue';
import { AppEmptySearchStub, AppErrorStub } from '@/shared/components/common';
import { AppLoader } from '@/shared/components/ui';
import IncidentsDashboardList from './IncidentsDashboardList.vue';
import { useIncidentsStore } from '../store/useIncidentsStore.ts';

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

      <AppLoader v-if="incidentsStore.dashboardView === 'loading'" />
      <AppErrorStub v-else-if="incidentsStore.dashboardView === 'error'" />
      <AppEmptySearchStub v-else-if="incidentsStore.dashboardView === 'empty'" />
      <IncidentsDashboardList v-else />
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
</style>
