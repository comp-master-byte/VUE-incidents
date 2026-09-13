<script setup></script>
<template>
  <div class="incidents-header">
    <div class="incidents-header__preview">
      <h3 class="app-h3">Дашборд инцидентов</h3>
      <p class="app-subtitle">
        Очередь инцидентов с поиском, фильтрами, сортировкой, панелью деталей, optimistic update и
      </p>
      <p class="app-subtitle">защитой от устаревших ответов API.</p>
    </div>
    <button class="app-button">Обновить</button>
  </div>
</template>
<style scoped>
.incidents-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-top: 50px;
}
.app-h3 {
  margin-bottom: 12px;
}
</style>
