// ─── Session Manager (Phase 2) — composes with usePracticeSession ─────

import { useCallback, useRef, useState } from 'react';

import { getDailySessionWords } from '@/src/services/content/lessonRepository';
import { useTrackStore } from '@/src/store/useTrackStore';
import type { WordEntry } from '@/src/types/track.types';

import {
  PASS_THRESHOLD,
  type SessionConfig,
  type SessionResult,
  type WordAttemptResult,
} from '../types/practice.types';

export function useSessionManager() {
  const { activeTrackId } = useTrackStore();

  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionWords, setSessionWords] = useState<WordEntry[]>([]);

  const wordResults = useRef<Map<number, WordAttemptResult>>(new Map());
  const startTime = useRef<number>(0);

  const startSession = useCallback(
    async (config?: Partial<SessionConfig>) => {
      const cfg: SessionConfig = {
        trackId: config?.trackId ?? activeTrackId,
        wordCount: config?.wordCount ?? 5,
        focusCategory: config?.focusCategory,
      };

      const words = await getDailySessionWords(cfg.trackId, cfg.wordCount);

      setSessionConfig(cfg);
      setSessionWords(words);
      wordResults.current = new Map();
      startTime.current = Date.now();
      setIsSessionActive(true);

      return words;
    },
    [activeTrackId],
  );

  const recordWordResult = useCallback(
    (wordId: number, word: string, score: number) => {
      const existing = wordResults.current.get(wordId);

      if (existing) {
        existing.attempts += 1;
        existing.bestScore = Math.max(existing.bestScore, score);
        existing.passed = existing.bestScore >= PASS_THRESHOLD;
      } else {
        wordResults.current.set(wordId, {
          wordId,
          word,
          bestScore: score,
          attempts: 1,
          passed: score >= PASS_THRESHOLD,
        });
      }
    },
    [],
  );

  const endSession = useCallback((): SessionResult | null => {
    if (!sessionConfig) return null;

    const results = Array.from(wordResults.current.values());
    const scores = results.map((r) => r.bestScore);
    const avg =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    const summary: SessionResult = {
      trackId: sessionConfig.trackId,
      wordsAttempted: results.length,
      wordsCorrect: results.filter((r) => r.passed).length,
      averageScore: Math.round(avg),
      durationMs: Date.now() - startTime.current,
      completedAt: new Date().toISOString(),
      wordResults: results,
    };

    setIsSessionActive(false);
    return summary;
  }, [sessionConfig]);

  const cancelSession = useCallback(() => {
    setIsSessionActive(false);
    setSessionConfig(null);
    setSessionWords([]);
    wordResults.current = new Map();
  }, []);

  return {
    sessionConfig,
    isSessionActive,
    sessionWords,
    startSession,
    recordWordResult,
    endSession,
    cancelSession,
  };
}
