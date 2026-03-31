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
    titleJa: 'THの音',
    examples: 'think, this, three',
    examplesJa: '例：舌を出す「ス」の音',
  },
  {
    id: 'vo',
    badge: 'Vo',
    title: 'Extra vowels',
    titleJa: '余分な母音',
    examples: 'cat, desk, stop',
    examplesJa: 'カタカナに足しがちな母音',
  },
  {
    id: 'st',
    badge: 'St',
    title: 'Word stress',
    titleJa: 'アクセント',
    examples: 'table, about, banana',
    examplesJa: '強く読む音節の位置',
  },
];
