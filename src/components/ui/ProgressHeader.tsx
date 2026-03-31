import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme, typography } from '@/src/theme/pronunciationTheme';

type ProgressHeaderProps = {
  current: number;
  total: number;
  lessonTitle: string;
  onBack: () => void;
};

export default function ProgressHeader({
  current,
  total,
  lessonTitle,
  onBack,
}: ProgressHeaderProps) {
  const pct = total > 0 ? Math.min(1, current / total) : 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && styles.backPressed]}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        </Pressable>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${pct * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {current}/{total}
        </Text>
      </View>
      <Text style={styles.lessonTitle}>{lessonTitle.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: theme.space.xs,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.xs,
    marginBottom: theme.space.xs,
  },
  back: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -6,
  },
  backPressed: {
    opacity: 0.65,
  },
  barTrack: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.borderSubtle,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: theme.colors.accentGold,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
    minWidth: 36,
    textAlign: 'right',
  },
  lessonTitle: {
    ...typography.sectionLabel,
    textAlign: 'center',
    marginBottom: 0,
    fontSize: 10,
  },
});
