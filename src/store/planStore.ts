import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { UserPlan } from '@/src/constants/plan';

type PlanStore = {
  plan: UserPlan;
  premiumHearCount: number;
  hasSeenPaywall: boolean;

  setPlan: (plan: UserPlan) => void;
  incrementPremiumHearCount: () => void;
  markPaywallSeen: () => void;
  resetPlanUsage: () => void;
};

export const usePlanStore = create<PlanStore>()(
  persist(
    (set) => ({
      plan: 'free',
      premiumHearCount: 0,
      hasSeenPaywall: false,

      setPlan: (plan) => set({ plan }),
      incrementPremiumHearCount: () =>
        set((state) => ({
          premiumHearCount: state.premiumHearCount + 1,
        })),
      markPaywallSeen: () => set({ hasSeenPaywall: true }),
      resetPlanUsage: () =>
        set({
          premiumHearCount: 0,
          hasSeenPaywall: false,
        }),
    }),
    {
      name: 'plan-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
