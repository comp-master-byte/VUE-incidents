import type { IncidentPriority, IncidentStatus } from './domain';

export const PRIORITIES: Record<IncidentPriority, string> = {
  critical: 'Критичный',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
};

export const STATUSES: Record<IncidentStatus, string> = {
  'in-progress': 'В работе',
  investigating: 'Расследуется',
  monitoring: 'Мониторинг',
  new: 'Новый',
  solved: 'Решён',
};
