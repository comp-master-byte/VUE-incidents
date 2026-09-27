class AppStrings {
  toSearchKey(value: string) {
    return value.toLowerCase().trim().replace(/\s+/g, '');
  }
}

export const appStrings = new AppStrings();
