<script setup lang="ts">
import { AppModal } from '@/shared/components/ui';
import { useIncidentsCreateModalStore } from '../store/useIncidentsCreateModalStore';

const incidentsCreateModalStore = useIncidentsCreateModalStore();
</script>
<template>
  <AppModal v-model="incidentsCreateModalStore.createModalValue">
    <h1>Создать инцидент</h1>
  </AppModal>
</template>
<style scoped></style>
