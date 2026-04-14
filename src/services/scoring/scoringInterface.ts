// ─── Scoring Provider Abstraction (Phase 2) ───────────────────────────

import type { PronunciationScoreResult } from './scoringBackendClient';

export interface ScoringProvider {
  score(
    audioUri: string,
    referenceText: string,
  ): Promise<PronunciationScoreResult>;
}

export const azureProvider: ScoringProvider = {
  score: async (audioUri, referenceText) => {
    const { scorePronunciation } = await import('./scoringBackendClient');
    return scorePronunciation(audioUri, referenceText);
  },
};

export const mockProvider: ScoringProvider = {
  score: async (_audioUri, _referenceText) => {
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));

    const base = 55 + Math.random() * 40;

    return {
      accuracyScore: Math.round(base + Math.random() * 5),
      fluencyScore: Math.round(base - 5 + Math.random() * 10),
      completenessScore: 100,
      pronunciationScore: Math.round(base),
      words: [],
      feedback: 'Mock score — connect backend for real results.',
    };
  },
};

let _activeProvider: ScoringProvider = azureProvider;

export function setScoringProvider(provider: ScoringProvider): void {
  _activeProvider = provider;
}

export function getScorer(): ScoringProvider {
  return _activeProvider;
}
