import { createMemoryHistory, createRouter } from 'vue-router'
import { IncidentsPage } from '@/modules'

const routes = [{ path: '/', component: IncidentsPage }]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
