import { Platform, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';

export type ResultStatus = 'clear' | 'retry' | 'practice_more';

type ResultRowProps = {
  word: string;
  status: ResultStatus;
};

const statusCopy: Record<ResultStatus, string> = {
  clear: 'Clear',
  retry: 'Retry',
  practice_more: 'Practice more',
};

const statusColor: Record<ResultStatus, string> = {
  clear: theme.colors.successOlive,
  retry: theme.colors.retryAmber,
  practice_more: theme.colors.practiceTerracotta,
};

export default function ResultRow({ word, status }: ResultRowProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: statusColor[status] }]} />
      <Text style={styles.word} numberOfLines={1}>
        {word}
      </Text>
      <Text style={[styles.status, { color: statusColor[status] }]} numberOfLines={1}>
        {statusCopy[status]}
      </Text>
    </View>
  );
}

const rowShadow =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#3C362A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      }
    : { elevation: 1 };

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: theme.space.md,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.borderSubtle,
    gap: theme.space.sm,
    ...rowShadow,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  word: {
    flex: 1,
    minWidth: 0,
    fontFamily: theme.fontDisplay,
    fontSize: 17,
    color: theme.colors.text,
    paddingRight: theme.space.sm,
  },
  status: {
    flexShrink: 0,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    minWidth: 100,
  },
});
