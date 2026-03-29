import { createAudioPlayer } from 'expo-audio';

import {
  fetchTtsAudioBase64,
  normalizeTtsBaseUrl,
  saveTtsMp3ToCache,
} from '@/src/services/tts/ttsBackendClient';

/**
 * Calls your dev TTS backend, saves MP3 to cache, plays once (Expo Go / device must reach `baseUrl` on Wi‑Fi).
 */
export async function playTtsFromDevBackend(
  baseUrl: string,
  text: string = 'knife',
): Promise<void> {
  const root = normalizeTtsBaseUrl(baseUrl);
  const audioBase64 = await fetchTtsAudioBase64(root, text);
  const uri = saveTtsMp3ToCache(audioBase64, 'dev-tts');

  const player = createAudioPlayer({ uri });
  await player.seekTo(0);
  player.play();
}
