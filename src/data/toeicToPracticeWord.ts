import type { ToeicWord } from '@/src/data/toeicWordTypes';
import type { WordItem } from '@/src/types/word';

/** Maps a TOEIC card into the shape expected by {@link usePracticeSession} / {@link PracticeScreen}. */
export function toeicWordToPracticeItem(w: ToeicWord): WordItem {
  const meaningJa =
    w.meaningJa.trim() ||
    w.definitionsJa.filter((s) => s.trim().length > 0).join(' · ') ||
    w.definitions.join(' · ');
  const slowGuide = w.stressHint.includes('-')
    ? w.stressHint.replace(/-/g, ' ... ')
    : `${w.stressHint}（ゆっくり）`;
  return {
    id: `toeic-${w.id}`,
    word: w.word,
    meaningJa,
    sayItLike: w.stressHint,
    slowGuide,
    avoidGuide: w.pronunciationTipJa || w.tipJa || '—',
    mouthTipJa: w.tipJa || w.pronunciationTipJa || '',
    category: 'toeic',
  };
}
