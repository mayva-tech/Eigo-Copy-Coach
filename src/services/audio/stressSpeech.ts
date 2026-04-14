import * as Speech from 'expo-speech';

type HeadwordMode = 'normal' | 'slow';

/** Device headword rates (must match referenceSpeech DEVICE_HEADWORD_RATE). */
const DEVICE_HEADWORD_RATE: Record<HeadwordMode, number> = {
  normal: 0.7,
  slow: 0.1,
};

export type ParsedStressHint = {
  syllables: string[];
  /** Index of the stressed syllable (0-based). */
  stressIndex: number;
};

/**
 * Parses TOEIC `stressHint` strings like `pri-ZERV` or
 * `stress on 2nd syllable: pri-ZERV` into speakable syllables.
 * Returns null when the hint is not hyphenated multi-syllable stress markup.
 */
export function parseStressHintForSpeech(hint: string): ParsedStressHint | null {
  const trimmed = hint.trim();
  if (!trimmed) return null;

  let body = trimmed.replace(/^stress\s+on\s+\d+(?:st|nd|rd|th)?\s+syllable:\s*/i, '').trim();
  if (body.includes(':')) {
    const parts = body.split(':');
    body = parts[parts.length - 1]!.trim();
  }

  if (!body.includes('-')) return null;

  const rawParts = body
    .split('-')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (rawParts.length < 2) return null;

  let stressIndex = -1;
  for (let i = 0; i < rawParts.length; i++) {
    if (/[A-Z]/.test(rawParts[i]!)) {
      stressIndex = i;
      break;
    }
  }
  if (stressIndex < 0) return null;

  const syllables = rawParts.map((p) =>
    p
      .replace(/[^a-zA-Z']/g, '')
      .toLowerCase(),
  );
  if (syllables.some((s) => s.length === 0)) return null;

  return { syllables, stressIndex };
}

function speakSegmentAsync(text: string, rate: number, pitch: number): Promise<void> {
  return new Promise((resolve, reject) => {
    Speech.speak(text, {
      language: 'en-US',
      rate,
      pitch,
      onDone: () => resolve(),
      onError: (e) => reject(e),
    });
  });
}

/**
 * Speaks hyphen-marked syllables with higher pitch on the stressed segment (expo-speech).
 * Used when backend whole-word TTS would hide stress.
 */
export async function speakStressSyllables(parsed: ParsedStressHint, mode: HeadwordMode): Promise<void> {
  const rate = DEVICE_HEADWORD_RATE[mode];
  const { syllables, stressIndex } = parsed;
  const unstressedPitch = 0.88;
  const stressedPitch = mode === 'slow' ? 1.12 : 1.22;

  await Speech.stop();

  for (let i = 0; i < syllables.length; i++) {
    const seg = syllables[i]!;
    const pitch = i === stressIndex ? stressedPitch : unstressedPitch;
    await speakSegmentAsync(seg, rate, pitch);
    if (i < syllables.length - 1) {
      await new Promise((r) => setTimeout(r, 28));
    }
  }
}
