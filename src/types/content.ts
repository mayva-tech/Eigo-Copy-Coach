export type WordEntry = {
  id: string;
  word: string;
  difficulty: string;
  lessonType: string;
  audioKey: string | null;
};

export type WordsFile = {
  words: WordEntry[];
};
