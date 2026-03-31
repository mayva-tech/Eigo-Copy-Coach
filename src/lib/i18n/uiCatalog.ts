import en from '@/src/locales/ui/en.json';
import ja from '@/src/locales/ui/ja.json';
import type { LanguageCode } from '@/src/types/language';

export type UiKey = keyof typeof en;

export const uiByLanguage: Record<LanguageCode, Record<string, string>> = {
  en: en as Record<string, string>,
  ja: ja as Record<string, string>,
};
