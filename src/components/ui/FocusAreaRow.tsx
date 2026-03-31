import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';

type FocusAreaRowProps = {
  badge: string;
  title: string;
  examples: string;
  titleJa?: string;
  examplesJa?: string;
  onPress?: () => void;
  showDivider?: boolean;
};

export default function FocusAreaRow({
  badge,
  title,
  examples,
  titleJa,
  examplesJa,
  onPress,
  showDivider,
}: FocusAreaRowProps) {
  const content = (
    <>
      <View style={styles.badgeOuter}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
      <View style={styles.mid}>
        <Text style={styles.title}>
          {title}
          {titleJa ? <Text style={styles.titleJa}> {titleJa}</Text> : null}
        </Text>
        <Text style={styles.examples}>
          {examples}
          {examplesJa ? <Text style={styles.examplesJa}> {examplesJa}</Text> : null}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
    </>
  );

  return (
    <View>
      {showDivider ? <View style={styles.divider} /> : null}
      {onPress ? (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        >
          {content}
        </Pressable>
      ) : (
        <View style={styles.row}>{content}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.borderSubtle,
    marginLeft: 48,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.space.sm,
    gap: theme.space.xs,
  },
  rowPressed: {
    opacity: 0.75,
  },
  badgeOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: theme.colors.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceElevated,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.text,
  },
  mid: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 17,
    color: theme.colors.text,
    marginBottom: 1,
  },
  titleJa: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textMuted,
  },
  examples: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  examplesJa: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.textMuted,
  },
});
