import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { MasteryLevel, TrackId } from '@/src/types/track.types';
import type { SessionResult } from '@/src/features/practice/types/practice.types';
import type { DayRecord, WordProgress } from '@/src/types/gamification.types';
import { XP_TABLE } from '@/src/types/gamification.types';

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function advanceMastery(current: MasteryLevel, passed: boolean, consecutivePasses: number): MasteryLevel {
  if (!passed) return Math.max(current === 0 ? 0 : 1, current - 1) as MasteryLevel;
  const required = current >= 3 ? 3 : current >= 2 ? 2 : 1;
  if (consecutivePasses >= required) return Math.min(4, current + 1) as MasteryLevel;
  return current;
}

interface ProgressState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalXp: number;
  wordProgress: Record<string, Record<number, WordProgress>>;
  dayLog: Record<string, DayRecord>;
  totalSessionsCompleted: number;
  totalWordsAttempted: number;
  totalWordsPassed: number;
  totalPerfectWords: number;
}

interface ProgressActions {
  recordSession: (result: SessionResult) => number;
  getWordMastery: (trackId: TrackId, wordId: number) => WordProgress | null;
  getTodayRecord: () => DayRecord | null;
  getTodaySessionCount: () => number;
  countWordsByMastery: (minLevel: MasteryLevel) => number;
  countWordsByMasteryForTrack: (trackId: TrackId, minLevel: MasteryLevel) => number;
  resetProgress: () => void;
}

const INITIAL_STATE: ProgressState = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  totalXp: 0,
  wordProgress: {},
  dayLog: {},
  totalSessionsCompleted: 0,
  totalWordsAttempted: 0,
  totalWordsPassed: 0,
  totalPerfectWords: 0,
};

export const useProgressStore = create<ProgressState & ProgressActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      recordSession: (result) => {
        const today = todayKey();
        const state = get();
        let sessionXp = 0;

        let newStreak = state.currentStreak;
        if (state.lastActiveDate === today) {
        } else if (state.lastActiveDate === yesterdayKey()) newStreak = state.currentStreak + 1;
        else if (state.lastActiveDate === null) newStreak = 1;
        else newStreak = 1;

        sessionXp += XP_TABLE.streakDay * Math.min(newStreak, 10);

        const trackProgress = { ...(state.wordProgress[result.trackId] ?? {}) };
        let sessionPassed = 0;
        let sessionPerfect = 0;

        for (const wr of result.wordResults) {
          const existing: WordProgress = trackProgress[wr.wordId] ?? {
            masteryLevel: 0,
            totalAttempts: 0,
            bestScore: 0,
            lastPracticedAt: today,
            consecutivePasses: 0,
            perfectCount: 0,
          };

          const newConsecutive = wr.passed ? existing.consecutivePasses + 1 : 0;
          const isPerfect = wr.bestScore >= 95;
          const oldMastery = existing.masteryLevel;
          const newMastery = advanceMastery(existing.masteryLevel, wr.passed, newConsecutive);

          trackProgress[wr.wordId] = {
            masteryLevel: newMastery,
            totalAttempts: existing.totalAttempts + wr.attempts,
            bestScore: Math.max(existing.bestScore, wr.bestScore),
            lastPracticedAt: today,
            consecutivePasses: newConsecutive,
            perfectCount: existing.perfectCount + (isPerfect ? 1 : 0),
          };

          sessionXp += XP_TABLE.wordAttempt * wr.attempts;
          if (wr.passed) {
            sessionXp += XP_TABLE.wordPass;
            sessionPassed++;
          }
          if (isPerfect) {
            sessionXp += XP_TABLE.wordPerfect;
            sessionPerfect++;
          }
          if (newMastery > oldMastery) sessionXp += XP_TABLE.masteryUp;
        }

        sessionXp += XP_TABLE.sessionComplete;
        if (sessionPassed === result.wordsAttempted && result.wordsAttempted > 0) sessionXp += XP_TABLE.sessionPerfect;

        const existingDay: DayRecord = state.dayLog[today] ?? {
          date: today,
          sessionsCompleted: 0,
          wordsAttempted: 0,
          wordsPassed: 0,
          averageScore: 0,
          xpEarned: 0,
        };

        const prevScoreTotal = existingDay.averageScore * existingDay.wordsAttempted;
        const newScoreTotal = prevScoreTotal + result.averageScore * result.wordsAttempted;
        const newWordCount = existingDay.wordsAttempted + result.wordsAttempted;

        const updatedDay: DayRecord = {
          date: today,
          sessionsCompleted: existingDay.sessionsCompleted + 1,
          wordsAttempted: newWordCount,
          wordsPassed: existingDay.wordsPassed + sessionPassed,
          averageScore: newWordCount > 0 ? Math.round(newScoreTotal / newWordCount) : 0,
          xpEarned: existingDay.xpEarned + sessionXp,
        };

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastActiveDate: today,
          totalXp: state.totalXp + sessionXp,
          wordProgress: { ...state.wordProgress, [result.trackId]: trackProgress },
          dayLog: { ...state.dayLog, [today]: updatedDay },
          totalSessionsCompleted: state.totalSessionsCompleted + 1,
          totalWordsAttempted: state.totalWordsAttempted + result.wordsAttempted,
          totalWordsPassed: state.totalWordsPassed + sessionPassed,
          totalPerfectWords: state.totalPerfectWords + sessionPerfect,
        });

        return sessionXp;
      },
      getWordMastery: (trackId, wordId) => get().wordProgress[trackId]?.[wordId] ?? null,
      getTodayRecord: () => get().dayLog[todayKey()] ?? null,
      getTodaySessionCount: () => get().dayLog[todayKey()]?.sessionsCompleted ?? 0,
      countWordsByMastery: (minLevel) => {
        const wp = get().wordProgress;
        let count = 0;
        for (const trackWords of Object.values(wp)) {
          for (const progress of Object.values(trackWords)) {
            if (progress.masteryLevel >= minLevel) count++;
          }
        }
        return count;
      },
      countWordsByMasteryForTrack: (trackId, minLevel) => {
        const trackWords = get().wordProgress[trackId] ?? {};
        let count = 0;
        for (const progress of Object.values(trackWords)) {
          if (progress.masteryLevel >= minLevel) count++;
        }
        return count;
      },
      resetProgress: () => set(INITIAL_STATE),
    }),
    {
      name: 'eigo-progress-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
