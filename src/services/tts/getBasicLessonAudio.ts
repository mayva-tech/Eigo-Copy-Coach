import { fetchTtsAudioToTempFile } from './fetchTtsAudioToTempFile';

/**
 * Free tier: returns a playable `file://` URI.
 * Currently uses the same backend TTS as previews until bundled / on-device basic audio exists.
 */
export async function getBasicLessonAudio(
  text: string,
  mode: 'normal' | 'slow' = 'normal',
): Promise<string> {
  const backendMode = mode === 'slow' ? 'headword_slow' : 'headword_normal';
  return fetchTtsAudioToTempFile(text, backendMode);
}
