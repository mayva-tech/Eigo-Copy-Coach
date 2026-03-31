import { create } from 'zustand';

export type SessionWordEntry = {
  word: string;
  wordId: string;
  score: number;
};

type SessionSummaryState = {
  lessonId: string | null;
  entries: SessionWordEntry[];
  startSession: (lessonId: string) => void;
  recordWordResult: (entry: SessionWordEntry) => void;
  clearSession: () => void;
};

/**
 * Collects per-word scores during a practice run for the session-complete screen.
 * One entry per wordId (latest attempt wins).
 */
export const useSessionSummaryStore = create<SessionSummaryState>((set) => ({
  lessonId: null,
  entries: [],
  startSession: (lessonId) => set({ lessonId, entries: [] }),
  recordWordResult: (entry) =>
    set((s) => {
      const idx = s.entries.findIndex((e) => e.wordId === entry.wordId);
      const next = [...s.entries];
      if (idx >= 0) {
        next[idx] = entry;
      } else {
        next.push(entry);
      }
      return { entries: next };
    }),
  clearSession: () => set({ lessonId: null, entries: [] }),
}));
