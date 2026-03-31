import { StyleSheet, Text, View } from 'react-native';

import { theme, typography } from '@/src/theme/pronunciationTheme';

type StatCardProps = {
  value: string;
  labelLine1: string;
  labelLine2?: string;
  /** Japanese gloss under the English labels. */
  captionJa?: string;
};

export default function StatCard({ value, labelLine1, labelLine2, captionJa }: StatCardProps) {
  const englishLabel = `${labelLine1}${labelLine2 ? ` ${labelLine2}` : ''}`;

  return (
    <View style={styles.card}>
      <Text style={typography.statNumber}>{value}</Text>
      <Text style={typography.statLabel}>
        {englishLabel}
      </Text>
      {captionJa ? <Text style={styles.captionJa}>{captionJa}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.xs,
    minHeight: 76,
    justifyContent: 'center',
  },
  captionJa: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textMuted,
    letterSpacing: 0,
    textTransform: 'none',
    textAlign: 'center',
  },
});
