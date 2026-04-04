export type FocusAreaItem = {
  id: string;
  badge: string;
  title: string;
  /** Japanese gloss for the focus title. */
  titleJa: string;
  examples: string;
  /** Short Japanese note for the example words (meaning / tip). */
  examplesJa: string;
};

/** Static focus areas — swap for CMS or lesson-linked data later. */
export const FOCUS_AREAS: FocusAreaItem[] = [
  {
    id: 'th',
    badge: 'TH',
    title: 'TH sounds',
    titleJa: 'TH の音',
    examples: 'think, this, three',
    examplesJa: '舌を少し出す「ス」に近い音',
  },
  {
    id: 'vo',
    badge: 'Vo',
    title: 'Extra vowels',
    titleJa: 'ふえやすい母音',
    examples: 'cat, desk, stop',
    examplesJa: 'カタカナに足しがちな「あ・い…」',
  },
  {
    id: 'st',
    badge: 'St',
    title: 'Word stress',
    titleJa: 'アクセント（強くいうところ）',
    examples: 'table, about, banana',
    examplesJa: 'どの音節を強くいうか',
  },
];
