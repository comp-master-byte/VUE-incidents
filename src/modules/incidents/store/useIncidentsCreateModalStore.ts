import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useIncidentsCreateModalStore = defineStore('incidents-create-modal', () => {
  const createModalValue = ref(false);

  function handleOpenCreateModal() {
    createModalValue.value = true;
  }

  function handleCloseCreateModal() {
    createModalValue.value = false;
  }

  return {
    createModalValue,
    handleOpenCreateModal,
    handleCloseCreateModal,
  };
});
