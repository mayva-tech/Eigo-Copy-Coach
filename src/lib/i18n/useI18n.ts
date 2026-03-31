import { useCallback, useMemo } from 'react';

import { getGuidanceForWord, getGuidanceTip } from '@/src/lib/i18n/guidance';
import type { UiKey } from '@/src/lib/i18n/uiCatalog';
import { tUi } from '@/src/lib/i18n/resolveUi';
import { useLanguageStore } from '@/src/store/language-store';

export function useI18n() {
  const uiLanguage = 'ja' as const;
  const supportLanguage = useLanguageStore((s) => s.supportLanguage);
  const targetLanguage = useLanguageStore((s) => s.targetLanguage);
  const setSupportLanguage = useLanguageStore((s) => s.setSupportLanguage);
  const setLanguagePair = useLanguageStore((s) => s.setLanguagePair);

  const t = useCallback((key: UiKey) => tUi(uiLanguage, key), [uiLanguage]);

  const getGuidanceTipForWord = useCallback(
    (wordId: string) => getGuidanceTip(wordId, supportLanguage, uiLanguage),
    [supportLanguage, uiLanguage]
  );

  const getGuidanceForWordId = useCallback(
    (wordId: string) => getGuidanceForWord(wordId, supportLanguage, uiLanguage),
    [supportLanguage, uiLanguage]
  );

  return useMemo(
    () => ({
      t,
      uiLanguage,
      supportLanguage,
      targetLanguage,
      setSupportLanguage,
      setLanguagePair,
      getGuidanceTipForWord,
      getGuidanceForWordId,
    }),
    [
      t,
      uiLanguage,
      supportLanguage,
      targetLanguage,
      setSupportLanguage,
      setLanguagePair,
      getGuidanceTipForWord,
      getGuidanceForWordId,
    ]
  );
}
