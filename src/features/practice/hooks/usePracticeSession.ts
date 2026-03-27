import { useMemo, useState } from 'react';
import { getLessonWords } from '@/src/services/content/lessonRepository';
import { buildMockFeedback, getInitialFeedback } from '@/src/features/practice/utils/scoreHelpers';
import type { PracticeFeedback } from '@/src/features/practice/types/practice.types';

export function usePracticeSession(lessonId: string) {
  const words = useMemo(() => getLessonWords(lessonId), [lessonId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState<PracticeFeedback>(getInitialFeedback());

  const currentWord = words[currentIndex] ?? null;
  const progressLabel = `${Math.min(currentIndex + 1, words.length)} / ${words.length}`;

  const playNormal = () => {
    if (!currentWord) return;
    setFeedback({
      tone: 'neutral',
      title: 'こう聞こえる',
      body: currentWord.sayItLike,
      score: null,
    });
  };

  const playSlow = () => {
    if (!currentWord) return;
    setFeedback({
      tone: 'neutral',
      title: 'ゆっくり聞く',
      body: currentWord.slowGuide,
      score: null,
    });
  };

  const selectBlock = (blockId: string, blockLabel: string, hint: string) => {
    setSelectedBlockId(blockId);
    setFeedback({
      tone: 'neutral',
      title: `この音を意識`,
      body: `${blockLabel} — ${hint}`,
      score: null,
    });
  };

  const startRecording = () => {
    setIsRecording(true);
    setFeedback({
      tone: 'neutral',
      title: '録音中',
      body: '今の音をまねして言ってみよう。',
      score: null,
    });
  };

  const stopRecording = () => {
    if (!currentWord) return;
    setIsRecording(false);
    const nextAttempt = attemptCount + 1;
    setAttemptCount(nextAttempt);
    setFeedback(buildMockFeedback(currentWord, nextAttempt));
  };

  const nextWord = () => {
    if (!words.length) return;
    const nextIndex = Math.min(currentIndex + 1, words.length - 1);
    setCurrentIndex(nextIndex);
    setSelectedBlockId(null);
    setAttemptCount(0);
    setFeedback(getInitialFeedback());
    setIsRecording(false);
  };

  const previousWord = () => {
    if (!words.length) return;
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
    setSelectedBlockId(null);
    setAttemptCount(0);
    setFeedback(getInitialFeedback());
    setIsRecording(false);
  };

  return {
    words,
    currentWord,
    currentIndex,
    progressLabel,
    isRecording,
    selectedBlockId,
    attemptCount,
    feedback,
    playNormal,
    playSlow,
    selectBlock,
    startRecording,
    stopRecording,
    nextWord,
    previousWord,
  };
}
