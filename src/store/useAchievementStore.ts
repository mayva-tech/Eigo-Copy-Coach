import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AchievementId } from '@/src/types/gamification.types';
import { ACHIEVEMENTS } from '@/src/types/gamification.types';
import { useProgressStore } from './useProgressStore';

interface UnlockedAchievement {
  id: AchievementId;
  unlockedAt: string;
}

interface AchievementState {
  unlocked: Partial<Record<AchievementId, UnlockedAchievement>>;
}

interface AchievementActions {
  evaluateAchievements: () => AchievementId[];
  isUnlocked: (id: AchievementId) => boolean;
  getUnlockedCount: () => number;
  getTotalCount: () => number;
  resetAchievements: () => void;
}

type ConditionFn = () => boolean;

function buildConditions(): Record<AchievementId, ConditionFn> {
  const p = () => useProgressStore.getState();
  return {
    first_session: () => p().totalSessionsCompleted >= 1,
    first_pass: () => p().totalWordsPassed >= 1,
    streak_3: () => p().longestStreak >= 3,
    streak_7: () => p().longestStreak >= 7,
    streak_14: () => p().longestStreak >= 14,
    streak_30: () => p().longestStreak >= 30,
    streak_60: () => p().longestStreak >= 60,
    streak_100: () => p().longestStreak >= 100,
    words_10: () => p().totalWordsPassed >= 10,
    words_25: () => p().totalWordsPassed >= 25,
    words_50: () => p().totalWordsPassed >= 50,
    words_100: () => p().totalWordsPassed >= 100,
    words_200: () => p().totalWordsPassed >= 200,
    sessions_10: () => p().totalSessionsCompleted >= 10,
    sessions_50: () => p().totalSessionsCompleted >= 50,
    sessions_100: () => p().totalSessionsCompleted >= 100,
    first_perfect: () => p().totalPerfectWords >= 1,
    perfect_5: () => p().totalPerfectWords >= 5,
    perfect_session: () => {
      const today = p().getTodayRecord();
      return today !== null && today.wordsPassed > 0 && today.wordsPassed >= today.wordsAttempted;
    },
    first_mastered: () => p().countWordsByMastery(4) >= 1,
    mastered_10: () => p().countWordsByMastery(4) >= 10,
    mastered_25: () => p().countWordsByMastery(4) >= 25,
  };
}

export const useAchievementStore = create<AchievementState & AchievementActions>()(
  persist(
    (set, get) => ({
      unlocked: {} as Partial<Record<AchievementId, UnlockedAchievement>>,
      evaluateAchievements: () => {
        const conditions = buildConditions();
        const current = get().unlocked;
        const newlyUnlocked: AchievementId[] = [];
        const now = new Date().toISOString();
        const updates: Partial<Record<AchievementId, UnlockedAchievement>> = {};

        for (const ach of ACHIEVEMENTS) {
          if (current[ach.id]) continue;
          const condFn = conditions[ach.id];
          if (condFn && condFn()) {
            updates[ach.id] = { id: ach.id, unlockedAt: now };
            newlyUnlocked.push(ach.id);
          }
        }

        if (newlyUnlocked.length > 0) {
          const bonusXp = newlyUnlocked.reduce((sum, id) => {
            const def = ACHIEVEMENTS.find((a) => a.id === id);
            return sum + (def?.xpReward ?? 0);
          }, 0);

          set({ unlocked: { ...current, ...updates } });

          if (bonusXp > 0) {
            const progressStore = useProgressStore.getState();
            useProgressStore.setState({ totalXp: progressStore.totalXp + bonusXp });
          }
        }

        return newlyUnlocked;
      },
      isUnlocked: (id) => !!get().unlocked[id],
      getUnlockedCount: () => Object.keys(get().unlocked).length,
      getTotalCount: () => ACHIEVEMENTS.length,
      resetAchievements: () => set({ unlocked: {} as Record<AchievementId, UnlockedAchievement> }),
    }),
    {
      name: 'eigo-achievement-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

