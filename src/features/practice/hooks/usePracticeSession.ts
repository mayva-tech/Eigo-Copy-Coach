import { useEffect, useMemo, useRef, useState } from 'react';

import {
  buildFeedbackFromScore,
  buildNoRecordingFeedback,
  buildScoringErrorFeedback,
  getInitialFeedback,
} from '@/src/features/practice/utils/scoreHelpers';
import type { PracticeFeedback } from '@/src/features/practice/types/practice.types';
import { getStressHintForToeicPracticeWordId } from '@/src/data/toeicStressLookup';
import { speakEnglishHeadword } from '@/src/services/audio/referenceSpeech';
import { getLessonWords, LESSON_TOEIC_ID } from '@/src/services/content/lessonRepository';
import { scorePronunciationWithRetry } from '../../../services/scoring/scoringBackendClient';
import { useSessionSummaryStore } from '@/src/store/sessionSummaryStore';
import { usePracticeStore } from '@/src/store/usePracticeStore';
import { useToeicPracticeStore } from '@/src/store/useToeicPracticeStore';
import { useToeicWordStatsStore } from '@/src/store/useToeicWordStatsStore';

/** Words scoring below this threshold are saved to the local review queue. */
const REVIEW_SCORE_THRESHOLD = 85;

export function usePracticeSession(lessonId: string, initialWordId?: string | null) {
  const toeicPracticeWords = useToeicPracticeStore((s) => s.words);
  const words = useMemo(() => {
    if (lessonId === LESSON_TOEIC_ID) return toeicPracticeWords;
    return getLessonWords(lessonId);
  }, [lessonId, toeicPracticeWords]);

  useEffect(() => {
    useSessionSummaryStore.getState().startSession(lessonId);
  }, [lessonId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  /** Avoid re-applying the same deep-link jump when `words` identity updates. */
  const appliedInitialKeyRef = useRef<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState<PracticeFeedback>(getInitialFeedback());
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const addReviewItem = usePracticeStore((state) => state.addReviewItem);

  useEffect(() => {
    appliedInitialKeyRef.current = null;
  }, [lessonId, initialWordId]);

  useEffect(() => {
    if (!words.length || !initialWordId) return;
    const key = `${lessonId}:${initialWordId}`;
    if (appliedInitialKeyRef.current === key) return;
    const idx = words.findIndex((w) => w.id === initialWordId);
    if (idx < 0) return;
    appliedInitialKeyRef.current = key;
    setCurrentIndex(idx);
    setAttemptCount(0);
    setRecordedUri(null);
    setFeedback(getInitialFeedback());
  }, [lessonId, words, initialWordId]);

  const currentWord = words[currentIndex] ?? null;
  const progressLabel = `${Math.min(currentIndex + 1, words.length)} / ${words.length}`;

  const applyReferenceFeedback = (mode: 'normal' | 'slow') => {
    if (!currentWord) return;
    if (mode === 'normal') {
      setFeedback({
        tone: 'neutral',
        title: 'こうきこえる',
        body: currentWord.sayItLike,
        score: null,
      });
    } else {
      setFeedback({
        tone: 'neutral',
        title: 'ゆっくりきく',
        body: currentWord.slowGuide,
        score: null,
      });
    }
  };

  const playNormal = () => {
    if (!currentWord) return;
    const stress = getStressHintForToeicPracticeWordId(currentWord.id);
    void speakEnglishHeadword(currentWord.word, 'normal', stress);
    applyReferenceFeedback('normal');
  };

  const playSlow = () => {
    if (!currentWord) return;
    const stress = getStressHintForToeicPracticeWordId(currentWord.id);
    void speakEnglishHeadword(currentWord.word, 'slow', stress);
    applyReferenceFeedback('slow');
  };

  const resetWordState = () => {
    setAttemptCount(0);
    setRecordedUri(null);
    setFeedback(getInitialFeedback());
  };

  const registerAttemptResult = async (uri: string | null) => {
    if (!currentWord) return;

    setRecordedUri(uri);

    setAttemptCount((n) => n + 1);

    // ── Azure pronunciation assessment (retries in scoringBackendClient) ───
    let nextFeedback: PracticeFeedback;
    if (uri) {
      try {
        const result = await scorePronunciationWithRetry(uri, currentWord.word);
        nextFeedback = buildFeedbackFromScore(result);
      } catch (err) {
        console.warn('[usePracticeSession] Scoring API failed:', err);
        nextFeedback = buildScoringErrorFeedback(err);
      }
    } else {
      nextFeedback = buildNoRecordingFeedback();
    }

    setFeedback(nextFeedback);

    const score = nextFeedback.score;
    if (score != null) {
      useSessionSummaryStore.getState().recordWordResult({
        word: currentWord.word,
        wordId: currentWord.id,
        score,
      });
    }

    if (score != null && score < REVIEW_SCORE_THRESHOLD) {
      addReviewItem({
        id: `${currentWord.id}-${Date.now()}`,
        wordId: currentWord.id,
        word: currentWord.word,
        sayItLike: currentWord.sayItLike,
        avoidGuide: currentWord.avoidGuide,
        mouthTipJa: currentWord.mouthTipJa,
        score,
        createdAt: Date.now(),
        recordedUri: uri,
      });
    }

    if (score != null && currentWord.id.startsWith('toeic-')) {
      const tail = currentWord.id.slice('toeic-'.length);
      const toeicNumericId = parseInt(tail, 10);
      if (!Number.isNaN(toeicNumericId)) {
        useToeicWordStatsStore.getState().recordPracticeAttempt(toeicNumericId, score);
      }
    }
  };

  const nextWord = () => {
    if (!words.length) return;
    const nextIndex = Math.min(currentIndex + 1, words.length - 1);
    setCurrentIndex(nextIndex);
    resetWordState();
  };

  const previousWord = () => {
    if (!words.length) return;
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
    resetWordState();
  };

  /** Same word: clear recording attempt and return to “listen first” feedback. */
  const retryCurrentWord = () => {
    setAttemptCount(0);
    setRecordedUri(null);
    setFeedback(getInitialFeedback());
  };

  return {
    words,
    currentWord,
    currentIndex,
    progressLabel,
    attemptCount,
    feedback,
    recordedUri,
    applyReferenceFeedback,
    playNormal,
    playSlow,
    registerAttemptResult,
    nextWord,
    previousWord,
    retryCurrentWord,
  };
}
