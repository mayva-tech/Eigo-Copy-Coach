import en from '@/src/content/guidance/en.json';
import ja from '@/src/content/guidance/ja.json';
import type { LanguageCode } from '@/src/types/language';

export type WordGuidanceEntry = {
  tip: string;
};

export const guidanceByLanguage: Record<LanguageCode, Record<string, WordGuidanceEntry>> = {
  en: en as Record<string, WordGuidanceEntry>,
  ja: ja as Record<string, WordGuidanceEntry>,
};
