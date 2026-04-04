import { createAudioPlayer, type AudioPlayer } from 'expo-audio';

import { playUri } from '@/src/services/audio/audioPlaybackService';
import {
  fetchTtsAudioBase64,
  normalizeTtsBaseUrl,
  saveTtsMp3ToCache,
  type TtsBackendMode,
} from '@/src/services/tts/ttsBackendClient';

let backendTtsPlayer: AudioPlayer | null = null;

function getBackendTtsPlayer(): AudioPlayer {
  if (!backendTtsPlayer) {
    backendTtsPlayer = createAudioPlayer(null);
    backendTtsPlayer.volume = 1.0;
    backendTtsPlayer.muted = false;
  }
  return backendTtsPlayer;
}

/** Stops Google Cloud TTS playback so device TTS or a new clip does not overlap. */
export function pauseBackendTtsPlayback(): void {
  backendTtsPlayer?.pause();
}

/**
 * Calls your TTS backend (Google Cloud TTS), saves MP3 to cache, plays once.
 * Device must reach `baseUrl` (same Wi‑Fi as dev server, or production URL).
 */
export async function playTtsFromBackend(
  baseUrl: string,
  text: string,
  mode: TtsBackendMode = 'headword_normal',
): Promise<void> {
  const root = normalizeTtsBaseUrl(baseUrl);
  const audioBase64 = await fetchTtsAudioBase64(root, text, mode);
  const uri = saveTtsMp3ToCache(audioBase64, `tts-${mode}`);
  await playUri(getBackendTtsPlayer(), uri);
}

/**
 * Settings test: default word "knife", normal speed.
 */
export async function playTtsFromDevBackend(
  baseUrl: string,
  text: string = 'knife',
): Promise<void> {
  await playTtsFromBackend(baseUrl, text, 'headword_normal');
}
