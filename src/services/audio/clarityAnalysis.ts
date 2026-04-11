import { createAudioPlayer } from 'expo-audio';

/**
 * Loads duration (seconds) for a local or remote audio URI.
 * Uses a short-lived player and polls until metadata is ready.
 */
export async function loadAudioDurationSeconds(uri: string): Promise<number> {
  const player = createAudioPlayer({ uri });
  try {
    for (let i = 0; i < 60; i++) {
      const d = player.currentStatus.duration;
      if (d > 0.01) return d;
      await new Promise((r) => setTimeout(r, 80));
    }
    return Math.max(0, player.currentStatus.duration);
  } finally {
    player.remove();
  }
}

export type ClarityVsTtsResult = {
  score: number;
  /** Short JP line for UI */
  labelJa: string;
};

/**
 * Heuristic “clarity” vs reference TTS: duration similarity + practice session score.
 * Not a phonetic model — gives a stable, explainable number for learners.
 */
export async function analyzeClarityVsTts(params: {
  userRecordingUri: string;
  ttsUri: string;
  sessionScore: number | null;
}): Promise<ClarityVsTtsResult> {
  const { userRecordingUri, ttsUri, sessionScore } = params;
  let userDur = 0;
  let ttsDur = 0;
  try {
    [userDur, ttsDur] = await Promise.all([
      loadAudioDurationSeconds(userRecordingUri),
      loadAudioDurationSeconds(ttsUri),
    ]);
  } catch {
    return fallbackClarity(sessionScore);
  }

  if (userDur <= 0 || ttsDur <= 0) {
    return fallbackClarity(sessionScore);
  }

  const ratio = Math.min(userDur, ttsDur) / Math.max(userDur, ttsDur);
  const durationScore = Math.round(55 + 45 * ratio);
  const base = sessionScore ?? 78;
  const blended = Math.round(0.42 * durationScore + 0.58 * base);
  const score = Math.min(100, Math.max(0, blended));

  let labelJa = 'TTS と長さをくらべたはっきり度';
  if (ratio >= 0.88) labelJa = 'TTS にちかい長さ';
  else if (ratio >= 0.72) labelJa = 'ちょっとちがう長さ';
  else labelJa = '長さの差がおおきい';

  return { score, labelJa };
}

function fallbackClarity(sessionScore: number | null): ClarityVsTtsResult {
  const score = Math.min(100, Math.max(0, Math.round(sessionScore ?? 75)));
  return { score, labelJa: 'はっきり度（かんたん）' };
}
