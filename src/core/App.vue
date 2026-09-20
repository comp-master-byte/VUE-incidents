<script setup lang="ts">
import { onMounted } from 'vue';
import { appService } from './AppService';
import './css/global.css';
import { RouterView } from 'vue-router';
import { AppHeader } from '@/shared/components/main';

onMounted(() => {
  appService.initApp();
});
</script>
<template>
  <AppHeader />
  <div class="app-wrapper">
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  padding-top: 50px;
}
</style>
