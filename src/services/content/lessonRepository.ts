import { dailyLesson01 } from '@/src/data/lessons/dailyLesson01';
import type { WordItem } from '@/src/types/word';

const lessonMap: Record<string, WordItem[]> = {
  'lesson-01': dailyLesson01.map((item) => ({
    ...item,
    soundBlocks:
      item.id === 'knife'
        ? [
            { id: '1', label: 'nai', hint: 'ナイ' },
            { id: '2', label: 'f', hint: '最後は短く止める' },
          ]
        : item.id === 'island'
          ? [
              { id: '1', label: 'eye', hint: 'アイ' },
              { id: '2', label: 'lənd', hint: '後半は軽く' },
            ]
          : [
              { id: '1', label: 'KUMF', hint: '最初を強めに' },
              { id: '2', label: 'tuh', hint: '軽く短く' },
              { id: '3', label: 'bul', hint: '最後は弱く' },
            ],
  })),
};

export function getLessonWords(lessonId: string): WordItem[] {
  return lessonMap[lessonId] ?? lessonMap['lesson-01'] ?? [];
}
