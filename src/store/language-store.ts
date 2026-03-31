import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { LanguageCode } from '@/src/types/language';

export type LanguageState = {
  uiLanguage: LanguageCode;
  supportLanguage: LanguageCode;
  targetLanguage: 'en';
  hasConfirmedLanguage: boolean;
  setUiLanguage: (code: LanguageCode) => void;
  setSupportLanguage: (code: LanguageCode) => void;
  setLanguagePair: (ui: LanguageCode, support: LanguageCode) => void;
  confirmLanguage: () => void;
  resetLanguageSetup: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      uiLanguage: 'ja',
      supportLanguage: 'ja',
      targetLanguage: 'en',
      hasConfirmedLanguage: false,
      // Japan-first app: UI language is fixed to Japanese.
      setUiLanguage: () => set({ uiLanguage: 'ja' }),
      setSupportLanguage: (code) => set({ supportLanguage: code }),
      setLanguagePair: (_ui, support) => set({ uiLanguage: 'ja', supportLanguage: support }),
      confirmLanguage: () => set({ hasConfirmedLanguage: true }),
      resetLanguageSetup: () => set({ hasConfirmedLanguage: false }),
    }),
    {
      name: 'eigo-language-settings-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        uiLanguage: state.uiLanguage,
        supportLanguage: state.supportLanguage,
        targetLanguage: state.targetLanguage,
        hasConfirmedLanguage: state.hasConfirmedLanguage,
      }),
    }
  )
);
