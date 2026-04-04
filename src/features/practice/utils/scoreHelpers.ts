import type { WordItem } from '@/src/types/word';
import type { PracticeFeedback } from '@/src/features/practice/types/practice.types';

export function getInitialFeedback(): PracticeFeedback {
  return {
    tone: 'neutral',
    title: 'まずきいてみよう',
    body: 'Play か Slow をおして、音のかたちをつかもう。',
    score: null,
  };
}

export function buildMockFeedback(word: WordItem, attemptCount: number): PracticeFeedback {
  if (attemptCount <= 1) {
    return {
      tone: 'neutral',
      title: 'いいかんじ',
      body: `「${word.sayItLike}」に近づけよう。${word.mouthTipJa}`,
      score: 72,
    };
  }

  if (attemptCount === 2) {
    return {
      tone: 'good',
      title: 'かなりよい',
      body: `スペルじゃなく音でいえてる。${word.avoidGuide} みたいに言わないのがだいじ。`,
      score: 84,
    };
  }

  return {
    tone: 'good',
    title: 'よくできた',
    body: 'このちょうしで、つぎのたんごへいこう。',
    score: 92,
  };
}
