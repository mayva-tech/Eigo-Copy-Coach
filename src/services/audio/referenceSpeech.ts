import * as Speech from 'expo-speech';

/**
 * Speaks the headword with device TTS (Play / Slow). Not a studio reference track—good enough for MVP.
 * Stops any current speech first so taps don’t queue endlessly.
 */
export async function speakEnglishWord(word: string, mode: 'normal' | 'slow'): Promise<void> {
  await Speech.stop();
  // Expo: 1.0 = normal on both platforms. iOS native multiplies by AVSpeechUtteranceDefaultSpeechRate; very low
  // values (e.g. 0.18 vs 0.38) can end up similarly after system clamping, so Play/Slow sounded the same.
  const rate = mode === 'slow' ? 0.5 : 1.0;
  Speech.speak(word, {
    language: 'en-US',
    rate,
    pitch: 0.95,
  });
}
