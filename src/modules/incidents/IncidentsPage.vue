<script setup lang="ts">
import IncidentsCreateModal from './components/IncidentsCreateModal.vue';
import IncidentsDashboard from './components/IncidentsDashboard.vue';
import IncidentsFilters from './components/IncidentsFilters.vue';
import IncidentsHeader from './components/IncidentsHeader.vue';
</script>
<template>
  <IncidentsHeader />
  <IncidentsFilters />
  <IncidentsDashboard />
  <IncidentsCreateModal />
</template>
<style></style>
