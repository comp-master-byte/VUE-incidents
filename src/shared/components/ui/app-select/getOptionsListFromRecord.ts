import type { AppSelectOption } from '@/shared/domain';

/**
 * Чистая функция, которая поможет превратить словарь в список читаемый селектом
 * Ключ - id
 * Значение - label
 */
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
