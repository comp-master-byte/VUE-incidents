<script setup lang="ts">
import { AppModal } from '@/shared/components/ui';
import { useIncidentsCreateModalStore } from '../store/useIncidentsCreateModalStore';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const incidentsCreateModalStore = useIncidentsCreateModalStore();

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
  }),
});

const { value: title } = useField('title');
const { value: description } = useField('description');

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>
<template>
  <AppModal v-model="incidentsCreateModalStore.createModalValue">
    <h1>Создать инцидент</h1>
    <form @submit="onSubmit">
      <input v-model="title" placeholder="Название инцидента..." />
      <input v-model="description" placeholder="Описание инцидента..." />
      <button type="submit">Создать</button>
    </form>
  </AppModal>
</template>
<style scoped></style>
