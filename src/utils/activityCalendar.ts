import type { ToeicWordStatEntry } from '@/src/services/storage/toeicWordStatsStorage';

/** Local calendar day key `YYYY-MM-DD` (no UTC shift from `toISOString`). */
export function dayKeyLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Sum of all headword / practice activity events per local day (all TOEIC words). */
export function aggregateActivityByDay(byId: Record<number, ToeicWordStatEntry>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const e of Object.values(byId)) {
    for (const t of e.activityTimestamps) {
      const k = dayKeyLocal(new Date(t));
      out[k] = (out[k] ?? 0) + 1;
    }
  }
  return out;
}

/**
 * Consecutive local days with ≥1 activity. If today is still empty, counts from yesterday
 * so the streak doesn’t drop to zero before the user practices today.
 */
export function streakConsecutiveDaysLenient(countsByDay: Record<string, number>): number {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  if ((countsByDay[dayKeyLocal(d)] ?? 0) === 0) {
    d.setDate(d.getDate() - 1);
  }
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const k = dayKeyLocal(d);
    if ((countsByDay[k] ?? 0) > 0) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

/** Total activity events in the last 7 local days (rolling). */
export function rollingSevenDayActivityTotal(countsByDay: Record<string, number>): number {
  let sum = 0;
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    const k = dayKeyLocal(d);
    sum += countsByDay[k] ?? 0;
    d.setDate(d.getDate() - 1);
  }
  return sum;
}

export type WordActivityOnDay = {
  toeicId: number;
  word: string;
  /** Activity events that local day for this headword. */
  count: number;
};

/**
 * Headwords that had ≥1 play/practice event on the given local day, with per-word counts.
 */
export function wordsWithActivityOnDay(
  byId: Record<number, ToeicWordStatEntry>,
  dayKey: string,
  wordForId: (toeicId: number) => string | undefined,
): WordActivityOnDay[] {
  const out: WordActivityOnDay[] = [];
  for (const [key, entry] of Object.entries(byId)) {
    const toeicId = Number(key);
    if (Number.isNaN(toeicId)) continue;
    let count = 0;
    for (const t of entry.activityTimestamps) {
      if (dayKeyLocal(new Date(t)) === dayKey) count++;
    }
    if (count === 0) continue;
    const word = wordForId(toeicId);
    if (word) out.push({ toeicId, word, count });
  }
  out.sort((a, b) =>
    b.count !== a.count ? b.count - a.count : a.word.localeCompare(b.word, undefined, { sensitivity: 'base' }),
  );
  return out;
}

export function daysInMonth(year: number, monthIndex0: number): number {
  return new Date(year, monthIndex0 + 1, 0).getDate();
}

export function monthLabel(year: number, monthIndex0: number): string {
  const d = new Date(year, monthIndex0, 1);
  return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
}

/** Home dashboard: streak from any TOEIC listen/practice activity; clarity from all stored practice scores; words = headwords with ≥1 practice score. */
export function aggregateHomeDashboardStats(byId: Record<number, ToeicWordStatEntry>): {
  streakDays: number;
  avgClarityPercent: number | null;
  wordsDoneCount: number;
} {
  const countsByDay = aggregateActivityByDay(byId);
  const streakDays = streakConsecutiveDaysLenient(countsByDay);

  const allScores: number[] = [];
  let wordsDoneCount = 0;
  for (const e of Object.values(byId)) {
    if (e.practiceScores.length > 0) {
      wordsDoneCount += 1;
      for (const s of e.practiceScores) {
        allScores.push(s);
      }
    }
  }
  const avgClarityPercent =
    allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : null;

  return { streakDays, avgClarityPercent, wordsDoneCount };
}
