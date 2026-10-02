<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUsersStore } from '@/features/users';

const usersStore = useUsersStore();
</script>
<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <div></div>

      <nav class="app-header__nav">
        <RouterLink class="app-header__link" to="/">Дашборд инцидентов</RouterLink>
        <RouterLink class="app-header__link" to="/analytics">Аналитика</RouterLink>
      </nav>

      <div v-if="usersStore.currentUser" class="app-header__user">
        <span class="app-header__user-label">Вы вошли как</span>
        <strong class="app-header__user-name">{{ usersStore.currentUser.name }}</strong>
      </div>
    </div>
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

.app-header__inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 100%;
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

.app-header__user {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}

.app-header__user-label {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
}

.app-header__user-name {
  color: var(--color-text-primary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .app-header {
    height: auto;
    min-height: 50px;
  }

  .app-header__inner {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .app-header__inner > div:empty {
    display: none;
  }

  .app-header__nav {
    column-gap: 16px;
  }

  .app-header__user {
    justify-self: center;
  }
}
</style>
