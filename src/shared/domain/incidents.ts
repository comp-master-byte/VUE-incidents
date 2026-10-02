import type { AppSelectOption } from './ui/appSelect';
import type { UserId } from './users';

export type IncidentId = string;
export type IncidentType = {
  id: string;
  title: string;
  service: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  updatedAt: string;
  assigneeId: UserId;
  description: string;
};
export type IncidentCreateType = {
  id: string;
  title: string;
  updatedAt: string;
  description: string;
  status: AppSelectOption | null;
  service: AppSelectOption | null;
  priority: AppSelectOption | null;
  assignee: AppSelectOption | null;
};

export type IncidentsDict = Record<IncidentId, IncidentType>;

export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'in-progress' | 'investigating' | 'monitoring' | 'new' | 'solved';
