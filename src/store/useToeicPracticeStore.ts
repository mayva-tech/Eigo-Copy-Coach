import { create } from 'zustand';

import { toeicWordToPracticeItem } from '@/src/data/toeicToPracticeWord';
import type { ToeicWord } from '@/src/data/toeicWordTypes';
import { loadToeicPracticeWords, saveToeicPracticeWords } from '@/src/services/storage/practiceStorage';
import type { WordItem } from '@/src/types/word';

type ToeicPracticeState = {
  words: WordItem[];
  hydrateToeicPractice: () => Promise<void>;
  /** Insert or refresh (same `toeic-{id}`) at the front of the list. */
  upsertToeicPracticeWord: (item: WordItem) => void;
  addCurrentToeicHeadword: (w: ToeicWord) => void;
  isToeicWordInPracticeList: (toeicId: number) => boolean;
};

export const useToeicPracticeStore = create<ToeicPracticeState>((set, get) => ({
  words: [],

  hydrateToeicPractice: async () => {
    const words = await loadToeicPracticeWords();
    set({ words });
  },

  upsertToeicPracticeWord: (item) => {
    set((state) => {
      const next = [item, ...state.words.filter((x) => x.id !== item.id)];
      void saveToeicPracticeWords(next);
      return { words: next };
    });
  },

  addCurrentToeicHeadword: (w) => {
    get().upsertToeicPracticeWord(toeicWordToPracticeItem(w));
  },

  isToeicWordInPracticeList: (toeicId) => get().words.some((x) => x.id === `toeic-${toeicId}`),
}));
