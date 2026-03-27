import type { LanguageCode } from '@/src/types/language';

/**
 * Map device locale tags to supported LanguageCode.
 * Japan-first: unknown Asian locales often map to ja as a soft default suggestion only.
 */
export function mapDeviceLocaleToLanguageCode(localeTag: string | undefined): LanguageCode {
  if (!localeTag) return 'ja';

  const lower = localeTag.toLowerCase().replace(/_/g, '-');

  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('ko')) return 'ko';
  if (lower === 'pt-br' || lower.startsWith('pt-br')) return 'pt-BR';
  if (lower.startsWith('pt')) return 'pt-BR';
  if (lower.startsWith('es')) return 'es';
  if (
    lower === 'zh-hans' ||
    lower === 'zh-cn' ||
    lower === 'zh-sg' ||
    lower.startsWith('zh-hans')
  ) {
    return 'zh-Hans';
  }
  if (lower.startsWith('zh')) return 'zh-Hans';
  if (lower.startsWith('en')) return 'en';

  return 'ja';
}
