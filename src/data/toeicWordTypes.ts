/** Normalized TOEIC vocab card for the app (stress hint + TTS; tips are IPA-stripped at build/map time). */
export type ToeicWord = {
  id: number;
  word: string;
  /** Romaji-style stress (hyphens, caps) — same source as `stress` in raw data. */
  stressHint: string;
  /** e.g. R-blend, Word stress, TH sound — from source data */
  difficulty: string;
  partOfSpeech: string[];
  meaningJa: string;
  definitions: string[];
  example: string;
  /** Collocation chips with Japanese gloss (tap still speaks English). */
  phrases: { en: string; ja: string }[];
  synonyms: string[];
  pronunciationTipJa: string;
};
