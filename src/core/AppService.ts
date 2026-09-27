import { incidentsService } from '@/features/incidents';

class AppService {
  constructor() {}

  public initApp() {
    incidentsService.init();
  }
}

export const appService = new AppService();
