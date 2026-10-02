import { describe, expect, it } from 'vitest';
import { appStrings } from './AppStrings';

describe('appStrings', () => {
  it('нормализует строку для поиска', () => {
    expect(appStrings.toSearchKey('  Hello   World  ')).toBe('helloworld');
  });
});
