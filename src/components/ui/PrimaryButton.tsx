import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';
import { pressScaleStyle } from '@/src/utils/pressScale';

type PrimaryButtonProps = {
  label: string;
  /** Japanese gloss on the same line as the label, smaller type. */
  labelSuffixJa?: string;
  onPress: () => void;
  flex?: number;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({ label, labelSuffixJa, onPress, flex, style }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        flex != null ? { flex } : undefined,
        style,
        pressScaleStyle(pressed),
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.label}>
        {label}
        {labelSuffixJa ? <Text style={styles.labelJa}> {labelSuffixJa}</Text> : null}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.space.sm,
    alignSelf: 'stretch',
  },
  label: {
    fontFamily: theme.fontDisplay,
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.darkCard,
    textAlign: 'center',
  },
  labelJa: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.darkCard,
    opacity: 0.85,
  },
  pressed: {
    opacity: 0.9,
  },
});
