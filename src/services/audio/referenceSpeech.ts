import * as Speech from 'expo-speech';

import {
  pauseBackendTtsPlayback,
  playTtsFromBackend,
} from '@/src/services/audio/backendTtsPlay';
import { parseStressHintForSpeech, speakStressSyllables } from '@/src/services/audio/stressSpeech';
import type { TtsBackendMode } from '@/src/services/tts/ttsBackendClient';
import { getTtsDevBaseUrlOptional } from '@/src/services/tts/ttsBackendClient';

/** Main word: Play / Slow (practice + TOEIC headword). */
export type EnglishHeadwordMode = 'normal' | 'slow';

/** Phrase sample chips only — independent device/backend rates from headword. */
export type EnglishPhraseSampleMode = 'baseline' | 'fast';

/** Device TTS only (no `EXPO_PUBLIC_TTS_DEV_URL`). Lower = slower. */
const DEVICE_HEADWORD_RATE: Record<EnglishHeadwordMode, number> = {
  normal: 0.7,
  slow: 0.1,
};

/**
 * Device TTS only for phrase taps (`speakEnglishPhraseSample`).
 * When backend TTS is on, change speeds in `backend/src/index.ts` → `phrase_baseline` / `phrase_fast`.
 * (Previously baseline matched headword Play, so they sounded the same.)
 */
const DEVICE_PHRASE_SAMPLE_RATE: Record<EnglishPhraseSampleMode, number> = {
  baseline: 0.32,
  fast: 0.55,
};

/** Phrase Japanese gloss — device only; matches phrase toggle (Slow = ゆっくり, Normal = ふつう). */
const DEVICE_JA_PHRASE_RATE: Record<EnglishPhraseSampleMode, number> = {
  baseline: 0.40,
  fast: 0.80,
};

const BACKEND_TTS_TIMEOUT_MS = 1200;
const BACKEND_TTS_FAIL_COOLDOWN_MS = 60_000;
let backendTtsDisabledUntilMs = 0;

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    return await Promise.race<T>([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`Backend TTS timeout (${ms}ms)`)), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function speakEnglishWithBackendMode(
  text: string,
  backendMode: TtsBackendMode,
  deviceRate: number,
): Promise<void> {
  const backendUrl = getTtsDevBaseUrlOptional();
  const now = Date.now();
  if (backendUrl && now >= backendTtsDisabledUntilMs) {
    try {
      await Speech.stop();
      await withTimeout(playTtsFromBackend(backendUrl, text, backendMode), BACKEND_TTS_TIMEOUT_MS);
      return;
    } catch (e) {
      backendTtsDisabledUntilMs = Date.now() + BACKEND_TTS_FAIL_COOLDOWN_MS;
      console.warn('[referenceSpeech] Backend TTS failed, using device TTS', e);
    }
  }

  pauseBackendTtsPlayback();
  await Speech.stop();
  Speech.speak(text, {
    language: 'en-US',
    rate: deviceRate,
    pitch: 0.77,
  });
}

/**
 * Headword reference: Play (`normal`) / Slow (`slow`). Rates are separate from {@link speakEnglishPhraseSample}.
 */
export async function speakEnglishWord(word: string, mode: EnglishHeadwordMode): Promise<void> {
  const backendMode: TtsBackendMode = mode === 'slow' ? 'headword_slow' : 'headword_normal';
  await speakEnglishWithBackendMode(word, backendMode, DEVICE_HEADWORD_RATE[mode]);
}

/**
 * Headword with optional TOEIC stress markup (e.g. `pri-ZERV`). Uses hyphen-split
 * expo-speech with higher pitch on the capitalized syllable when parseable; otherwise
 * delegates to {@link speakEnglishWord} (backend or flat device TTS).
 */
export async function speakEnglishHeadword(
  word: string,
  mode: EnglishHeadwordMode,
  stressHint?: string | null,
): Promise<void> {
  const parsed = stressHint ? parseStressHintForSpeech(stressHint) : null;
  if (parsed && parsed.syllables.length >= 2) {
    pauseBackendTtsPlayback();
    await Speech.stop();
    await speakStressSyllables(parsed, mode);
    return;
  }
  await speakEnglishWord(word, mode);
}

/**
 * TOEIC (etc.) phrase English line. `baseline` matches the previous default phrase speed; `fast` is quicker.
 * Tuned via {@link DEVICE_PHRASE_SAMPLE_RATE} and backend `phrase_*` modes — not linked to headword Play/Slow.
 */
export async function speakEnglishPhraseSample(
  text: string,
  mode: EnglishPhraseSampleMode,
): Promise<void> {
  const backendMode: TtsBackendMode = mode === 'fast' ? 'phrase_fast' : 'phrase_baseline';
  await speakEnglishWithBackendMode(text, backendMode, DEVICE_PHRASE_SAMPLE_RATE[mode]);
}

/**
 * Phrase glosses — device `ja-JP` TTS only. Use same phrase toggle as English: `baseline` = slow (0.42), `fast` = normal.
 * Tune in {@link DEVICE_JA_PHRASE_RATE}.
 */
export async function speakJapaneseText(
  text: string,
  phraseSpeed: EnglishPhraseSampleMode = 'baseline',
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed) return;

  pauseBackendTtsPlayback();
  await Speech.stop();
  Speech.speak(trimmed, {
    language: 'ja-JP',
    rate: DEVICE_JA_PHRASE_RATE[phraseSpeed],
    pitch: 1.0,
  });
}
