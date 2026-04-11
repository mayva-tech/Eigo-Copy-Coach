import { Pressable, StyleSheet, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';
import { pressScaleStyle } from '@/src/utils/pressScale';

type SecondaryButtonProps = {
  label: string;
  /** Japanese gloss on the same line as the label, smaller type. */
  labelSuffixJa?: string;
  /** Optional style overrides for the main label text. */
  labelStyle?: StyleProp<TextStyle>;
  /** Optional style overrides for the Japanese suffix text. */
  labelJaStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  flex?: number;
  style?: StyleProp<ViewStyle>;
};

export default function SecondaryButton({
  label,
  labelSuffixJa,
  labelStyle,
  labelJaStyle,
  onPress,
  flex,
  style,
}: SecondaryButtonProps) {
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
      <Text style={[styles.label, labelStyle]}>
        {label}
        {labelSuffixJa ? <Text style={[styles.labelJa, labelJaStyle]}> {labelSuffixJa}</Text> : null}
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
