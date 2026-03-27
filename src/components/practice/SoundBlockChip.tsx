import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/src/constants/colors';

type SoundBlockChipProps = {
  label: string;
  hint: string;
  selected?: boolean;
  onPress: () => void;
};

export default function SoundBlockChip({
  label,
  hint,
  selected = false,
  onPress,
}: SoundBlockChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: 96,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.86,
  },
  label: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  labelSelected: {
    color: colors.primary,
  },
  hint: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSoft,
  },
});
