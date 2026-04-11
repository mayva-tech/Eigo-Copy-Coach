import { Pressable, StyleSheet, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';
import { pressScaleStyle } from '@/src/utils/pressScale';

type PrimaryButtonVariant = 'gold' | 'blue' | 'blueLight';

type PrimaryButtonProps = {
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
  /** `gold` default; `blue` = meaning/tips; `blueLight` = lighter blue (e.g. back to word). */
  variant?: PrimaryButtonVariant;
};

export default function PrimaryButton({
  label,
  labelSuffixJa,
  labelStyle,
  labelJaStyle,
  onPress,
  flex,
  style,
  variant = 'gold',
}: PrimaryButtonProps) {
  const colors = VARIANT[variant];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        colors.base,
        flex != null ? { flex } : undefined,
        style,
        pressScaleStyle(pressed),
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, { color: colors.label }, labelStyle]}>
        {label}
        {labelSuffixJa ? (
          <Text
            style={[
              styles.labelJa,
              { color: colors.labelJa, opacity: colors.labelJaOpacity },
              labelJaStyle,
            ]}
          >
            {' '}
            {labelSuffixJa}
          </Text>
        ) : null}
      </Text>
    </Pressable>
  );
}

const VARIANT = {
  gold: {
    base: { backgroundColor: theme.colors.accentGold },
    label: theme.colors.darkCard,
    labelJa: theme.colors.darkCard,
    labelJaOpacity: 0.85,
  },
  blue: {
    base: { backgroundColor: theme.colors.accentBlue },
    label: theme.colors.onAccentBlue,
    labelJa: theme.colors.onAccentBlue,
    labelJaOpacity: 0.85,
  },
  blueLight: {
    base: { backgroundColor: theme.colors.accentBlueLight },
    label: theme.colors.onAccentBlueLight,
    labelJa: theme.colors.onAccentBlueLight,
    labelJaOpacity: 0.85,
  },
} as const;

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.space.sm,
    alignSelf: 'stretch',
  },
  label: {
    fontFamily: theme.fontDisplay,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelJa: {
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.9,
  },
});
