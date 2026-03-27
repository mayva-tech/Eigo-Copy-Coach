import type { WordItem } from '@/src/types/word';

export type PracticeFeedbackTone = 'neutral' | 'good' | 'warn';

export type PracticeFeedback = {
  tone: PracticeFeedbackTone;
  title: string;
  body: string;
  score: number | null;
};

export type PracticeSessionState = {
  lessonId: string;
  words: WordItem[];
  currentIndex: number;
  currentWord: WordItem | null;
  isRecording: boolean;
  selectedBlockId: string | null;
  feedback: PracticeFeedback;
  attemptCount: number;
};
