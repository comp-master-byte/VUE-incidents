<script setup lang="ts">
import { computed, onMounted, provide } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { AppLoader, AppTag } from '@/shared/components/ui';
import { PRIORITIES, PRIORITY_TAG_COLORS } from '@/shared/consts';
import { useIncidentsStore } from '@/modules/incidents/store';
import { formatIncidentDate } from '@/modules/incidents/components/helpers/parseIncidentDate';
import { useIncidentsAnalytics } from './composables/useIncidentsAnalytics';

use([CanvasRenderer, PieChart, BarChart, GridComponent, TooltipComponent, LegendComponent]);

provide(THEME_KEY, 'light');

const incidentsStore = useIncidentsStore();
const incidentsList = computed(() => incidentsStore.incidentsList);

const { summary, recentCriticalHigh, statusChartOption, priorityChartOption, servicesChartOption } =
  useIncidentsAnalytics(incidentsList);

onMounted(() => {
  incidentsStore.initIncidentsList();
});
</script>

<template>
  <div class="analytics-page">
    <header class="analytics-page__header">
      <h3 class="app-h3">Аналитика инцидентов</h3>
      <p class="app-subtitle">
        Сводка по статусам, приоритетам и сервисам на основе текущей очереди.
      </p>
    </header>

    <AppLoader v-if="incidentsStore.isIncidentsLoading" label="Считаем метрики..." />

    <template v-else>
      <section class="analytics-summary">
        <article class="analytics-summary__card white-wrapper">
          <span class="analytics-summary__label">Всего</span>
          <strong class="analytics-summary__value">{{ summary.total }}</strong>
        </article>
        <article class="analytics-summary__card white-wrapper">
          <span class="analytics-summary__label">Открытые</span>
          <strong class="analytics-summary__value">{{ summary.open }}</strong>
        </article>
        <article class="analytics-summary__card white-wrapper">
          <span class="analytics-summary__label">Critical</span>
          <strong class="analytics-summary__value analytics-summary__value--danger">
            {{ summary.critical }}
          </strong>
        </article>
        <article class="analytics-summary__card white-wrapper">
          <span class="analytics-summary__label">Решены</span>
          <strong class="analytics-summary__value analytics-summary__value--success">
            {{ summary.solved }}
          </strong>
        </article>
      </section>

      <section class="analytics-grid">
        <article class="analytics-panel white-wrapper">
          <h4 class="analytics-panel__title">По статусам</h4>
          <VChart class="analytics-panel__chart" :option="statusChartOption" autoresize />
        </article>

        <article class="analytics-panel white-wrapper">
          <h4 class="analytics-panel__title">По приоритетам</h4>
          <VChart class="analytics-panel__chart" :option="priorityChartOption" autoresize />
        </article>

        <article class="analytics-panel analytics-panel--wide white-wrapper">
          <h4 class="analytics-panel__title">Топ сервисов</h4>
          <VChart
            class="analytics-panel__chart analytics-panel__chart--bar"
            :option="servicesChartOption"
            autoresize
          />
        </article>

        <article class="analytics-panel analytics-panel--wide analytics-panel--list white-wrapper">
          <h4 class="analytics-panel__title">Последние critical / high</h4>
          <ul v-if="recentCriticalHigh.length" class="analytics-recent">
            <li
              v-for="incident in recentCriticalHigh"
              :key="incident.id"
              class="analytics-recent__item"
            >
              <div class="analytics-recent__main">
                <span class="analytics-recent__id">{{ incident.id }}</span>
                <strong class="analytics-recent__title">{{ incident.title }}</strong>
                <span class="analytics-recent__meta">
                  {{ incident.service }} · {{ formatIncidentDate(incident.updatedAt) }}
                </span>
              </div>
              <AppTag
                :label="PRIORITIES[incident.priority]"
                :background-color="PRIORITY_TAG_COLORS[incident.priority].backgroundColor"
                :text-color="PRIORITY_TAG_COLORS[incident.priority].textColor"
              />
            </li>
          </ul>
          <p v-else class="analytics-recent__empty">Нет critical/high инцидентов</p>
        </article>
      </section>
    </template>
  </div>
</template>

<style scoped>
.analytics-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
}

.analytics-page__header {
  margin-bottom: 4px;
}

.app-h3 {
  margin-bottom: 8px;
}

.analytics-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.analytics-summary__card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  padding: 18px 20px;
}

.analytics-summary__label {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.analytics-summary__value {
  color: var(--color-text-primary);
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.analytics-summary__value--danger {
  color: var(--color-error);
}

.analytics-summary__value--success {
  color: #15803d;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.analytics-panel {
  min-width: 0;
  padding: 20px;
  min-height: 380px;
}

.analytics-panel--wide {
  grid-column: 1 / -1;
}

.analytics-panel--list {
  min-height: 0;
}

.analytics-panel__title {
  margin: 0 0 12px;
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: 700;
}

.analytics-panel__chart {
  width: 100%;
  height: 340px;
  min-width: 0;
}

.analytics-panel__chart--bar {
  height: 340px;
}

.analytics-recent {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.analytics-recent__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 14px;
  background-color: var(--color-surface-muted);
}

.analytics-recent__main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.analytics-recent__id {
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 700;
}

.analytics-recent__title {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.analytics-recent__meta {
  color: var(--color-text-secondary);
  font-size: 12px;
}

.analytics-recent__empty {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

/* Планшет / узкий ноутбук */
@media (max-width: 900px) {
  .analytics-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .analytics-grid {
    grid-template-columns: 1fr;
  }

  .analytics-panel--wide {
    grid-column: auto;
  }

  .analytics-panel {
    min-height: 0;
    padding: 16px;
  }

  .analytics-panel__chart {
    height: 240px;
  }

  .analytics-panel__chart--bar {
    height: 280px;
  }
}

/* Телефон */
@media (max-width: 640px) {
  .analytics-page {
    gap: 12px;
  }

  .app-h3 {
    font-size: 22px;
    margin-bottom: 6px;
  }

  .app-subtitle {
    font-size: 13px;
    line-height: 1.45;
  }

  .analytics-summary {
    gap: 8px;
  }

  .analytics-summary__card {
    padding: 14px 16px;
  }

  .analytics-summary__label {
    font-size: 11px;
  }

  .analytics-summary__value {
    font-size: 24px;
  }

  .analytics-grid {
    gap: 10px;
  }

  .analytics-panel {
    padding: 14px;
  }

  .analytics-panel__title {
    margin-bottom: 8px;
    font-size: 15px;
  }

  .analytics-panel__chart {
    height: 220px;
  }

  .analytics-panel__chart--bar {
    height: 260px;
  }

  .analytics-recent__item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
  }
}
</style>
