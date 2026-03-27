import en from '@/src/locales/ui/en.json';
import es from '@/src/locales/ui/es.json';
import ja from '@/src/locales/ui/ja.json';
import ko from '@/src/locales/ui/ko.json';
import ptBR from '@/src/locales/ui/pt-BR.json';
import zhHans from '@/src/locales/ui/zh-Hans.json';
import type { LanguageCode } from '@/src/types/language';

export type UiKey = keyof typeof en;

export const uiByLanguage: Record<LanguageCode, Record<string, string>> = {
  en: en as Record<string, string>,
  ja: ja as Record<string, string>,
  ko: ko as Record<string, string>,
  'pt-BR': ptBR as Record<string, string>,
  es: es as Record<string, string>,
  'zh-Hans': zhHans as Record<string, string>,
};
