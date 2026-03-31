import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';

type WaveformDisplayProps = {
  variant?: 'gold' | 'sand' | 'onDark';
  barCount?: number;
};

/** Decorative equalizer-style bars — non-interactive. */
export default function WaveformDisplay({ variant = 'gold', barCount = 14 }: WaveformDisplayProps) {
  const heights = useMemo(() => {
    const pattern = [0.35, 0.55, 0.4, 0.75, 0.5, 0.9, 0.45, 0.7, 0.55, 0.85, 0.4, 0.65, 0.5, 0.6];
    return Array.from({ length: barCount }, (_, i) => pattern[i % pattern.length]);
  }, [barCount]);

  const hi =
    variant === 'onDark'
      ? theme.colors.accentGold
      : variant === 'gold'
        ? theme.colors.accentGold
        : theme.colors.accentSand;
  const lo =
    variant === 'onDark'
      ? theme.colors.darkCardMuted
      : variant === 'sand'
        ? theme.colors.darkCardMuted
        : theme.colors.border;

  return (
    <View style={styles.wrap}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={[
            styles.bar,
            { height: 6 + h * 28, backgroundColor: i % 2 === 0 ? hi : lo },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
    height: 40,
  },
  bar: {
    width: 4,
    borderRadius: 3,
  },
});
