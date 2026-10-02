import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usersService } from '../services/UsersService';
import type { User, UsersDict } from '@/shared/domain';
import { DEFAULT_USER_ID } from '@/shared/consts';

export const useUsersStore = defineStore('users-store', () => {
  const users = ref<UsersDict>({});
  const currentUser = ref<User>();

  async function getAllUsers() {
    try {
      const response = await usersService.getAllUsers();
      users.value = response;
      currentUser.value = response[DEFAULT_USER_ID];
    } catch {}
  }

  return { users, currentUser, getAllUsers };
});
