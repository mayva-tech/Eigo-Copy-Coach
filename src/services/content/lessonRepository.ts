// ─── Lesson / Word Repository ────────────────────────────────────────
//
// MIGRATION BRIDGE: Preserves getLessonWords(lessonId) + LESSON_TOEIC_ID
// for usePracticeSession, SessionCompleteScreen, and home/review flows.
// Track system (WordEntry) powers getDailySessionWords for session manager.
// ─────────────────────────────────────────────────────────────────────

import { dailyLesson01 } from '@/src/data/lessons/dailyLesson01';
import type { WordItem } from '@/src/types/word';
import type { TrackId, WordEntry } from '@/src/types/track.types';
import { useTrackStore } from '@/src/store/useTrackStore';
import { useProgressStore } from '@/src/store/useProgressStore';

/** User-built list from TOEIC vocab (persisted in `useToeicPracticeStore`). */
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

/**
 * Legacy synchronous API: words for built-in lessons (`lesson-01`).
 * TOEIC practice does not use this — `usePracticeSession` reads `useToeicPracticeStore` when `lessonId === LESSON_TOEIC_ID`.
 */
export function getLessonWords(lessonId: string): WordItem[] {
  return lessonMap[lessonId] ?? lessonMap['lesson-01'] ?? [];
}

/**
 * Track-based word list for session manager / future flows.
 * Loads via `useTrackStore` (cached per session).
 */
export async function getLessonWordsForTrack(
  trackId?: TrackId,
): Promise<WordEntry[]> {
  const store = useTrackStore.getState();
  const id = trackId ?? store.activeTrackId;
  return store.loadTrackWords(id);
}

/**
 * Picks N words for a daily practice session (Phase 1: first N from track).
 * Phase 4: replace with SRS-lite selection.
 */
export async function getDailySessionWords(
  trackId?: TrackId,
  count: number = 5,
): Promise<WordEntry[]> {
  const allWords = await getLessonWordsForTrack(trackId);
  const resolvedTrack = trackId ?? useTrackStore.getState().activeTrackId;
  const progress = useProgressStore.getState();
  const todayMs = Date.now();

  type ScoredWord = { word: WordEntry; urgency: number; isNew: boolean };

  const scored: ScoredWord[] = allWords.map((w) => {
    const p = progress.getWordMastery(resolvedTrack, w.id);

    if (!p) {
      return { word: w, urgency: 50, isNew: true };
    }

    const daysSince = Math.floor((todayMs - new Date(p.lastPracticedAt).getTime()) / 86_400_000);
    const masteryFactor = (4 - p.masteryLevel) * 20;
    const timeFactor = Math.min(daysSince, 30) * 2;
    const failBoost = p.consecutivePasses === 0 && p.totalAttempts > 0 ? 25 : 0;
    const intervalPenalty =
      p.masteryLevel === 4 && daysSince < 7
        ? -40
        : p.masteryLevel === 3 && daysSince < 3
          ? -20
          : 0;

    const urgency = masteryFactor + timeFactor + failBoost + intervalPenalty;
    return { word: w, urgency, isNew: false };
  });

  scored.sort((a, b) => b.urgency - a.urgency);

  const result: WordEntry[] = [];
  const firstNew = scored.find((s) => s.isNew);
  if (firstNew && count > 0) {
    result.push(firstNew.word);
  }

  const addedIds = new Set(result.map((w) => w.id));
  for (const s of scored) {
    if (result.length >= count) break;
    if (addedIds.has(s.word.id)) continue;
    result.push(s.word);
    addedIds.add(s.word.id);
  }

  return result;
}

