// ─── Backend Health Check (Phase 3) ────────────────────────────────────
//
// Uses the same base URL as TTS/scoring (`EXPO_PUBLIC_TTS_DEV_URL`).
// Cached 30s to avoid spamming the device.

import { getTtsDevBaseUrlOptional } from '../tts/ttsBackendClient';

const CACHE_TTL_MS = 30_000;
const TIMEOUT_MS = 3_000;

let _cachedResult: boolean | null = null;
let _lastCheckedAt = 0;

/**
 * True if GET /score-pronunciation/health returns `{ ok: true }`
 * (Azure key + region set on server). Cached 30 seconds.
 */
export async function isBackendAvailable(): Promise<boolean> {
  const now = Date.now();

  if (_cachedResult !== null && now - _lastCheckedAt < CACHE_TTL_MS) {
    return _cachedResult;
  }

  const baseUrl = getTtsDevBaseUrlOptional();
  if (!baseUrl) {
    _cachedResult = false;
    _lastCheckedAt = now;
    return false;
  }

  const url = `${baseUrl.replace(/\/$/, '')}/score-pronunciation/health`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      _cachedResult = false;
    } else {
      const json = (await res.json()) as { ok?: boolean };
      _cachedResult = json.ok === true;
    }
  } catch {
    _cachedResult = false;
  }

  _lastCheckedAt = now;
  return _cachedResult;
}

export function invalidateHealthCache(): void {
  _cachedResult = null;
  _lastCheckedAt = 0;
}
