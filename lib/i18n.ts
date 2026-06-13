export type Locale = "ko" | "en";

const SUPPORTED_LOCALES: readonly Locale[] = ["ko", "en"] as const;

export const DEFAULT_LOCALE: Locale = "ko";

export function isValidLocale(locale: string): locale is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}
