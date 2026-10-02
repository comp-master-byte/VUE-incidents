import { describe, expect, it } from 'vitest';
import { appDates } from './AppDates';

describe('appDates', () => {
  it('возвращает timestamp для валидной даты', () => {
    expect(appDates.toTimestamp('2026-09-13T16:40:00.000Z')).toBe(
      new Date('2026-09-13T16:40:00.000Z').getTime(),
    );
  });

  it('возвращает 0 для невалидной даты', () => {
    expect(appDates.toTimestamp('not-a-date')).toBe(0);
  });

  it('возвращает исходную строку если дата невалидна', () => {
    expect(appDates.toDisplayDateTime('not-a-date')).toBe('not-a-date');
  });
});
