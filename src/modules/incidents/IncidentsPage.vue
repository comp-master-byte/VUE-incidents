<script setup lang="ts">
import { ref } from 'vue';
import IncidentsDashboard from './components/incidents-dashboard/IncidentsDashboard.vue';
import IncidentsFilters from './components/IncidentsFilters.vue';
import IncidentsHeader from './components/IncidentsHeader.vue';

const incidentsQuery = ref('');
</script>
<template>
  <IncidentsHeader />
  <IncidentsFilters v-model:query="incidentsQuery" />
  <IncidentsDashboard />
</template>
<style></style>
