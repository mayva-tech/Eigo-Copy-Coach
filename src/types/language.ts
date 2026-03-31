export type LanguageCode = 'en' | 'ja';

export type UserLanguageSettings = {
  uiLanguage: LanguageCode;
  supportLanguage: LanguageCode;
  targetLanguage: 'en';
  hasConfirmedLanguage: boolean;
};

export const SUPPORTED_LANGUAGE_CODES: readonly LanguageCode[] = [
  'en',
  'ja',
] as const;
