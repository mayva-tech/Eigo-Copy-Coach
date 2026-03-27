export type LanguageCode = 'en' | 'ja' | 'ko' | 'pt-BR' | 'es' | 'zh-Hans';

export type UserLanguageSettings = {
  uiLanguage: LanguageCode;
  supportLanguage: LanguageCode;
  targetLanguage: 'en';
  hasConfirmedLanguage: boolean;
};

export const SUPPORTED_LANGUAGE_CODES: readonly LanguageCode[] = [
  'en',
  'ja',
  'ko',
  'pt-BR',
  'es',
  'zh-Hans',
] as const;
