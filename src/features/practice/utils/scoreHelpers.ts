import type { WordItem } from '@/src/types/word';
import type { PracticeFeedback } from '@/src/features/practice/types/practice.types';

export function getInitialFeedback(): PracticeFeedback {
  return {
    tone: 'neutral',
    title: 'まずは聞いてみよう',
    body: 'Play か Slow を押して、音の形をつかもう。',
    score: null,
  };
}

export function buildMockFeedback(word: WordItem, attemptCount: number): PracticeFeedback {
  if (attemptCount <= 1) {
    return {
      tone: 'neutral',
      title: 'いい感じ',
      body: `「${word.sayItLike}」の形に近づけよう。${word.mouthTipJa}`,
      score: 72,
    };
  }

  if (attemptCount === 2) {
    return {
      tone: 'good',
      title: 'かなり良い',
      body: `スペルではなく音で言えている。${word.avoidGuide} っぽくしないのが大事。`,
      score: 84,
    };
  }

  return {
    tone: 'good',
    title: 'よくできた',
    body: 'この調子で次の単語へ進もう。',
    score: 92,
  };
}
