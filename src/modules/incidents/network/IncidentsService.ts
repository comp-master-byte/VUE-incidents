import type { IncidentPriority, IncidentsDict, IncidentStatus } from '@/shared/domain';
import { incidentsResponseMapping } from './IncidentsApiMapping';

export type IncidentServerType = {
  id: string;
  title: string;
  service: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  updatedAt: string;
};

class IncidentsService {
  private INCIDENTS: IncidentServerType[] = [
    {
      id: 'INC-1001',
      title: 'Рост 5xx ошибок в API оформления',
      service: 'Оформление',
      priority: 'critical',
      status: 'in-progress',
      updatedAt: '13.09.2026, 19:40',
    },
    {
      id: 'INC-1002',
      title: 'Таймауты при оплате банковскими картами',
      service: 'Платежи',
      priority: 'high',
      status: 'investigating',
      updatedAt: '13.09.2026, 18:55',
    },
    {
      id: 'INC-1003',
      title: 'Недоступность личного кабинета пользователей',
      service: 'Аккаунты',
      priority: 'critical',
      status: 'in-progress',
      updatedAt: '13.09.2026, 17:20',
    },
    {
      id: 'INC-1004',
      title: 'Задержка доставки уведомлений в мобильном приложении',
      service: 'Уведомления',
      priority: 'medium',
      status: 'monitoring',
      updatedAt: '13.09.2026, 16:05',
    },
    {
      id: 'INC-1005',
      title: 'Ошибки авторизации через SSO',
      service: 'Аутентификация',
      priority: 'high',
      status: 'in-progress',
      updatedAt: '13.09.2026, 15:42',
    },
    {
      id: 'INC-1006',
      title: 'Повышенная latency в поиске по каталогу',
      service: 'Поиск',
      priority: 'medium',
      status: 'investigating',
      updatedAt: '13.09.2026, 14:18',
    },
    {
      id: 'INC-1007',
      title: 'Сбой синхронизации остатков на складе',
      service: 'Склад',
      priority: 'high',
      status: 'in-progress',
      updatedAt: '13.09.2026, 13:30',
    },
    {
      id: 'INC-1008',
      title: 'Некорректный расчёт скидок в корзине',
      service: 'Корзина',
      priority: 'low',
      status: 'open',
      updatedAt: '12.09.2026, 22:10',
    },
    {
      id: 'INC-1009',
      title: 'Частичная деградация CDN для статики',
      service: 'CDN',
      priority: 'medium',
      status: 'monitoring',
      updatedAt: '12.09.2026, 20:45',
    },
    {
      id: 'INC-1010',
      title: 'Ошибки записи метрик в систему мониторинга',
      service: 'Observability',
      priority: 'low',
      status: 'solved',
      updatedAt: '12.09.2026, 11:05',
    },
  ];

  async fetchAllIncidents(): Promise<IncidentsDict> {
    const promise = new Promise<IncidentServerType[]>((resolve) => {
      setTimeout(() => {
        resolve(this.INCIDENTS);
      }, 1000);
    });

    return promise.then((response) => {
      const mappedResponse = incidentsResponseMapping(response);
      return mappedResponse;
    });
  }
}

export const incidentsService = new IncidentsService();
