import type { PracticeFeedback, PracticeFeedbackTone } from '@/src/features/practice/types/practice.types';
import type { PronunciationScoreResult } from '../../../services/scoring/scoringBackendClient';

export function getInitialFeedback(): PracticeFeedback {
  return {
    tone: 'neutral',
    title: 'まずきいてみよう',
    body: 'Play か Slow をおして、音のかたちをつかもう。',
    score: null,
  };
}

/**
 * Converts a real Azure pronunciation assessment result into a PracticeFeedback
 * object for display. The `feedback` string from the backend is already bilingual
 * and learner-friendly — we just map the score to a tone and title.
 */
export function buildFeedbackFromScore(result: PronunciationScoreResult): PracticeFeedback {
  const score = result.pronunciationScore;

  let tone: PracticeFeedbackTone;
  let title: string;

  if (score >= 85) {
    tone = 'good';
    title = 'よくできた！';
  } else if (score >= 65) {
    tone = 'neutral';
    title = 'いいかんじ';
  } else {
    tone = 'warn';
    title = 'もう一度';
  }

  return {
    tone,
    title,
    body: result.feedback,
    score,
    wordScores: result.words.map((w) => ({
      word: w.word,
      accuracyScore: w.accuracyScore,
      errorType: w.errorType,
    })),
  };
}

/** When the learner stops recording without a usable file. */
export function buildNoRecordingFeedback(): PracticeFeedback {
  return {
    tone: 'warn',
    title: '録音がありません',
    body: 'マイクボタンで録音してから、もう一度ためしてね。',
    score: null,
  };
}

/** When Azure scoring fails (network, backend, or bad response). No fake numeric score. */
export function buildScoringErrorFeedback(err: unknown): PracticeFeedback {
  const detail = err instanceof Error ? err.message : String(err);
  return {
    tone: 'warn',
    title: 'スコアを取得できませんでした',
    body:
      'バックエンド（/score-pronunciation）に届いていない可能性があります。Wi‑Fiとサーバーを確認してね。' +
      (detail ? `\n${detail.slice(0, 200)}` : ''),
    score: null,
  };
}
