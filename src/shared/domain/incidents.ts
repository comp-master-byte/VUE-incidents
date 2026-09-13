export type IncidentId = string;
export type IncidentType = {
  id: string;
  title: string;
  service: string;
  priority: string;
  status: string;
  updatedAt: string;
};

export type IncidentsDict = Record<IncidentId, IncidentType>;

export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'in-progress' | 'investigating' | 'monitoring' | 'open' | 'solved';
