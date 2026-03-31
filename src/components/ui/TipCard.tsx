import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { theme, typography } from '@/src/theme/pronunciationTheme';

type TipCardProps = {
  text: string;
};

export default function TipCard({ text }: TipCardProps) {
  return (
    <View style={styles.card}>
      <Ionicons name="bulb-outline" size={18} color={theme.colors.textMuted} style={styles.icon} />
      <Text style={[typography.bodySmall, styles.body]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.space.xs,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.sm,
  },
  icon: {
    marginTop: 1,
  },
  body: {
    flex: 1,
    color: theme.colors.textSecondary,
  },
});
