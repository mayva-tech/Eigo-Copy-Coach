import { StyleSheet, Text, View } from 'react-native';

import type { PracticeWordScoreLine } from '@/src/features/practice/types/practice.types';
import { theme, typography } from '@/src/theme/pronunciationTheme';

type FeedbackCardProps = {
  lines: string[];
  tryAgainWord?: string;
  /** Azure word-level scores (optional). */
  wordScores?: PracticeWordScoreLine[];
};

function errorTypeLabelJa(t: string): string {
  switch (t) {
    case 'None':
      return 'OK';
    case 'Mispronunciation':
      return '発音';
    case 'Omission':
      return '省略';
    case 'Insertion':
      return '余分';
    default:
      return t;
  }
}

export default function FeedbackCard({ lines, tryAgainWord, wordScores }: FeedbackCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        {lines.map((line, i) => (
          <Text key={i} style={[typography.body, styles.line, i === 0 && styles.firstLine]}>
            {line}
          </Text>
        ))}
        {wordScores && wordScores.length > 0 ? (
          <View style={styles.wordScoresBlock} accessibilityLabel="Word-level scores">
            {wordScores.map((w, i) => (
              <View key={`${w.word}-${i}`} style={styles.wordScoreRow}>
                <Text style={styles.wordScoreWord} numberOfLines={1}>
                  {w.word}
                </Text>
                <Text style={styles.wordScoreMeta}>
                  {Math.round(w.accuracyScore)} · {errorTypeLabelJa(w.errorType)}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
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
  wordScoresBlock: {
    marginTop: 6,
    gap: 4,
    alignSelf: 'stretch',
  },
  wordScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceSoft,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  wordScoreWord: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text,
  },
  wordScoreMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
});
