import { StyleSheet, Text, View } from 'react-native';
import AppButton from '@/src/components/common/AppButton';
import AppCard from '@/src/components/common/AppCard';
import { colors } from '@/src/constants/colors';

type WordHeroCardProps = {
  word: string;
  sayItLike: string;
  onPlay: () => void;
  onSlow: () => void;
};

export default function WordHeroCard({
  word,
  sayItLike,
  onPlay,
  onSlow,
}: WordHeroCardProps) {
  return (
    <AppCard>
      <Text style={styles.label}>Word</Text>
      <Text style={styles.word}>{word}</Text>

      <Text style={styles.sayLabel}>こう言う</Text>
      <Text style={styles.sayItLike}>{sayItLike}</Text>

      <View style={styles.actions}>
        <AppButton label="Play" variant="secondary" onPress={onPlay} />
        <AppButton label="Slow" variant="secondary" onPress={onSlow} />
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
    marginBottom: 8,
  },
  word: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 18,
  },
  sayLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSoft,
    marginBottom: 6,
  },
  sayItLike: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: colors.accent,
    marginBottom: 18,
  },
  actions: {
    gap: 12,
  },
});
