export type WordItem = {
  id: string;
  word: string;
  /** Japanese gloss for the headword (reference only on the word card). */
  meaningJa: string;
  sayItLike: string;
  slowGuide: string;
  avoidGuide: string;
  mouthTipJa: string;
  category: string;
};
