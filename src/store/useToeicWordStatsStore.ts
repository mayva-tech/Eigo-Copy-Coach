import { create } from 'zustand';

import {
  loadToeicWordStats,
  saveToeicWordStats,
  type ToeicWordStatEntry,
} from '@/src/services/storage/toeicWordStatsStorage';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const DISK_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;
const MAX_ACTIVITY = 120;
const MAX_SCORES = 20;

function emptyEntry(): ToeicWordStatEntry {
  return { activityTimestamps: [], practiceScores: [], userConfidence: null };
}

function trimActivity(ts: number[]): number[] {
  const cutoff = Date.now() - DISK_MAX_AGE_MS;
  let next = ts.filter((t) => t >= cutoff);
  if (next.length > MAX_ACTIVITY) next = next.slice(-MAX_ACTIVITY);
  return next;
}

function countInLastWeek(ts: number[]): number {
  const cutoff = Date.now() - WEEK_MS;
  return ts.filter((t) => t >= cutoff).length;
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

type State = {
  byId: Record<number, ToeicWordStatEntry>;
  hydrateToeicWordStats: () => Promise<void>;
  recordHeadwordPlayback: (toeicId: number) => void;
  recordPracticeAttempt: (toeicId: number, score: number) => void;
  adjustUserConfidence: (toeicId: number, delta: number) => void;
  getWeeklyActivityCount: (toeicId: number) => number;
  /** Practice-score average if any; else user slider; else null. */
  getDisplayConfidence: (toeicId: number) => number | null;
};

export const useToeicWordStatsStore = create<State>((set, get) => ({
  byId: {},

  hydrateToeicWordStats: async () => {
    const byId = await loadToeicWordStats();
    set({ byId });
  },

  recordHeadwordPlayback: (toeicId) => {
    set((st) => {
      const prev = st.byId[toeicId] ?? emptyEntry();
      const e: ToeicWordStatEntry = {
        ...prev,
        activityTimestamps: trimActivity([...prev.activityTimestamps, Date.now()]),
      };
      const byId = { ...st.byId, [toeicId]: e };
      void saveToeicWordStats(byId);
      return { byId };
    });
  },

  recordPracticeAttempt: (toeicId, score) => {
    set((st) => {
      const prev = st.byId[toeicId] ?? emptyEntry();
      const e: ToeicWordStatEntry = {
        ...prev,
        activityTimestamps: trimActivity([...prev.activityTimestamps, Date.now()]),
        practiceScores: [...prev.practiceScores, score].slice(-MAX_SCORES),
      };
      const byId = { ...st.byId, [toeicId]: e };
      void saveToeicWordStats(byId);
      return { byId };
    });
  },

  adjustUserConfidence: (toeicId, delta) => {
    set((st) => {
      const prev = st.byId[toeicId] ?? emptyEntry();
      const base = prev.userConfidence ?? 50;
      const nextVal = Math.round(Math.min(100, Math.max(0, base + delta)));
      const e: ToeicWordStatEntry = { ...prev, userConfidence: nextVal };
      const byId = { ...st.byId, [toeicId]: e };
      void saveToeicWordStats(byId);
      return { byId };
    });
  },

  getWeeklyActivityCount: (toeicId) => {
    const e = get().byId[toeicId];
    if (!e) return 0;
    return countInLastWeek(e.activityTimestamps);
  },

  getDisplayConfidence: (toeicId) => {
    const e = get().byId[toeicId];
    if (!e) return null;
    if (e.practiceScores.length > 0) {
      return Math.round(avg(e.practiceScores));
    }
    return e.userConfidence;
  },
}));
