import { TOEIC_WORDS } from '@/src/data/toeicWords';

/** Returns romaji stress markup for a practice `WordItem.id` like `toeic-42`. */
export function getStressHintForToeicPracticeWordId(wordId: string | undefined | null): string | undefined {
  if (!wordId?.startsWith('toeic-')) return undefined;
  const n = parseInt(wordId.slice('toeic-'.length), 10);
  if (Number.isNaN(n)) return undefined;
  return TOEIC_WORDS.find((w) => w.id === n)?.stressHint;
}
