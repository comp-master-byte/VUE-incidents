import type {
  IncidentPriority,
  IncidentsDict,
  IncidentStatus,
  IncidentType,
} from '@/shared/domain';
import { incidentsResponseMapping } from './incidentsApiMapping';
import { INCIDENTS_STORAGE_KEY } from '@/shared/storageKeys';
import { INCIDENTS } from './incidentsStorage';

export type IncidentServerType = {
  id: string;
  title: string;
  service: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  updatedAt: string;
  assignee: string;
  description: string;
};

class IncidentsService {
  init() {
    const incidentsDB = localStorage.getItem(INCIDENTS_STORAGE_KEY);

    if (!incidentsDB) {
      localStorage.setItem(INCIDENTS_STORAGE_KEY, JSON.stringify(INCIDENTS));
      return;
    }
  }

  async fetchAllIncidents(): Promise<IncidentsDict> {
    const promise = new Promise<IncidentServerType[]>((resolve) => {
      setTimeout(() => {
        const incidentsDB: IncidentServerType[] = JSON.parse(
          localStorage.getItem(INCIDENTS_STORAGE_KEY) as string,
        );
        resolve(incidentsDB);
      }, 1000);
    });

    return promise.then((response) => {
      const mappedResponse = incidentsResponseMapping(response);
      return mappedResponse;
    });
  }

  async updateIncidentStatus(incident: IncidentType) {
    return new Promise<IncidentType>((resolve, reject) => {
      setTimeout(() => {
        /**
         * Для реализации uptimstic update.
         * Сделаем, чтобы иногда сервер не менял состояние и возвращал ошибку например,
         * и мы на клиенте возвращаем старое состояние
         * */
        const randomId = Math.random() * 100;
        if (randomId > 10) {
          const incidentsDB: IncidentServerType[] = JSON.parse(
            localStorage.getItem(INCIDENTS_STORAGE_KEY) as string,
          );

          const updatedIncidentsDB = incidentsDB.map((incidentItem) => {
            return incidentItem.id === incident.id ? incident : incidentItem;
          });

          localStorage.setItem(INCIDENTS_STORAGE_KEY, JSON.stringify(updatedIncidentsDB));

          resolve(incident);
        } else {
          reject();
        }
      }, 300);
    });
  }
}

export const incidentsService = new IncidentsService();
