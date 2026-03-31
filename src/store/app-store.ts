import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AppState = {
  onboardingComplete: boolean;
  setOnboardingComplete: (done: boolean) => void;
  resetOnboarding: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      onboardingComplete: false,
      setOnboardingComplete: (done: boolean) => set({ onboardingComplete: done }),
      resetOnboarding: () => set({ onboardingComplete: false }),
    }),
    {
      // Bump to force onboarding to show again after flow changes.
      name: 'eigo-app-settings-v2',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ onboardingComplete: state.onboardingComplete }),
    }
  )
);
