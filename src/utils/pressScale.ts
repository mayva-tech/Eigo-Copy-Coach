import type { ViewStyle } from 'react-native';

/** Subtle scale while pressed — feels like the control “gives” under the finger. */
const PRESS_SCALE = 0.96;

/**
 * Merge into `Pressable` style callbacks: `{ pressed } => [ ..., pressScaleStyle(pressed) ]`
 */
export function pressScaleStyle(pressed: boolean): ViewStyle {
  return {
    transform: [{ scale: pressed ? PRESS_SCALE : 1 }],
  };
}
