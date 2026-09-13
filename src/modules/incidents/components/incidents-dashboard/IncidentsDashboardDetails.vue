<script setup lang="ts">
import type { IncidentType } from '@/shared/domain';

const props = defineProps<{ incidentSelected: IncidentType | null }>();
</script>
<template>
  <section class="incidents-details__wrapper white-wrapper">
    <h3>{{ props.incidentSelected?.title }}</h3>
  </section>
</template>
<style>
.incidents-details__wrapper {
}
</style>
