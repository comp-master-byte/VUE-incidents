<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
  <header class="app-header">
    <nav class="app-header__nav">
      <RouterLink class="app-header__link" to="/">Дашборд инцидентов</RouterLink>
      <RouterLink class="app-header__link" to="/analytics">Аналитика</RouterLink>
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
  box-shadow:
    0 1px 0 rgba(15, 23, 42, 0.06),
    0 4px 12px rgba(15, 23, 42, 0.06);
}

.app-header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 24px;
  height: 100%;
}

.app-header__link {
  color: var(--color-text-secondary);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  transition: color 0.15s ease;
}

.app-header__link:hover {
  /* или color-mix(in srgb, var(--color-accent) 65%, white); */
  color: var(--color-text-primary);
}

.app-header__link.router-link-exact-active {
  color: var(--color-accent);
}
</style>
