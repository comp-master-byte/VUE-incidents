export type IncidentId = string;
export type IncidentType = {
  id: string;
  title: string;
  service: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  updatedAt: string;
  assignee: string;
  description: string;
};

export type IncidentsDict = Record<IncidentId, IncidentType>;

export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'in-progress' | 'investigating' | 'monitoring' | 'new' | 'solved';
