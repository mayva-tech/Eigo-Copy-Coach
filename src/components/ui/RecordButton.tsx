import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';

type RecordButtonProps = {
  isRecording: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export default function RecordButton({ isRecording, onPress, disabled }: RecordButtonProps) {
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

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.outerRing,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
    >
      <View style={styles.midRing}>
        <Animated.View
          style={[
            styles.inner,
            isRecording && styles.innerActive,
            isRecording && { transform: [{ scale: pulse }] },
          ]}
        >
          <Ionicons name="mic" size={28} color={theme.colors.white} />
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outerRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.terracottaRing,
    backgroundColor: theme.colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  midRing: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: theme.colors.accentSand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 68,
    height: 68,
    borderRadius: 34,
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
