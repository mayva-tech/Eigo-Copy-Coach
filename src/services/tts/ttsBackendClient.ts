import { File, Paths } from 'expo-file-system';

export type TtsBackendResponse = {
  success: boolean;
  mimeType?: string;
  audioBase64?: string;
  error?: string;
};

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

/** Trim trailing slash and validate scheme (used by env URL and Settings manual URL). */
export function normalizeTtsBaseUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, '');
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    throw new Error('TTS base URL must start with http:// or https://');
  }
  return trimmed;
}

/** Backend base URL from `.env` (`EXPO_PUBLIC_TTS_DEV_URL`). */
export function getTtsDevBaseUrlFromEnv(): string {
  const raw = process.env.EXPO_PUBLIC_TTS_DEV_URL?.trim();
  if (!raw) {
    throw new Error(
      'Missing EXPO_PUBLIC_TTS_DEV_URL: add it to .env in the Expo project root (not backend/), use your PC LAN IP for a device, then restart with: npx expo start --clear. See .env.example.',
    );
  }
  return normalizeTtsBaseUrl(raw);
}

export async function fetchTtsAudioBase64(
  baseUrl: string,
  text: string,
  mode: 'normal' | 'slow' = 'normal',
): Promise<string> {
  const root = normalizeTtsBaseUrl(baseUrl);
  const res = await fetch(`${root}/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, mode }),
  });

  const data = (await res.json()) as TtsBackendResponse;

  if (!res.ok || !data.success || !data.audioBase64) {
    throw new Error(data.error || `TTS request failed (${res.status})`);
  }

  return data.audioBase64;
}

/** Writes decoded MP3 into app cache; returns `file://` URI for expo-audio. */
export function saveTtsMp3ToCache(audioBase64: string, filenamePrefix: string): string {
  const file = new File(Paths.cache, `${filenamePrefix}-${Date.now()}.mp3`);
  file.create();
  file.write(base64ToBytes(audioBase64));
  return file.uri;
}
