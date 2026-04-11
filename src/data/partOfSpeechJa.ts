/** Japanese school-grammar labels for English POS tags used in TOEIC data. */
const PART_OF_SPEECH_JA: Readonly<Record<string, string>> = {
  noun: '名詞',
  verb: '動詞',
  adjective: '形容詞',
  adverb: '副詞',
  preposition: '前置詞',
};

export function partOfSpeechLabelEnJa(pos: string): string {
  const ja = PART_OF_SPEECH_JA[pos];
  return ja != null ? `${pos} · ${ja}` : pos;
}

export function formatPartOfSpeechLine(posList: string[]): string {
  return posList.map(partOfSpeechLabelEnJa).join('/');
}
