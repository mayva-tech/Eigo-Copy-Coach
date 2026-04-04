/**
 * Japanese glosses for pronunciation-focus tags on TOEIC cards (`difficulty` in raw data).
 * Keys must match the English strings in `toeicWords.ts` exactly.
 */
const PRONUNCIATION_FOCUS_JA: Readonly<Record<string, string>> = {
  'Word stress': '単語アクセント',
  'R-blend': 'R＋子音の連結',
  'R vs L': 'RとLの区別',
  'Long vowel': '長母音',
  'Final consonant': '語末の子音',
  'Vowel /æ/': '母音 æ（ア）',
  'Vowel length': '母音の長短',
  'TH sound': 'TH音',
  'TH/SH sounds': 'TH音・SH音',
  'Silent letter': '不発音の字',
};

export function pronunciationFocusLabelEnJa(focus: string): string {
  const ja = PRONUNCIATION_FOCUS_JA[focus];
  return ja != null ? `${focus} · ${ja}` : focus;
}

/** Two-line badge: English pronunciation-focus tag, optional Japanese gloss below. */
export function pronunciationFocusParts(focus: string): { en: string; ja?: string } {
  const ja = PRONUNCIATION_FOCUS_JA[focus];
  return ja != null ? { en: focus, ja } : { en: focus };
}
