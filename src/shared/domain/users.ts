export type UserId = string;
export type User = {
  id: UserId;
  name: string;
  role: string;
};

export type UsersDict = Record<UserId, User>;
