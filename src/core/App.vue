<script setup lang="ts">
import { onMounted } from 'vue';
import { appService } from './AppService';
import './css/global.css';
import { RouterView } from 'vue-router';

onMounted(() => {
  appService.initApp();
});
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style></style>
