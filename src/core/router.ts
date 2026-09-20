import { createRouter, createWebHistory } from 'vue-router';
import { IncidentsPage } from '@/modules/incidents';
import { AnalyticsPage } from '@/modules/analytics';

const routes = [
  { path: '/', component: IncidentsPage },
  { path: '/analytics', component: AnalyticsPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
