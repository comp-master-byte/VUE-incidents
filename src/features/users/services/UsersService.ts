import { USERS_DB } from '@/shared/db/usersDB';
import type { User, UserId, UsersDict, UserServerType } from '@/shared/domain';
import { USERS_STORAGE_KEY } from '@/shared/storageKeys';
import { mappingUsersAllResponse } from './usersApiMapping';

class UsersService {
  init() {
    const usersDB = localStorage.getItem(USERS_STORAGE_KEY);

    if (!usersDB) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(USERS_DB));
    }
  }

  getAllUsers() {
    return new Promise<UsersDict>((resolve, reject) => {
      setTimeout(() => {
        const usersDB = localStorage.getItem(USERS_STORAGE_KEY);

        if (!usersDB) {
          return reject('Пользователи не найдены в базе!');
        }

        const parsedUsersDB: UserServerType[] = JSON.parse(usersDB);
        const mappedResponse = mappingUsersAllResponse(parsedUsersDB);
        return resolve(mappedResponse);
      }, 200);
    });
  }

  getOneUser(userId: UserId) {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const usersDB = localStorage.getItem(USERS_STORAGE_KEY);

        if (!usersDB) {
          return reject('Пользователи не найдены в базе!');
        }

        const parsedUsersDB: UserServerType[] = JSON.parse(usersDB);
        const foundUser = parsedUsersDB.find((user) => user.id === userId);

        if (!foundUser) {
          return reject(`Пользователь с таким id=${userId} не найден`);
        }

        return resolve(foundUser);
      }, 200);
    });
  }
}

export const usersService = new UsersService();
