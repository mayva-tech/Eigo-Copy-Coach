import type { WordEntry } from '@/src/types/track.types';

// ─── 大学受験 Vocabulary ─────────────────────────────────────────────
//
// Placeholder — populate with university entrance exam vocabulary
// when the dataset is ready.
//
// ID convention: use 2001+ to avoid collision with TOEIC ids (1–500+).
//
// Each entry must conform to WordEntry. Japanese enrichment data
// (back-card, antonyms, etc.) can be added in a separate supplemental
// file following the same pattern as the TOEIC data pipeline.
// ─────────────────────────────────────────────────────────────────────

export const JUKEN_WORDS: WordEntry[] = [
  // Example entry (commented out) — uncomment and replicate for real data:
  //
  // {
  //   id: 2001,
  //   word: 'acquire',
  //   stressHint: 'uh-KWYR',
  //   pos: ['verb'],
  //   defs: { verb: 'to gain or obtain something' },
  //   examples: ['She acquired new skills during the internship.'],
  //   phrases: ['acquire knowledge', 'acquire skills', 'newly acquired'],
  //   synonyms: ['obtain', 'gain', 'get', 'secure'],
  //   difficulty: 'Word stress',
  //   pronNote: 'Stress on 2nd syllable: uh-KWYR. /kw/ cluster — no extra vowel.',
  // },
];
