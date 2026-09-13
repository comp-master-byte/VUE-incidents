<script setup></script>
<template>
  <section class="incidents-dashboard">
    <header class="incidents-table__row incidents-dashboard__header">
      <p class="incidents-dashboard__header-title">Инцидент</p>
      <p class="incidents-dashboard__header-title">Сервис</p>
      <p class="incidents-dashboard__header-title">Приоритет</p>
      <p class="incidents-dashboard__header-title">Статус</p>
      <p class="incidents-dashboard__header-title">Обновлен</p>
    </header>
    <div class="incidents-table__row">
      <div>
        <p>Рост 5xx ошибок в API оформления</p>
        <p>INC-1001</p>
      </div>
      <div>
        <p>Оформление</p>
      </div>
      <div>
        <p>Критичный</p>
      </div>
      <div>
        <p>В работе</p>
      </div>
      <div>
        <p>13.09.2026, 19:40</p>
      </div>
    </div>
  </section>
</template>
<style>
.incidents-dashboard {
  background-color: #fff;
  border-radius: 18px;
  padding: 16px;
}

.incidents-table__row {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr 0.5fr;
  align-items: center;
}
</style>
