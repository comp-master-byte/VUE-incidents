<script setup lang="ts">
import { AppButton, AppInput, AppModal, AppSelect } from '@/shared/components/ui';
import { useIncidentsCreateModalStore } from '../store/useIncidentsCreateModalStore';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { prioritiesList, servicesList, statusesList, usersList } from '@/shared/consts';
import type {
  AppSelectOption,
  IncidentCreateType,
  IncidentPriority,
  IncidentStatus,
  IncidentType,
} from '@/shared/domain';
import { useIncidentsStore } from '@/features/incidents';

const incidentsStore = useIncidentsStore();
const incidentsCreateModalStore = useIncidentsCreateModalStore();

const { handleSubmit, errors } = useForm<IncidentCreateType>({
  validationSchema: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    service: yup
      .object({
        id: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
    priority: yup
      .object({
        id: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
    status: yup
      .object({
        id: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
    assignee: yup
      .object({
        id: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
  }),
  initialValues: {
    title: '',
    description: '',
    service: null,
    priority: null,
    status: null,
    assignee: null,
  },
});

const { value: title } = useField<string>('title');
const { value: description } = useField<string>('description');
const { value: service } = useField<AppSelectOption>('service');
const { value: priority } = useField<AppSelectOption>('priority');
const { value: status } = useField<AppSelectOption>('status');
const { value: assignee } = useField<AppSelectOption>('assignee');

const onSubmit = handleSubmit(async (values) => {
  if (!incidentsStore.incidentsList.length) {
    return;
  }

  const incidentsList = incidentsStore.incidentsList;
  const incidentsLastItem = incidentsList[incidentsList.length - 1];
  const incidentsLastItemId = incidentsLastItem
    ? Number(incidentsLastItem?.id.split('-')[1])
    : 1000;

  const newIncident: IncidentType = {
    id: `INC-${incidentsLastItemId + 1}`,
    title: values.title,
    description: values.description,
    service: values.service!.label,
    priority: values.priority!.id as IncidentPriority,
    status: values.status!.id as IncidentStatus,
    assigneeId: values.assignee!.id,
    updatedAt: new Date().toISOString(),
  };

  await incidentsStore.createIncident(newIncident);
  incidentsCreateModalStore.handleCloseCreateModal();
});
</script>
<template>
  <AppModal v-model="incidentsCreateModalStore.createModalValue">
    <h1>Создать инцидент</h1>
    <form @submit="onSubmit" class="create-modal__form">
      <AppInput
        label="Название"
        id="incident-name"
        placeholder="Название инцидента..."
        v-model="title"
        :error="errors.title"
      />
      <AppInput
        label="Описание"
        id="incident-description"
        placeholder="Описание инцидента..."
        v-model="description"
        :error="errors.description"
      />
      <AppSelect label="Сервис" v-model="service" :options="servicesList" :error="errors.service" />
      <AppSelect
        label="Приоритет"
        v-model="priority"
        :options="prioritiesList"
        :error="errors.priority"
      />
      <AppSelect label="Статус" v-model="status" :options="statusesList" :error="errors.status" />
      <AppSelect
        label="Ответственный"
        v-model="assignee"
        :options="usersList"
        :error="errors.assignee"
      />
      <AppButton type="submit" variant="primary">Создать</AppButton>
    </form>
  </AppModal>
</template>
<style scoped>
.create-modal__form {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-top: 15px;
}
</style>
