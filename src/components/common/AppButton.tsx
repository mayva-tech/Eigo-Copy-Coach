import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/constants/colors';
import { pressScaleStyle } from '@/src/utils/pressScale';

type AppButtonProps = {
  label: string;
  /** Second line below `label` (e.g. a count). */
  labelSub?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  iconLeft?: ReactNode;
};

export default function AppButton({
  label,
  labelSub,
  onPress,
  variant = 'primary',
  iconLeft,
}: AppButtonProps) {
  const mainTextStyle = variant === 'primary' ? styles.primaryText : styles.secondaryText;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        labelSub ? styles.baseWithSub : undefined,
        pressScaleStyle(pressed),
        pressed && styles.pressed,
      ]}
    >
      {labelSub ? (
        <View style={styles.labelColumn}>
          <Text style={mainTextStyle}>{label}</Text>
          <Text
            style={[
              styles.labelSub,
              variant === 'primary' ? styles.labelSubPrimary : styles.labelSubSecondary,
            ]}
          >
            {labelSub}
          </Text>
        </View>
      ) : (
        <>
          {iconLeft}
          <Text style={mainTextStyle}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 46,
    borderRadius: 999,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  baseWithSub: {
    minHeight: 56,
    paddingVertical: 10,
  },
  labelColumn: {
    alignItems: 'center',
    gap: 2,
  },
  labelSub: {
    fontSize: 13,
    fontWeight: '700',
  },
  labelSubPrimary: {
    color: 'rgba(255,255,255,0.88)',
  },
  labelSubSecondary: {
    color: colors.textSoft,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.86,
  },
});
