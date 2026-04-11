import { setAudioModeAsync, useAudioPlayerStatus, useAudioRecorderState } from 'expo-audio';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { playUri, useRemoteOrLocalPlayer } from '@/src/services/audio/audioPlaybackService';
import {
  beginRecording,
  finishRecording,
  prepareRecorder,
  requestMicrophonePermission,
  useAppRecorder,
} from '@/src/services/audio/audioRecordingService';

export function useAudioPractice(recordedUri: string | null) {
  const recorder = useAppRecorder();
  const recorderState = useAudioRecorderState(recorder);
  const player = useRemoteOrLocalPlayer(recordedUri);
  const playbackStatus = useAudioPlayerStatus(player);
  const onPlaybackCompleteRef = useRef<(() => void) | null>(null);

  const [micGranted, setMicGranted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    onPlaybackCompleteRef.current = null;
  }, [recordedUri]);

  useEffect(() => {
    if (!playbackStatus.didJustFinish || !onPlaybackCompleteRef.current) return;
    const cb = onPlaybackCompleteRef.current;
    onPlaybackCompleteRef.current = null;
    cb();
  }, [playbackStatus.didJustFinish]);

  useEffect(() => {
    void (async () => {
      try {
        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
          interruptionMode: 'duckOthers',
          shouldRouteThroughEarpiece: false,
        });
        setAudioReady(true);
      } catch (error) {
        console.error('setAudioModeAsync error', error);
        setAudioReady(false);
      }
    })();
  }, []);

  const ensurePermission = async () => {
    const granted = await requestMicrophonePermission();
    setMicGranted(granted);
    return granted;
  };

  const startRecording = async () => {
    const granted = micGranted || (await ensurePermission());
    if (!granted) {
      throw new Error('Microphone permission not granted');
    }
    await prepareRecorder(recorder);
    beginRecording(recorder);
  };

  const stopRecording = async (): Promise<string | null> => {
    if (!recorderState.isRecording) {
      return null;
    }
    return finishRecording(recorder);
  };

  const playRecording = useCallback(
    async (onPlaybackComplete?: () => void) => {
      if (!recordedUri) {
        return;
      }
      onPlaybackCompleteRef.current = onPlaybackComplete ?? null;
      await playUri(player, recordedUri);
    },
    [player, recordedUri],
  );

  const status = useMemo(
    () => ({
      audioReady,
      micGranted,
      isRecording: recorderState.isRecording,
      hasRecording: !!recordedUri,
    }),
    [audioReady, micGranted, recorderState.isRecording, recordedUri]
  );

  return {
    status,
    ensurePermission,
    startRecording,
    stopRecording,
    playRecording,
  };
}
