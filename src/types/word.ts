export type SoundBlock = {
  id: string;
  label: string;
  hint: string;
};

export type WordItem = {
  id: string;
  word: string;
  sayItLike: string;
  slowGuide: string;
  avoidGuide: string;
  mouthTipJa: string;
  category: string;
  soundBlocks?: SoundBlock[];
};
