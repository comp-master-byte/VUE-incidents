import type { IncidentPriority, IncidentStatus, IncidentsDict } from '@/shared/domain';
import type { IncidentServerType } from './IncidentsService';

const PRIORITIES: Record<IncidentPriority, string> = {
  critical: 'Критичный',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
};

const STATUSES: Record<IncidentStatus, string> = {
  'in-progress': 'В работе',
  investigating: 'Расследуется',
  monitoring: 'Мониторинг',
  open: 'Открыт',
  solved: 'Решён',
};

export function incidentsResponseMapping(response: IncidentServerType[]): IncidentsDict {
  const result: IncidentsDict = {};

  for (let i = 0; i < response.length; i++) {
    const incident = response[i];

    if (!incident) {
      continue;
    }

    result[incident.id] = {
      id: incident.id,
      title: incident.title,
      service: incident.service,
      priority: incident.priority ? PRIORITIES[incident.priority] : PRIORITIES.low,
      status: incident.status ? STATUSES[incident.status] : STATUSES.open,
      updatedAt: incident.updatedAt,
    };
  }

  return result;
}
