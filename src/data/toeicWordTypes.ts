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
  /** English definition lines; may include empty strings when JA has extra rows for one EN sense. */
  definitions: string[];
  /** Japanese glosses per row (aligned with `definitions`; empty EN row = extra JA sense line). */
  definitionsJa: string[];
  example: string;
  exampleJa: string;
  /** Collocation chips with Japanese gloss (tap still speaks English). */
  phrases: { en: string; ja: string }[];
  synonyms: string[];
  /** Parallel short Japanese glosses for each synonym. */
  synonymsJa: string[];
  antonyms: string[];
  /** Parallel short Japanese glosses for each antonym. */
  antonymsJa: string[];
  /** English pronunciation tip (IPA stripped at build). */
  pronunciationTipJa: string;
  /** Japanese explanation of the same tip; use for display + ja-JP TTS. */
  tipJa: string;
};
