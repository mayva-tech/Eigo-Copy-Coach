import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type PlanTier = 'free' | 'pro';

export const FREE_LIMITS = {
  maxDailySessions: 3,
  maxWordsPerTrack: 30,
  maxTracks: 1,
  detailedReview: false,
  srsSelection: false,
} as const;

export const PRO_FEATURES = {
  maxDailySessions: Infinity,
  maxWordsPerTrack: Infinity,
  maxTracks: Infinity,
  detailedReview: true,
  srsSelection: true,
} as const;

interface SubscriptionState {
  tier: PlanTier;
  expiresAt: string | null;
  receiptId: string | null;
  lastValidatedAt: string | null;
}

interface SubscriptionActions {
  isPro: () => boolean;
  activate: (params: { expiresAt?: string; receiptId: string }) => void;
  deactivate: () => void;
  validateExpiry: () => void;
  getLimits: () => typeof FREE_LIMITS | typeof PRO_FEATURES;
}

export const useSubscriptionStore = create<SubscriptionState & SubscriptionActions>()(
  persist(
    (set, get) => ({
      tier: 'free',
      expiresAt: null,
      receiptId: null,
      lastValidatedAt: null,

      isPro: () => {
        const state = get();
        if (state.tier !== 'pro') return false;

        if (state.expiresAt && new Date(state.expiresAt) < new Date()) {
          set({ tier: 'free', expiresAt: null, receiptId: null, lastValidatedAt: new Date().toISOString() });
          return false;
        }

        return true;
      },

      activate: ({ expiresAt, receiptId }) => {
        set({ tier: 'pro', expiresAt: expiresAt ?? null, receiptId, lastValidatedAt: new Date().toISOString() });
      },

      deactivate: () => {
        set({ tier: 'free', expiresAt: null, receiptId: null, lastValidatedAt: new Date().toISOString() });
      },

      validateExpiry: () => {
        get().isPro();
        set({ lastValidatedAt: new Date().toISOString() });
      },

      getLimits: () => (get().isPro() ? PRO_FEATURES : FREE_LIMITS),
    }),
    {
      name: 'eigo-subscription-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
