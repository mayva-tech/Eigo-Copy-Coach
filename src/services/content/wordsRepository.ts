import wordsJson from '@/src/content/words.json';
import type { WordEntry, WordsFile } from '@/src/types/content';

const data = wordsJson as WordsFile;

export function getAllWords(): WordEntry[] {
  return data.words;
}

export function getWordById(id: string): WordEntry | undefined {
  return data.words.find((w) => w.id === id);
}
