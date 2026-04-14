/**
 * scoringBackendClient.ts
 *
 * Reads an Expo-recorded audio file from the device filesystem,
 * encodes it as base64, and POSTs it to the backend /score-pronunciation
 * endpoint for Azure pronunciation assessment.
 *
 * Uses `readAsStringAsync` from `expo-file-system/legacy` with base64 encoding.
 * The default `expo-file-system` export stubs legacy methods and **throws** at
 * runtime (SDK 54+); the legacy entry re-exports the real implementation.
 */

import { readAsStringAsync } from 'expo-file-system/legacy';
import { getTtsDevBaseUrlFromEnv } from '../tts/ttsBackendClient';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WordResult {
  word: string;
  accuracyScore: number;
  errorType: 'None' | 'Mispronunciation' | 'Omission' | 'Insertion';
}

export interface PronunciationScoreResult {
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  /** Primary score to show the learner (0–100). */
  pronunciationScore: number;
  words: WordResult[];
  /** Short bilingual feedback string, ready to display. */
  feedback: string;
}

interface BackendErrorResponse {
  error: string;
}

/** Avoid `res.json()` when the server returns HTML (404/500 pages) — gives a clear error instead of SyntaxError. */
async function parseJsonBody(res: Response, endpointLabel: string): Promise<unknown> {
  const raw = await res.text();
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error(`Empty response from ${endpointLabel} (HTTP ${res.status}).`);
  }
  if (trimmed.startsWith('<')) {
    throw new Error(
      `Server returned HTML, not JSON, from ${endpointLabel} (HTTP ${res.status}). ` +
        `Common causes: backend was not restarted after adding /score-pronunciation, ` +
        `you are running an old dist/ build (run \`npm run build\` in backend), or a proxy returned an error page.`,
    );
  }
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    throw new Error(
      `Invalid JSON from ${endpointLabel} (HTTP ${res.status}): ${trimmed.slice(0, 180)}`,
    );
  }
}

// ─── File → base64 ────────────────────────────────────────────────────────────

/**
 * Reads a local `file://` URI and returns its contents as a base64 string.
 *
 * `readAsStringAsync` with `encoding: 'base64'` from `expo-file-system/legacy`
 * handles iOS and Android paths, including cache URIs from expo-audio.
 *
 * Throws a descriptive error if the file cannot be read (missing, permission
 * denied, empty recording).
 */
async function readFileAsBase64(fileUri: string): Promise<string> {
  let base64: string;

  try {
    base64 = await readAsStringAsync(fileUri, { encoding: 'base64' });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Failed to read recorded audio file.\n` +
        `URI: ${fileUri}\n` +
        `Reason: ${detail}\n` +
        `Check that recording completed successfully before calling scorePronunciation.`,
    );
  }

  if (!base64 || base64.length === 0) {
    throw new Error(
      `Recorded audio file is empty at URI: ${fileUri}.\n` +
        `The recording may have been too short or failed silently.`,
    );
  }

  return base64;
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Score a pronunciation attempt against a reference text.
 *
 * @param recordedUri   `file://` path from `recorder.uri` (expo-audio)
 * @param referenceText The word or phrase the learner was asked to say
 * @param locale        BCP-47 locale for Azure recognition (default: "en-US")
 *
 * Throws on network error, file read error, or backend error response.
 * Callers should wrap in try/catch and fall back to mock feedback if needed.
 */
export async function scorePronunciation(
  recordedUri: string,
  referenceText: string,
  locale = 'en-US',
): Promise<PronunciationScoreResult> {
  if (!recordedUri) {
    throw new Error('scorePronunciation: recordedUri is required.');
  }
  if (!referenceText || !referenceText.trim()) {
    throw new Error('scorePronunciation: referenceText is required.');
  }

  const baseUrl = getTtsDevBaseUrlFromEnv().replace(/\/$/, '');
  const scoreUrl = `${baseUrl}/score-pronunciation`;
  const audioBase64 = await readFileAsBase64(recordedUri);

  let res: Response;
  try {
    res = await fetch(scoreUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioBase64, referenceText, locale }),
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Network error reaching pronunciation backend at ${baseUrl}.\n` +
        `Is the backend server running and reachable from the device?\n` +
        `Detail: ${detail}`,
    );
  }

  const data = (await parseJsonBody(res, scoreUrl)) as PronunciationScoreResult | BackendErrorResponse;

  if (!res.ok) {
    const errMsg = (data as BackendErrorResponse).error ?? `Scoring failed (HTTP ${res.status})`;
    throw new Error(`[score-pronunciation] ${errMsg}`);
  }

  return data as PronunciationScoreResult;
}

// ─── Retry wrapper (Phase 3) ─────────────────────────────────────────────

const MAX_RETRIES = 2;
const RETRY_DELAY_BASE_MS = 800;

/**
 * Calls scorePronunciation with automatic retry + exponential backoff.
 */
export async function scorePronunciationWithRetry(
  audioUri: string,
  referenceText: string,
  locale = 'en-US',
): Promise<PronunciationScoreResult> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await scorePronunciation(audioUri, referenceText, locale);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));

      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_BASE_MS * (attempt + 1);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  throw lastError ?? new Error('scorePronunciationWithRetry: unknown error');
}

