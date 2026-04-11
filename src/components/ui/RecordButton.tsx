import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';

type RecordButtonProps = {
  isRecording: boolean;
  onPress: () => void;
  disabled?: boolean;
  /** Smaller circle — e.g. beside play in {@link PromptCard}. */
  compact?: boolean;
};

const DIM = {
  default: { outer: 100, mid: 86, inner: 68, icon: 28 },
  compact: { outer: 64, mid: 56, inner: 48, icon: 22 },
} as const;

export default function RecordButton({ isRecording, onPress, disabled, compact }: RecordButtonProps) {
  const d = compact ? DIM.compact : DIM.default;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.12,
            duration: 520,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 520,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }

    pulse.stopAnimation();
    pulse.setValue(1);
    return undefined;
  }, [isRecording, pulse]);

  const outerStyle = [
    styles.outerRing,
    { width: d.outer, height: d.outer, borderRadius: d.outer / 2 },
  ];
  const midStyle = [styles.midRing, { width: d.mid, height: d.mid, borderRadius: d.mid / 2 }];
  const innerStyle = [
    styles.inner,
    { width: d.inner, height: d.inner, borderRadius: d.inner / 2 },
    isRecording && styles.innerActive,
    isRecording && { transform: [{ scale: pulse }] },
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        outerStyle,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
    >
      <View style={midStyle}>
        <Animated.View style={innerStyle}>
          <Ionicons name="mic" size={d.icon} color={theme.colors.white} />
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerRing: {
    borderWidth: 2,
    borderColor: theme.colors.terracottaRing,
    backgroundColor: theme.colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  midRing: {
    borderWidth: 2,
    borderColor: theme.colors.accentSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: theme.colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerActive: {
    backgroundColor: theme.colors.practiceTerracotta,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
});
