import type { LanguageCode } from '@/src/types/language';

/**
 * Map device locale tags to supported LanguageCode.
 * Japan-first: unknown Asian locales often map to ja as a soft default suggestion only.
 */
export function mapDeviceLocaleToLanguageCode(localeTag: string | undefined): LanguageCode {
  if (!localeTag) return 'ja';

  const lower = localeTag.toLowerCase().replace(/_/g, '-');

  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('en')) return 'en';

  return 'ja';
}
