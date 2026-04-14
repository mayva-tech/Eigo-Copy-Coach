// ─── Track & Word Types ──────────────────────────────────────────────
//
// WordEntry is the MINIMAL contract for the practice engine.
// It does NOT replace ToeicWord — the TOEIC track continues to use
// ToeicWord internally and maps to WordEntry at the boundary.
//
// This lets 大学受験 data use a simpler shape while sharing the
// same practice flow.
// ─────────────────────────────────────────────────────────────────────

export type TrackId = 'toeic' | 'juken';

export type DifficultyCategory =
  | 'R-blend'
  | 'R vs L'
  | 'Vowel /æ/'
  | 'Final consonant'
  | 'Long vowel'
  | 'Word stress'
  | 'TH sound'
  | 'TH/SH sounds'
  | 'Silent letter'
  | 'Vowel length';

export type MasteryLevel = 0 | 1 | 2 | 3 | 4;
// 0 = New  |  1 = Seen  |  2 = Practiced  |  3 = Learned  |  4 = Mastered

/**
 * Minimal word shape consumed by the practice engine.
 * Both tracks must conform to this. Track-specific enrichment
 * (Japanese back-card data, antonyms, etc.) lives in track-specific types.
 */
export interface WordEntry {
  /** Unique within track. TOEIC: 1–500+, juken: 2001+ */
  id: number;
  word: string;
  stressHint: string;
  pos: string[];
  defs: Record<string, string>;
  examples: string[];
  phrases: string[];
  synonyms: string[];
  difficulty: DifficultyCategory;
  pronNote: string;
}

export interface TrackConfig {
  id: TrackId;
  labelKey: string;
  descriptionKey: string;
  icon: string;
  totalWords: number;
  freeWordLimit: number;
  /** Lazy loader — returns WordEntry[] for the practice engine */
  loadWords: () => Promise<WordEntry[]>;
}
