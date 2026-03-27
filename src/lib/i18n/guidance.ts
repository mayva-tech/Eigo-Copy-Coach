import { guidanceByLanguage } from '@/src/lib/i18n/guidanceCatalog';
import type { UiKey } from '@/src/lib/i18n/uiCatalog';
import { tUi } from '@/src/lib/i18n/resolveUi';
import type { LanguageCode } from '@/src/types/language';

export function getGuidanceTip(
  wordId: string,
  supportLanguage: LanguageCode,
  uiLanguageForFallbackMessage: LanguageCode
): string {
  const primary = guidanceByLanguage[supportLanguage]?.[wordId]?.tip;
  const enTip = guidanceByLanguage.en[wordId]?.tip;
  if (typeof primary === 'string' && primary.length > 0) {
    return primary;
  }
  if (typeof enTip === 'string' && enTip.length > 0) {
    return enTip;
  }
  return tUi(uiLanguageForFallbackMessage, 'common.guidanceMissing' as UiKey);
}

export function getGuidanceForWord(
  wordId: string,
  supportLanguage: LanguageCode,
  uiLanguageForFallbackMessage: LanguageCode
): { tip: string } {
  return { tip: getGuidanceTip(wordId, supportLanguage, uiLanguageForFallbackMessage) };
}
