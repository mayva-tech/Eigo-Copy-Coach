import { dailyLesson01 } from '@/src/data/lessons/dailyLesson01';
import type { WordItem } from '@/src/types/word';

/** User-built list from TOEIC vocab (persisted list in `useToeicPracticeStore`). */
export const LESSON_TOEIC_ID = 'lesson-toeic';

const lessonMap: Record<string, WordItem[]> = {
  'lesson-01': dailyLesson01,
};

/** Display title for lesson headers (English, mockup style). */
const lessonTitles: Record<string, string> = {
  'lesson-01': 'R and L sounds',
  [LESSON_TOEIC_ID]: 'TOEIC words',
};

const lessonTitlesJa: Record<string, string> = {
  'lesson-01': 'カタカナ読みをなおす',
  [LESSON_TOEIC_ID]: 'TOEIC 単語練習',
};

export function getLessonTitle(lessonId: string): string {
  return lessonTitles[lessonId] ?? 'Daily practice';
}

/** Japanese gloss for the current lesson title (home / headers). */
export function getLessonTitleJa(lessonId: string): string {
  return lessonTitlesJa[lessonId] ?? 'まいにちのれんしゅう';
}

export function getLessonWords(lessonId: string): WordItem[] {
  return lessonMap[lessonId] ?? lessonMap['lesson-01'] ?? [];
}
