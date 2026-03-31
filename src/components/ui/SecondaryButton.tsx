import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';
import { pressScaleStyle } from '@/src/utils/pressScale';

type SecondaryButtonProps = {
  label: string;
  /** Japanese gloss on the same line as the label, smaller type. */
  labelSuffixJa?: string;
  onPress: () => void;
  flex?: number;
  style?: StyleProp<ViewStyle>;
};

export default function SecondaryButton({ label, labelSuffixJa, onPress, flex, style }: SecondaryButtonProps) {
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
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.space.sm,
    alignSelf: 'stretch',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
  labelJa: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  pressed: {
    opacity: 0.88,
  },
});
