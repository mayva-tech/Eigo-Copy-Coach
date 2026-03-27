import en from '@/src/content/guidance/en.json';
import es from '@/src/content/guidance/es.json';
import ja from '@/src/content/guidance/ja.json';
import ko from '@/src/content/guidance/ko.json';
import ptBR from '@/src/content/guidance/pt-BR.json';
import zhHans from '@/src/content/guidance/zh-Hans.json';
import type { LanguageCode } from '@/src/types/language';

export type WordGuidanceEntry = {
  tip: string;
};

export const guidanceByLanguage: Record<LanguageCode, Record<string, WordGuidanceEntry>> = {
  en: en as Record<string, WordGuidanceEntry>,
  ja: ja as Record<string, WordGuidanceEntry>,
  ko: ko as Record<string, WordGuidanceEntry>,
  'pt-BR': ptBR as Record<string, WordGuidanceEntry>,
  es: es as Record<string, WordGuidanceEntry>,
  'zh-Hans': zhHans as Record<string, WordGuidanceEntry>,
};
