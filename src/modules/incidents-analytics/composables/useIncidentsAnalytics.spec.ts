import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import type { IncidentType } from '@/shared/domain';
import { useIncidentsAnalytics } from './useIncidentsAnalytics';

const incidentsFixture: IncidentType[] = [
  {
    id: 'INC-1',
    title: 'Critical open',
    service: 'Payments',
    priority: 'critical',
    status: 'in-progress',
    updatedAt: '2026-09-13T16:40:00.000Z',
    assigneeId: 'vip-admin',
    description: 'A',
  },
  {
    id: 'INC-2',
    title: 'Solved low',
    service: 'Search',
    priority: 'low',
    status: 'solved',
    updatedAt: '2026-09-12T08:05:00.000Z',
    assigneeId: 'ivan-kuznetsov',
    description: 'B',
  },
  {
    id: 'INC-3',
    title: 'High open',
    service: 'Payments',
    priority: 'high',
    status: 'investigating',
    updatedAt: '2026-09-13T15:55:00.000Z',
    assigneeId: 'vip-admin',
    description: 'C',
  },
];

describe('useIncidentsAnalytics', () => {
  it('считает summary', () => {
    const { summary } = useIncidentsAnalytics(ref(incidentsFixture));

    expect(summary.value).toEqual({
      total: 3,
      open: 2,
      critical: 1,
      solved: 1,
    });
  });

  it('ранжирует сервисы по количеству инцидентов', () => {
    const { servicesRanking } = useIncidentsAnalytics(ref(incidentsFixture));

    expect(servicesRanking.value).toEqual([
      { service: 'Payments', count: 2 },
      { service: 'Search', count: 1 },
    ]);
  });

  it('возвращает последние critical/high по дате', () => {
    const { recentCriticalHigh } = useIncidentsAnalytics(ref(incidentsFixture));

    expect(recentCriticalHigh.value.map((incident) => incident.id)).toEqual(['INC-1', 'INC-3']);
  });
});
