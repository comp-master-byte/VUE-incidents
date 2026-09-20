<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
  <header class="app-header">
    <nav class="app-header__nav">
      <RouterLink to="/">Дашборд инцидентов</RouterLink>
      <RouterLink to="/analitics">Аналитика</RouterLink>
    </nav>
  </header>
</template>
<style scoped>
.app-header {
  width: 100%;
  height: 50px;
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  z-index: 2;
}

.app-header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  height: 100%;
}
</style>
