/** Pronunciation / fluency scoring pipeline. */

export { scorePronunciation, scorePronunciationWithRetry } from './scoringBackendClient';
export type { PronunciationScoreResult, WordResult } from './scoringBackendClient';

export {
  azureProvider,
  mockProvider,
  getScorer,
  setScoringProvider,
} from './scoringInterface';
export type { ScoringProvider } from './scoringInterface';

export { isBackendAvailable, invalidateHealthCache } from './backendHealthCheck';
