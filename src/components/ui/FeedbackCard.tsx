import { StyleSheet, Text, View } from 'react-native';

import { theme, typography } from '@/src/theme/pronunciationTheme';

type FeedbackCardProps = {
  lines: string[];
  tryAgainWord?: string;
};

export default function FeedbackCard({ lines, tryAgainWord }: FeedbackCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        {lines.map((line, i) => (
          <Text key={i} style={[typography.body, styles.line, i === 0 && styles.firstLine]}>
            {line}
          </Text>
        ))}
        {tryAgainWord ? (
          <Text style={styles.tryAgain}>
            Try again: &quot;{tryAgainWord}&quot;
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    overflow: 'hidden',
  },
  accentBar: {
    width: 5,
    backgroundColor: theme.colors.accentGold,
  },
  content: {
    flex: 1,
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.sm,
    gap: 2,
  },
  line: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fontDisplay,
    lineHeight: 19,
  },
  firstLine: {
    fontWeight: '600',
    color: theme.colors.text,
  },
  tryAgain: {
    marginTop: 2,
    fontFamily: theme.fontDisplay,
    fontSize: 14,
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
  },
});
