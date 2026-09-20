import type { IncidentsDict } from '@/shared/domain';
import type { IncidentServerType } from './IncidentsService';

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
      priority: incident.priority,
      status: incident.status,
      updatedAt: incident.updatedAt,
      assignee: incident.assignee,
      description: incident.description,
    };
  }

  return result;
}
