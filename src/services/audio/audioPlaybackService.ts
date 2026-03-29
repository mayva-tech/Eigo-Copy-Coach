import { useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import type { AudioPlayer } from 'expo-audio';

/**
 * Player that follows a local `file://` or remote URI when `sourceUri` changes.
 */
export function useRemoteOrLocalPlayer(sourceUri: string | null): AudioPlayer {
  const player = useAudioPlayer(null);

  useEffect(() => {
    if (!sourceUri) {
      return;
    }
    player.replace({ uri: sourceUri });
  }, [sourceUri, player]);

  return player;
}

/**
 * Replace source, seek to start, play (await seek for reliable start).
 */
export async function playUri(player: AudioPlayer, uri: string): Promise<void> {
  player.replace({ uri });
  player.muted = false;
  player.volume = 1.0;

  if (Platform.OS === 'ios') {
    // iOS: reset time-stretch so normal/slow differ by MP3 only (Android: `playbackRate` is getter-only → skip).
    try {
      (player as AudioPlayer & { playbackRate: number }).playbackRate = 1.0;
    } catch {
      /* noop */
    }
  }

  await player.seekTo(0);
  player.play();
}

export function pausePlayback(player: AudioPlayer): void {
  player.pause();
}
