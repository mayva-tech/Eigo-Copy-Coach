import type { ToeicWord } from '@/src/data/toeicWordTypes';
import { TOEIC_WORDS } from '@/src/data/toeicWords';
import { JUKEN_WORDS } from '@/src/data/jukenWords';
import type { TrackConfig, WordEntry } from '@/src/types/track.types';

// ─── ToeicWord → WordEntry adapter ──────────────────────────────────
// The TOEIC data pipeline produces ToeicWord (enriched type). The practice
// engine only needs WordEntry for track-agnostic session planning.

function toeicToWordEntry(tw: ToeicWord): WordEntry {
  return {
    id: tw.id,
    word: tw.word,
    stressHint: tw.stressHint,
    pos: tw.partOfSpeech,
    defs: tw.partOfSpeech.reduce<Record<string, string>>((acc, pos, i) => {
      if (tw.definitions[i]) acc[pos] = tw.definitions[i];
      return acc;
    }, {}),
    examples: [tw.example],
    phrases: tw.phrases.map((p) => p.en),
    synonyms: tw.synonyms,
    difficulty: tw.difficulty as WordEntry['difficulty'],
    pronNote: tw.pronunciationTipJa,
  };
}

// ─── Track Configs ──────────────────────────────────────────────────

export const TRACKS: Record<string, TrackConfig> = {
  toeic: {
    id: 'toeic',
    labelKey: 'track.toeic',
    descriptionKey: 'track.toeic.desc',
    icon: '💼',
    totalWords: TOEIC_WORDS.length,
    freeWordLimit: 30,
    loadWords: async () => TOEIC_WORDS.map(toeicToWordEntry),
  },
  juken: {
    id: 'juken',
    labelKey: 'track.juken',
    descriptionKey: 'track.juken.desc',
    icon: '🎓',
    totalWords: JUKEN_WORDS.length,
    freeWordLimit: 30,
    loadWords: async () => JUKEN_WORDS,
  },
};

export const DEFAULT_TRACK_ID = 'toeic' as const;

export function getTrackConfig(id: string): TrackConfig | undefined {
  return TRACKS[id];
}

export function getAllTrackIds(): string[] {
  return Object.keys(TRACKS);
}
