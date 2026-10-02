import { describe, expect, it } from 'vitest';
import { incidentsResponseMapping } from './incidentsApiMapping';
import type { IncidentServerType } from './IncidentsService';

describe('incidentsResponseMapping', () => {
  it('мапит массив инцидентов в словарь по id', () => {
    const response: IncidentServerType[] = [
      {
        id: 'INC-1001',
        title: 'Test incident',
        service: 'Payments',
        priority: 'high',
        status: 'new',
        updatedAt: '2026-09-13T16:40:00.000Z',
        assigneeId: 'vip-admin',
        description: 'Description',
      },
    ];

    const result = incidentsResponseMapping(response);

    expect(result['INC-1001']).toEqual({
      id: 'INC-1001',
      title: 'Test incident',
      service: 'Payments',
      priority: 'high',
      status: 'new',
      updatedAt: '2026-09-13T16:40:00.000Z',
      assigneeId: 'vip-admin',
      description: 'Description',
    });
  });
});
