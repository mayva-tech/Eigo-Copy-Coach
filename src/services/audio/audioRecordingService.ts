import type { AudioRecorder } from 'expo-audio';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from 'expo-audio';

/**
 * Requests OS microphone permission (required before recording on iOS / Android).
 */
export async function requestMicrophonePermission(): Promise<boolean> {
  try {
    const result = await AudioModule.requestRecordingPermissionsAsync();
    return !!result.granted;
  } catch (error) {
    console.error('requestMicrophonePermission error', error);
    return false;
  }
}

/**
 * Shared recorder preset for pronunciation takes (AAC / m4a on native).
 */
export function useAppRecorder() {
  return useAudioRecorder(RecordingPresets.HIGH_QUALITY);
}

/**
 * Prepares session + recorder for a new take (after permission is granted).
 */
export async function prepareRecorder(recorder: AudioRecorder): Promise<void> {
  await setAudioModeAsync({
    allowsRecording: true,
    playsInSilentMode: true,
    interruptionMode: 'duckOthers',
    shouldRouteThroughEarpiece: false,
  });
  await recorder.prepareToRecordAsync();
}

export function beginRecording(recorder: AudioRecorder): void {
  recorder.record();
}

export async function finishRecording(recorder: AudioRecorder): Promise<string | null> {
  await recorder.stop();
  return recorder.uri ?? null;
}
