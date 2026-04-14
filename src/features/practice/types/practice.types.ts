import type { WordItem } from '@/src/types/word';
import type { TrackId } from '@/src/types/track.types';

export type PracticeFeedbackTone = 'neutral' | 'good' | 'warn';

/** Azure word-level row surfaced after scoring (single-word drills usually have one row). */
export type PracticeWordScoreLine = {
  word: string;
  accuracyScore: number;
  errorType: string;
};

export type PracticeFeedback = {
  tone: PracticeFeedbackTone;
  title: string;
  body: string;
  score: number | null;
  wordScores?: PracticeWordScoreLine[];
};

export type PracticeSessionState = {
  lessonId: string;
  words: WordItem[];
  currentIndex: number;
  currentWord: WordItem | null;
  isRecording: boolean;
  feedback: PracticeFeedback;
  attemptCount: number;
};

// ─── Session types (Phase 2) — useSessionManager + progress (Phase 4) ─

export interface SessionConfig {
  trackId: TrackId;
  wordCount: number;
  /** If set, only drill words in this difficulty category */
  focusCategory?: string;
}

export interface WordAttemptResult {
  wordId: number;
  word: string;
  /** Highest pronunciationScore across all attempts for this word */
  bestScore: number;
  attempts: number;
  /** true if bestScore >= PASS_THRESHOLD */
  passed: boolean;
}

export interface SessionResult {
  trackId: string;
  wordsAttempted: number;
  wordsCorrect: number;
  averageScore: number;
  /** Total session duration in milliseconds */
  durationMs: number;
  completedAt: string;
  wordResults: WordAttemptResult[];
}

/** Score at or above which a word attempt is considered "passed" */
export const PASS_THRESHOLD = 70;
