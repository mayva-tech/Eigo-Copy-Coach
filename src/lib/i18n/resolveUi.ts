import { uiByLanguage, type UiKey } from '@/src/lib/i18n/uiCatalog';
import type { LanguageCode } from '@/src/types/language';

export function tUi(uiLanguage: LanguageCode, key: UiKey): string {
  const primary = uiByLanguage[uiLanguage]?.[key as string];
  const enFallback = uiByLanguage.en[key as string];
  if (typeof primary === 'string' && primary.length > 0) {
    return primary;
  }
  if (typeof enFallback === 'string' && enFallback.length > 0) {
    return enFallback;
  }
  return key;
}
