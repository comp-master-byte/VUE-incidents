import { incidentsService } from '@/features/incidents';
import { usersService } from '@/features/users';

class AppService {
  constructor() {}

  public initApp() {
    incidentsService.init();
    usersService.init();
  }
}

export const appService = new AppService();
