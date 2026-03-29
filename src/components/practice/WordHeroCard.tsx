import { StyleSheet, Text, View } from 'react-native';
import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import { colors } from '@/src/constants/colors';

type WordHeroCardProps = {
  word: string;
  /** Japanese meaning — small reference text opposite the headword. */
  meaningJa: string;
  sayItLike: string;
  onPlay: () => void;
  onSlow: () => void;
  /** Free-only “Natural voice” preview CTA; omit for premium subscribers (button hidden). */
  onPremiumVoice?: () => void;
};

export default function WordHeroCard({
  word,
  meaningJa,
  sayItLike,
  onPlay,
  onSlow,
  onPremiumVoice,
}: WordHeroCardProps) {
  return (
    <AppCard>
      <Text style={styles.label}>Word</Text>
      <View style={styles.wordRow}>
        <View style={styles.wordCell}>
          <Text
            style={styles.word}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.38}
          >
            {word}
          </Text>
        </View>
        <Text style={styles.meaningJa}>{meaningJa}</Text>
      </View>

      <Text style={styles.sayLabel}>こう言う</Text>
      <Text style={styles.sayItLike}>{sayItLike}</Text>

      <View style={styles.actions}>
        <AppButton label="Play" variant="secondary" onPress={onPlay} />
        <AppButton label="Slow" variant="secondary" onPress={onSlow} />
        {onPremiumVoice ? (
          <AppButton label="Natural voice" variant="secondary" onPress={onPremiumVoice} />
        ) : null}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 5,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  /** Bounded width so `adjustsFontSizeToFit` can shrink the English word to one line. */
  wordCell: {
    flex: 1,
    minWidth: 0,
  },
  word: {
    width: '100%',
    fontSize: 38,
    fontWeight: '800',
    color: colors.text,
  },
  meaningJa: {
    flexShrink: 0,
    maxWidth: '48%',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: colors.textMuted,
    textAlign: 'right',
  },
  sayLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSoft,
    marginBottom: 4,
  },
  sayItLike: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
    color: colors.accent,
    marginBottom: 12,
  },
  actions: {
    gap: 12,
  },
});
