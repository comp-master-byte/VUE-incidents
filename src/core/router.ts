import { createRouter, createWebHistory } from 'vue-router';
import { IncidentsPage } from '@/modules/incidents';
import { AnaliticsPage } from '@/modules/analitics';

const routes = [
  { path: '/', component: IncidentsPage },
  { path: '/analitics', component: AnaliticsPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
