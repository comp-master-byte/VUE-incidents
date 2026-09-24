import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useIncidentsCreateModalStore = defineStore('incidents-create-modal', () => {
  const createModalValue = ref(false);

  function handleOpenCreateModal() {
    createModalValue.value = true;
  }

  return {
    createModalValue,
    handleOpenCreateModal,
  };
});
