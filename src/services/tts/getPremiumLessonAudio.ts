/**
 * Connect this to your existing working Google TTS backend call.
 * Must return a playable URI for expo-audio.
 */
import { fetchTtsAudioToTempFile } from './fetchTtsAudioToTempFile';

export async function getPremiumLessonAudio(
  text: string,
  mode: 'normal' | 'slow' = 'normal',
): Promise<string> {
  const backendMode = mode === 'slow' ? 'headword_slow' : 'headword_normal';
  return await fetchTtsAudioToTempFile(text, backendMode);
}
