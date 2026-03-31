import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';

type CoachNoteCardProps = {
  note: string;
};

/** Dark guidance card — breathable padding, softened on-dark text. */
export default function CoachNoteCard({ note }: CoachNoteCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>COACH NOTE</Text>
      <Text style={styles.body}>{note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.darkCard,
    borderRadius: theme.radius.xl,
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.4,
    color: theme.colors.darkCardMuted,
    textTransform: 'uppercase',
    marginBottom: theme.space.sm,
  },
  body: {
    fontFamily: theme.fontDisplay,
    fontSize: 16,
    lineHeight: 26,
    color: 'rgba(249, 245, 240, 0.92)',
  },
});
