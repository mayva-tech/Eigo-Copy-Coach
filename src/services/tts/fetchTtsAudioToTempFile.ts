import {
  fetchTtsAudioBase64,
  getTtsDevBaseUrlFromEnv,
  saveTtsMp3ToCache,
} from './ttsBackendClient';

export async function fetchTtsAudioToTempFile(
  text: string,
  mode: 'normal' | 'slow' = 'normal',
): Promise<string> {
  const baseUrl = getTtsDevBaseUrlFromEnv();
  // Temporary: confirm what URL Metro bundled (remove when TTS fetch is stable).
  console.log('TTS base URL:', baseUrl);
  console.log('TTS fetch URL:', `${baseUrl}/tts`);
  console.log('TTS text:', text, 'mode:', mode);
  const audioBase64 = await fetchTtsAudioBase64(baseUrl, text, mode);
  return saveTtsMp3ToCache(audioBase64, `tts-${mode}`);
}
