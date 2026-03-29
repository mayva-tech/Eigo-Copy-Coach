import { create } from 'zustand';

import {
  clearStoredReviewQueue,
  loadReviewQueue,
  saveReviewQueue,
} from '@/src/services/storage/practiceStorage';

/** One row in the local “come back to this” list (low-score or tricky words). */
export type ReviewItem = {
  id: string;
  wordId: string;
  word: string;
  sayItLike: string;
  avoidGuide: string;
  mouthTipJa: string;
  score: number;
  createdAt: number;
  recordedUri?: string | null;
};

type PracticeStoreState = {
  reviewQueue: ReviewItem[];
  hydrateReviewQueue: () => Promise<void>;
  setReviewQueue: (items: ReviewItem[]) => void;
  addReviewItem: (item: ReviewItem) => void;
  clearReviewQueue: () => void;
};

export const usePracticeStore = create<PracticeStoreState>((set) => ({
  reviewQueue: [],

  hydrateReviewQueue: async () => {
    const items = await loadReviewQueue();
    set({ reviewQueue: items });
  },

  setReviewQueue: (items) => {
    set({ reviewQueue: items });
    void saveReviewQueue(items);
  },

  addReviewItem: (item) =>
    set((state) => {
      const exists = state.reviewQueue.some((q) => q.wordId === item.wordId);
      const nextQueue = exists
        ? state.reviewQueue.map((q) => (q.wordId === item.wordId ? item : q))
        : [item, ...state.reviewQueue];
      void saveReviewQueue(nextQueue);
      return { reviewQueue: nextQueue };
    }),

  clearReviewQueue: () => {
    set({ reviewQueue: [] });
    void clearStoredReviewQueue();
  },
}));
