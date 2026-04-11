import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOEIC_WORD_STATS_STORAGE_KEY = 'toeic_word_stats_v1';

export type ToeicWordStatEntry = {
  /** Headword listen + practice completions (ms); trimmed to ~2 weeks on disk. */
  activityTimestamps: number[];
  /** Recent mock scores from pronunciation practice (TOEIC list only). */
  practiceScores: number[];
  /** User-set 0–100 when no practice scores yet, or blended display fallback. */
  userConfidence: number | null;
};

export async function saveToeicWordStats(byId: Record<number, ToeicWordStatEntry>): Promise<void> {
  try {
    const serial: Record<string, ToeicWordStatEntry> = {};
    for (const [k, v] of Object.entries(byId)) {
      serial[String(k)] = v;
    }
    await AsyncStorage.setItem(TOEIC_WORD_STATS_STORAGE_KEY, JSON.stringify(serial));
  } catch (error) {
    console.error('saveToeicWordStats error', error);
  }
}

export async function loadToeicWordStats(): Promise<Record<number, ToeicWordStatEntry>> {
  try {
    const raw = await AsyncStorage.getItem(TOEIC_WORD_STATS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ToeicWordStatEntry>;
    const out: Record<number, ToeicWordStatEntry> = {};
    for (const [k, v] of Object.entries(parsed)) {
      const n = Number(k);
      if (!Number.isNaN(n) && v && Array.isArray(v.activityTimestamps)) {
        out[n] = {
          activityTimestamps: v.activityTimestamps ?? [],
          practiceScores: Array.isArray(v.practiceScores) ? v.practiceScores : [],
          userConfidence: typeof v.userConfidence === 'number' ? v.userConfidence : null,
        };
      }
    }
    return out;
  } catch (error) {
    console.error('loadToeicWordStats error', error);
    return {};
  }
}
