import type { UsersDict, UserServerType } from '@/shared/domain';

export function mappingUsersAllResponse(users: UserServerType[]): UsersDict {
  const result: UsersDict = {};

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (!user) continue;

    result[user.id] = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  return result;
}
