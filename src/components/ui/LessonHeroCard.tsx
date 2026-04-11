import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/src/theme/pronunciationTheme';

import PrimaryButton from './PrimaryButton';
import WaveformDisplay from './WaveformDisplay';

type LessonHeroCardProps = {
  lessonTitle: string;
  /** Japanese gloss under the English lesson title. */
  lessonTitleJa?: string;
  /** Japanese gloss under “NOW PRACTICING”. */
  nowPracticingJa?: string;
  /** Japanese gloss under the Continue practice button. */
  continuePracticeJa?: string;
  onContinue: () => void;
};

export default function LessonHeroCard({
  lessonTitle,
  lessonTitleJa,
  nowPracticingJa,
  continuePracticeJa,
  onContinue,
}: LessonHeroCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        NOW PRACTICING
        {nowPracticingJa ? <Text style={styles.labelJa}> {nowPracticingJa}</Text> : null}
      </Text>
      <Text style={styles.title}>
        {lessonTitle}
        {lessonTitleJa ? <Text style={styles.titleJa}> {lessonTitleJa}</Text> : null}
      </Text>
      <View style={styles.wave}>
        <WaveformDisplay variant="onDark" barCount={16} />
      </View>
      <PrimaryButton
        label="Continue practice"
        labelSuffixJa={continuePracticeJa}
        onPress={onContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.darkCard,
    borderRadius: theme.radius.xl,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    gap: 6,
  },
  label: {
    fontFamily: theme.fontDisplay,
    fontSize: 11,
    letterSpacing: 2.2,
    color: theme.colors.darkCardMuted,
    textTransform: 'uppercase',
  },
  labelJa: {
    fontSize: 12
    ,
    fontWeight: '600',
    color: theme.colors.darkCardMuted,
    letterSpacing: 0,
    textTransform: 'none',
  },
  title: {
    fontFamily: theme.fontDisplay,
    fontSize: 22,
    color: theme.colors.onDark,
    marginBottom: 0,
    lineHeight: 28,
  },
  titleJa: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.darkCardMuted,
  },
  wave: {
    paddingVertical: 4,
  },
});
