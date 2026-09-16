/**
 * Чистая функция, которая поможет превратить словарь в список читаемый селектом
 * Ключ - id
 * Значение - label
 */
import type { AppSelectOption } from './AppSelect.vue';

export function getOptionsListFromRecord(dict: Record<string, string>): AppSelectOption[] {
  const optionsList: AppSelectOption[] = [];

  for (let key in dict) {
    optionsList.push({
      id: key,
      label: dict[key] || '',
    });
  }

  return optionsList;
}
