import { useCallback } from 'react';

import { useAchievementStore } from '@/src/store/useAchievementStore';
import { useProgressStore } from '@/src/store/useProgressStore';
import type { SessionResult } from '@/src/features/practice/types/practice.types';
import type { AchievementId } from '@/src/types/gamification.types';
import { ACHIEVEMENTS, levelFromXp, xpToNextLevel } from '@/src/types/gamification.types';

export interface SessionEndEvents {
  xpEarned: number;
  totalXp: number;
  level: {
    current: number;
    progress: number;
    xpToNext: number;
    leveledUp: boolean;
    previousLevel: number;
  };
  streak: {
    current: number;
    isNew: boolean;
    continued: boolean;
    broken: boolean;
    isRecord: boolean;
  };
  newAchievements: {
    id: AchievementId;
    icon: string;
    titleKey: string;
    xpReward: number;
  }[];
  session: {
    wordsAttempted: number;
    wordsPassed: number;
    averageScore: number;
    durationMs: number;
    allPassed: boolean;
  };
}

export function useGameLoop() {
  const recordSession = useProgressStore((s) => s.recordSession);
  const evaluateAchievements = useAchievementStore((s) => s.evaluateAchievements);

  const processSessionEnd = useCallback(
    (result: SessionResult): SessionEndEvents => {
      const prevXp = useProgressStore.getState().totalXp;
      const prevLevel = levelFromXp(prevXp);
      const prevStreak = useProgressStore.getState().currentStreak;
      const prevLastActive = useProgressStore.getState().lastActiveDate;

      recordSession(result);
      const newAchIds = evaluateAchievements();

      const postState = useProgressStore.getState();
      const postLevel = levelFromXp(postState.totalXp);
      const levelInfo = xpToNextLevel(postState.totalXp);

      const today = new Date().toISOString().slice(0, 10);
      const yesterday = (() => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().slice(0, 10);
      })();

      const streakInfo = {
        current: postState.currentStreak,
        isNew: postState.currentStreak === 1 && prevStreak === 0,
        continued: prevLastActive === yesterday && postState.currentStreak > 1,
        broken: prevStreak > 1 && postState.currentStreak === 1 && prevLastActive !== today,
        isRecord: postState.currentStreak === postState.longestStreak && postState.currentStreak > 1,
      };

      const newAchievements = newAchIds.map((id) => {
        const def = ACHIEVEMENTS.find((a) => a.id === id)!;
        return { id, icon: def.icon, titleKey: def.titleKey, xpReward: def.xpReward };
      });

      const totalXpEarned = postState.totalXp - prevXp;

      return {
        xpEarned: totalXpEarned,
        totalXp: postState.totalXp,
        level: {
          current: postLevel,
          progress: levelInfo.progress,
          xpToNext: levelInfo.xpNeeded - levelInfo.xpIntoLevel,
          leveledUp: postLevel > prevLevel,
          previousLevel: prevLevel,
        },
        streak: streakInfo,
        newAchievements,
        session: {
          wordsAttempted: result.wordsAttempted,
          wordsPassed: result.wordsCorrect,
          averageScore: result.averageScore,
          durationMs: result.durationMs,
          allPassed: result.wordsCorrect === result.wordsAttempted && result.wordsAttempted > 0,
        },
      };
    },
    [evaluateAchievements, recordSession],
  );

  return { processSessionEnd };
}




