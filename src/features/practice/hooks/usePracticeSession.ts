import { useEffect, useMemo, useState } from 'react';

import { buildMockFeedback, getInitialFeedback } from '@/src/features/practice/utils/scoreHelpers';
import type { PracticeFeedback } from '@/src/features/practice/types/practice.types';
import { speakEnglishWord } from '@/src/services/audio/referenceSpeech';
import { getLessonWords } from '@/src/services/content/lessonRepository';
import { useSessionSummaryStore } from '@/src/store/sessionSummaryStore';
import { usePracticeStore } from '@/src/store/usePracticeStore';

/** Words at or below this mock score are saved to the local review queue. */
const REVIEW_SCORE_THRESHOLD = 85;

export function usePracticeSession(lessonId: string) {
  const words = useMemo(() => getLessonWords(lessonId), [lessonId]);

  useEffect(() => {
    useSessionSummaryStore.getState().startSession(lessonId);
  }, [lessonId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState<PracticeFeedback>(getInitialFeedback());
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const addReviewItem = usePracticeStore((state) => state.addReviewItem);

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
    void speakEnglishWord(currentWord.word, 'normal');
    applyReferenceFeedback('normal');
  };

  const playSlow = () => {
    if (!currentWord) return;
    void speakEnglishWord(currentWord.word, 'slow');
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

    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);

    const nextFeedback = buildMockFeedback(currentWord, nextAttempt);
    setFeedback(nextFeedback);

    const score = nextFeedback.score ?? 0;
    useSessionSummaryStore.getState().recordWordResult({
      word: currentWord.word,
      wordId: currentWord.id,
      score,
    });

    if (score < REVIEW_SCORE_THRESHOLD) {
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
