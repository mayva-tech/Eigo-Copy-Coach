import { dailyLesson01 } from '@/src/data/lessons/dailyLesson01';
import type { WordItem } from '@/src/types/word';

const lessonMap: Record<string, WordItem[]> = {
  'lesson-01': dailyLesson01,
};

export function getLessonWords(lessonId: string): WordItem[] {
  return lessonMap[lessonId] ?? lessonMap['lesson-01'] ?? [];
}
