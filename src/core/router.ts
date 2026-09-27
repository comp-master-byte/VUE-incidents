import { IncidentsAnalyticsPage } from '@/modules/incidents-analytics';
import { IncidentsDashboardPage } from '@/modules/incidents-dashboard';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: IncidentsDashboardPage },
  { path: '/analytics', component: IncidentsAnalyticsPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
